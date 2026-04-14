# OSFL Balkans Platform — Claude Code Context

This file is read automatically by Claude Code on session start. It contains everything needed to continue development without any prior context.

---

## What This Project Is

**OSFL Balkans** is a multilingual financial literacy platform for 6 Balkan countries (HR, RS, BA, ME, MK, AL), funded by a 60,000 EURC grant from the Borderless Tech Association (BTA). The platform delivers 11 curriculum modules in 7 language variants.

- **Grantee:** Kalimera Consulting d.o.o. (CEO: Sandi Fatic)
- **Grant admin / BTA President:** Luka Sucic
- **Grant signed:** December 12, 2025
- **This milestone (M4):** Platform & Partnerships — 20,000 EURC

The content (77 translated modules, 66 country supplements, 66 quiz banks, 66 worksheets, translation memory) was produced in M1–M3 and lives in the **content source repo** at:
`/Users/lukasucic/Documents/Claude Code/osfl-balkans/` (on Luka's Mac)

This repo (`osfl-balkans-platform`) is the **platform** — the Hugo site that serves that content.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Static site generator | **Hugo** | Single binary, no Node runtime, built-in i18n for 7 languages, sub-2s builds |
| Server | **Ubuntu + Nginx** | Same server as drugakozmicka.com and ethzagreb.com — no new infrastructure |
| CDN / SSL | **Cloudflare** (proxy) | Free, same setup as existing sites |
| Analytics | **Umami** (self-hosted) | Open-source, no cookies, GDPR-compliant, runs on existing server |
| Interactive tools | **Vanilla JS** | No framework, no dependencies |
| Search | **Pagefind** | Static search, one `npx pagefind` call at build time |
| Deployment | `git pull && hugo --minify` | That's it. No CI/CD pipeline needed |

**There is no Node.js runtime dependency** for the Hugo build. The only npm call is `npx pagefind` to rebuild the search index after a Hugo build — and it's optional.

---

## Repository Structure

```
osfl-balkans-platform/
├── CLAUDE.md                   ← you are here
├── hugo.toml                   ← site config, 7 languages defined
├── content/
│   ├── hr/modules/             ← Croatian modules (from M3)
│   ├── sr-latn/modules/        ← Serbian Latin
│   ├── sr-cyrl/modules/        ← Serbian Cyrillic
│   ├── bs/modules/             ← Bosnian
│   ├── cnr/modules/            ← Montenegrin
│   ├── mk/modules/             ← Macedonian
│   └── sq/modules/             ← Albanian
├── data/
│   ├── quiz-banks/             ← JSON quiz files per language (from M3)
│   └── supplements/            ← YAML country supplement data (from M3)
├── layouts/
│   ├── _default/               ← baseof, single, list templates
│   └── partials/               ← lang-switcher, quiz-engine, country-selector
├── static/
│   ├── css/main.css            ← all styles, WCAG 2.1 AA compliant
│   ├── js/site.js              ← language/country preference persistence
│   ├── tools/
│   │   ├── budget-calculator/  ← Tool 1: vanilla JS budget tool
│   │   ├── savings-planner/    ← Tool 2: compound interest savings planner
│   │   └── business-comparator/← Tool 3: country business structure comparison
│   └── worksheets/             ← pre-generated PDF worksheets (run import)
├── i18n/                       ← UI strings: hr.yaml, sr-latn.yaml, sr-cyrl.yaml, bs.yaml, cnr.yaml, mk.yaml, sq.yaml
└── scripts/
    ├── import-content.sh       ← copies M3 Markdown files into content/
    └── server-setup.sh         ← first-time Ubuntu server setup
```

---

## Getting Started (Ubuntu Server)

### First-time setup
```bash
# 1. Clone this repo
git clone https://github.com/YOUR_ORG/osfl-balkans-platform.git /var/www/osfl-balkans/repo
cd /var/www/osfl-balkans/repo

# 2. Run server setup (installs Hugo, writes Nginx config, first build)
sudo bash scripts/server-setup.sh

# 3. Point osflbalkans.org DNS A record to this server's IP in Cloudflare
# Enable orange cloud (proxy) for SSL — same as drugakozmicka.com / ethzagreb.com
```

### Daily deploy workflow
```bash
osfl-deploy          # pulls latest + rebuilds + refreshes search index
```

### Local dev (on any machine with Hugo installed)
```bash
hugo server          # live preview at localhost:1313
```

---

## Content Import

The M3 Markdown files are **not committed to this repo** — they live in the content source repo. To import them:

```bash
# From repo root — expects M3-Localization/ one directory up
bash scripts/import-content.sh
```

The script copies files and injects Hugo front matter (title, module_number, path, weight) if not already present.

**M3 source paths (on Luka's Mac):**
```
/Users/lukasucic/Documents/Claude Code/osfl-balkans/M3-Localization/
├── hr/          Module-01.hr.md ... Module-11.hr.md
├── sr-Latn/
├── sr-Cyrl/
├── bs/
├── cnr/
├── mk/
├── sq/
├── supplements/HR/  RS/  BA/  ME/  MK/  AL/
├── quiz-banks/
├── worksheets/
└── translation-memory.json   ← 160 aligned terms, use for UI strings
```

**On the Ubuntu server:** the M3 content should be rsynced or copied from Luka's Mac before running import:
```bash
rsync -av /path/to/M3-Localization/ /var/www/osfl-balkans/m3-content/
# Then update M3_DIR in import-content.sh to point to /var/www/osfl-balkans/m3-content/
```

---

## Module Front Matter Convention

Hugo modules need front matter. The import script adds it automatically. Format:
```yaml
---
title: "Novac i bankarstvo"
module_number: 1
path: "foundation"        # foundation (1-4) | intermediate (5-8) | advanced (9-11)
lang: "hr"
quiz_file: "Module-01"
weight: 1
---
```

---

## i18n / Language Setup

All 7 languages are defined in `hugo.toml`. Language codes used throughout:

| Hugo folder | Language code | Script | Country |
|---|---|---|---|
| `hr` | hr | Latin | Croatia |
| `sr-latn` | sr-Latn | Latin | Serbia |
| `sr-cyrl` | sr-Cyrl | Cyrillic | Serbia (formal) |
| `bs` | bs | Latin | Bosnia & Herzegovina |
| `cnr` | cnr | Latin | Montenegro |
| `mk` | mk | Cyrillic | North Macedonia |
| `sq` | sq | Latin | Albania |

UI strings are in `i18n/{lang}.yaml`. All 7 files exist with translations. Use `{{ i18n "key" }}` in templates. Add new keys to all 7 files.

---

## Interactive Tools

Three tools live in `static/tools/`. They are standalone HTML + vanilla JS pages, not Hugo templates. They work without Hugo.

| Tool | Path | Status |
|---|---|---|
| Budget Calculator | `/tools/budget-calculator/` | Scaffold complete — needs localization strings |
| Savings Goal Planner | `/tools/savings-planner/` | Scaffold complete — needs localization strings |
| Business Comparator | `/tools/business-comparator/` | Data complete for all 6 countries |

**Tool localization:** Tools currently have English labels. Localization can be added by passing `?lang=hr` via URL parameter and loading strings from a small JSON object. The `translation-memory.json` from M3 contains all relevant terms (T001–T160).

---

## Quiz Engine

The quiz partial is at `layouts/partials/quiz-engine.html`. It reads quiz data from `data/quiz-banks/{lang}/Module-{NN}.json`. 

**Quiz bank format expected:**
```json
{
  "module": 1,
  "lang": "hr",
  "questions": [
    {
      "question": "Što je inflacija?",
      "options": ["Rast cijena", "Pad kamatnih stopa", "Povećanje plaća", "Smanjenje poreza"],
      "correct": 0
    }
  ]
}
```

The M3 quiz banks are Markdown format, not JSON. **They need to be converted** to this JSON format before the quiz engine can read them. This is a pending task.

---

## Analytics: Umami

Install Umami on the Ubuntu server (separate from this repo):
```bash
# Quick install with Docker:
docker run -d --name umami \
  -e DATABASE_URL=postgresql://umami:password@localhost/umami \
  -p 3000:3000 \
  ghcr.io/umami-software/umami:postgresql-latest
```

Then add the tracking script URL to `hugo.toml`:
```toml
[params]
  analyticsURL = "https://analytics.osflbalkans.org/script.js"
```

---

## Nginx Pattern (reference: existing sites)

The server already runs drugakozmicka.com and ethzagreb.com. The Nginx pattern is:
- Config at `/etc/nginx/sites-available/{domain}`
- Symlinked to `/etc/nginx/sites-enabled/{domain}`
- Webroot at `/var/www/{domain}/public/` or similar
- SSL terminated by Cloudflare (no certbot needed — orange cloud mode)

The `server-setup.sh` script follows this exact pattern for osflbalkans.org.

---

## Current State (April 2026)

| Item | Status |
|---|---|
| Hugo project scaffold | ✅ Done |
| 7-language config | ✅ Done |
| Base layouts (baseof, single, list) | ✅ Done |
| Partials (lang-switcher, quiz-engine, country-selector) | ✅ Done |
| i18n strings (all 7 languages) | ✅ Done |
| CSS (main.css, WCAG 2.1 AA) | ✅ Done |
| site.js (language/country persistence) | ✅ Done |
| Budget Calculator (HTML + JS) | ✅ Scaffold complete |
| Savings Goal Planner (HTML + JS) | ✅ Scaffold complete |
| Business Comparator (HTML + JS + data) | ✅ Complete for all 6 countries |
| Content import script | ✅ Done |
| Server setup script | ✅ Done |
| M3 content imported into content/ | ⏳ Run import-content.sh |
| Quiz banks converted to JSON | ⏳ Pending |
| Tool localization (7 languages) | ⏳ Pending |
| Pagefind search integration | ⏳ Pending (run after first build) |
| Umami analytics setup | ⏳ Pending (Ubuntu server) |
| Facilitator pages | ⏳ Pending |
| Homepage design | ⏳ Pending |
| Partnership outreach | ⏳ Pending (W5+) |

---

## Immediate Next Tasks

1. **Import M3 content** — run `bash scripts/import-content.sh` (after rsync of M3 files to server)
2. **Convert quiz banks** — M3 quiz banks are Markdown; write a script to convert to JSON format expected by quiz-engine.html
3. **Build and test** — `hugo server` locally to verify all 77 modules render in all 7 languages
4. **Homepage** — create `content/hr/_index.md` etc. with a welcoming homepage layout
5. **Tool localization** — add `?lang=` support to the three tools using translation-memory.json terms

---

## Key Project Decisions (don't relitigate these)

1. **Hugo over Astro** — chosen for zero runtime, simpler maintenance, built-in i18n
2. **Self-hosted over Cloudflare Pages** — owner already runs Ubuntu server; zero new cost
3. **Vanilla JS tools** — no framework; any developer can maintain these
4. **Montenegrin is its own language variant (cnr)** — not a Serbian alias; added after user testing scored 2.5/5
5. **Tool data is hard-coded in JS** — not loaded from external API; all data bundled at build time
6. **sr-Cyrl generated via transliteration** from sr-Latn (script: `../M3-Localization/transliterate_sr.py`)
7. **Country supplements in English** — instructor-facing; native review recommended before public deployment
8. **Analytics: Umami self-hosted** — not Plausible; zero ongoing cost

---

## Grant Context (for BTA reporting)

- M1 (15,000 EURC): Project setup, curriculum design — ✅ paid
- M2 (15,000 EURC): 11 modules, ~67,000 words — ✅ paid
- M3 (5,000 EURC): 77 translations, 387,000 words — ✅ complete, payment requested
- **M4 (20,000 EURC): This platform — in progress**
- M5 (5,000 EURC): Evaluation & final reporting — not started

Full M4 Development Plan: `../M4-Platform-Partnerships/M4-Development-Plan.md`
