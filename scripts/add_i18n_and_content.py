#!/usr/bin/env python3
"""
add_i18n_and_content.py
Appends new i18n keys to all 7 language files and creates
_index.md content files for homepage, tools, and facilitator sections.
"""

from pathlib import Path

REPO_DIR = Path(__file__).parent.parent.resolve()

# ── New i18n keys by language ────────────────────────────────────────────────

NEW_KEYS = {
    "hr": {
        "hero_title": "Financijska pismenost za Balkan",
        "hero_subtitle": "Besplatni otvoreni kurikulum u 7 jezika za 6 zemalja. Od osnova do poduzetništva.",
        "cta_modules": "Pregledaj module",
        "cta_tools": "Istraži alate",
        "cta_start": "Počni",
        "cta_open_tool": "Otvori alat",
        "paths_heading": "Odaberi razinu",
        "modules": "Moduli",
        "path_foundation_desc": "Novac, bankarstvo, budžetiranje i upravljanje dugom. Nema preduvjeta.",
        "path_intermediate_desc": "Ulaganje, osiguranje, porezi i planiranje mirovine.",
        "path_advanced_desc": "Poduzetništvo, poslovne strukture i napredne strategije.",
        "tools_heading": "Interaktivni alati",
        "tool_budget_name": "Kalkulator budžeta",
        "tool_budget_desc": "Unesi prihode i rashode — vidi raspodjelu prema pravilu 50/30/20.",
        "tool_savings_name": "Planer štednje",
        "tool_savings_desc": "Izračunaj koliko trebate štedjeti svaki mjesec da dostigneš cilj.",
        "tool_comparator_name": "Usporedba poslovnih struktura",
        "tool_comparator_desc": "Usporedi pravne oblike poslovanja dostupne u tvojoj zemlji.",
        "grant_note": "Projekt sufinancira",
        "license_note": "Sadržaj dostupan pod licencom",
        "facilitator_title": "Za facilitatore",
        "facilitator_intro": "Sve što vam treba za vođenje OSFL radionica — vodiči, radni listići i planovi sjednica.",
        "facilitator_worksheets": "Radni listići",
        "facilitator_guides": "Vodiči za facilitatore",
        "facilitator_sessions": "Planovi sjednica",
    },
    "sr-latn": {
        "hero_title": "Finansijska pismenost za Balkan",
        "hero_subtitle": "Besplatni otvoreni kurikulum na 7 jezika za 6 zemalja. Od osnova do preduzetništva.",
        "cta_modules": "Pregledaj module",
        "cta_tools": "Istraži alate",
        "cta_start": "Počni",
        "cta_open_tool": "Otvori alat",
        "paths_heading": "Odaberi nivo",
        "modules": "Moduli",
        "path_foundation_desc": "Novac, bankarstvo, budžetiranje i upravljanje dugom. Bez preduslova.",
        "path_intermediate_desc": "Ulaganje, osiguranje, porezi i planiranje penzije.",
        "path_advanced_desc": "Preduzetništvo, poslovne strukture i napredne strategije.",
        "tools_heading": "Interaktivni alati",
        "tool_budget_name": "Kalkulator budžeta",
        "tool_budget_desc": "Unesi prihode i rashode — vidi raspodelu prema pravilu 50/30/20.",
        "tool_savings_name": "Planer štednje",
        "tool_savings_desc": "Izračunaj koliko treba da štediš svaki mesec da dostigneš cilj.",
        "tool_comparator_name": "Poređenje poslovnih struktura",
        "tool_comparator_desc": "Uporedi pravne oblike poslovanja dostupne u tvojoj zemlji.",
        "grant_note": "Projekat sufinansira",
        "license_note": "Sadržaj dostupan pod licencom",
        "facilitator_title": "Za facilitatore",
        "facilitator_intro": "Sve što vam treba za vođenje OSFL radionica — vodiči, radni listovi i planovi sesija.",
        "facilitator_worksheets": "Radni listovi",
        "facilitator_guides": "Vodiči za facilitatore",
        "facilitator_sessions": "Planovi sesija",
    },
    "sr-cyrl": {
        "hero_title": "Финансијска писменост за Балкан",
        "hero_subtitle": "Бесплатни отворени курикулум на 7 језика за 6 земаља. Од основа до предузетништва.",
        "cta_modules": "Прегледај модуле",
        "cta_tools": "Истражи алате",
        "cta_start": "Почни",
        "cta_open_tool": "Отвори алат",
        "paths_heading": "Одабери ниво",
        "modules": "Модули",
        "path_foundation_desc": "Новац, банкарство, буџетирање и управљање дугом. Без предуслова.",
        "path_intermediate_desc": "Улагање, осигурање, порези и планирање пензије.",
        "path_advanced_desc": "Предузетништво, пословне структуре и напредне стратегије.",
        "tools_heading": "Интерактивни алати",
        "tool_budget_name": "Калкулатор буџета",
        "tool_budget_desc": "Унеси приходе и расходе — види расподелу према правилу 50/30/20.",
        "tool_savings_name": "Планер штедње",
        "tool_savings_desc": "Израчунај колико треба да штедиш сваки месец да достигнеш циљ.",
        "tool_comparator_name": "Поређење пословних структура",
        "tool_comparator_desc": "Упореди правне облике пословања доступне у твојој земљи.",
        "grant_note": "Пројекат суфинансира",
        "license_note": "Садржај доступан под лиценцом",
        "facilitator_title": "За фацилитаторе",
        "facilitator_intro": "Све што вам треба за вођење OSFL радионица — водичи, радни листови и планови сесија.",
        "facilitator_worksheets": "Радни листови",
        "facilitator_guides": "Водичи за фацилитаторе",
        "facilitator_sessions": "Планови сесија",
    },
    "bs": {
        "hero_title": "Finansijska pismenost za Balkan",
        "hero_subtitle": "Besplatni otvoreni kurikulum na 7 jezika za 6 zemalja. Od osnova do poduzetništva.",
        "cta_modules": "Pregledaj module",
        "cta_tools": "Istraži alate",
        "cta_start": "Počni",
        "cta_open_tool": "Otvori alat",
        "paths_heading": "Odaberi razinu",
        "modules": "Moduli",
        "path_foundation_desc": "Novac, bankarstvo, budžetiranje i upravljanje dugom. Nema preduvjeta.",
        "path_intermediate_desc": "Ulaganje, osiguranje, porezi i planiranje penzije.",
        "path_advanced_desc": "Poduzetništvo, poslovne strukture i napredne strategije.",
        "tools_heading": "Interaktivni alati",
        "tool_budget_name": "Kalkulator budžeta",
        "tool_budget_desc": "Unesi prihode i rashode — vidi raspodjelu prema pravilu 50/30/20.",
        "tool_savings_name": "Planer štednje",
        "tool_savings_desc": "Izračunaj koliko treba štedjeti svaki mjesec da dostigneš cilj.",
        "tool_comparator_name": "Usporedba poslovnih struktura",
        "tool_comparator_desc": "Usporedi pravne oblike poslovanja dostupne u tvojoj zemlji.",
        "grant_note": "Projekat sufinansira",
        "license_note": "Sadržaj dostupan pod licencom",
        "facilitator_title": "Za facilitatore",
        "facilitator_intro": "Sve što vam treba za vođenje OSFL radionica — vodiči, radni listovi i planovi sjednica.",
        "facilitator_worksheets": "Radni listovi",
        "facilitator_guides": "Vodiči za facilitatore",
        "facilitator_sessions": "Planovi sjednica",
    },
    "cnr": {
        "hero_title": "Finansijska pismenost za Balkan",
        "hero_subtitle": "Besplatni otvoreni kurikulum na 7 jezika za 6 zemalja. Od osnova do poduzetništva.",
        "cta_modules": "Pregledaj module",
        "cta_tools": "Istraži alate",
        "cta_start": "Počni",
        "cta_open_tool": "Otvori alat",
        "paths_heading": "Odaberi nivo",
        "modules": "Moduli",
        "path_foundation_desc": "Novac, bankarstvo, budžetiranje i upravljanje dugom. Nema preduvjeta.",
        "path_intermediate_desc": "Ulaganje, osiguranje, porezi i planiranje penzije.",
        "path_advanced_desc": "Poduzetništvo, poslovne strukture i napredne strategije.",
        "tools_heading": "Interaktivni alati",
        "tool_budget_name": "Kalkulator budžeta",
        "tool_budget_desc": "Unesi prihode i rashode — vidi raspodjelu prema pravilu 50/30/20.",
        "tool_savings_name": "Planer štednje",
        "tool_savings_desc": "Izračunaj koliko treba štedjeti svaki mjesec da dostigneš cilj.",
        "tool_comparator_name": "Poređenje poslovnih struktura",
        "tool_comparator_desc": "Uporedi pravne oblike poslovanja dostupne u tvojoj zemlji.",
        "grant_note": "Projekat sufinansira",
        "license_note": "Sadržaj dostupan pod licencom",
        "facilitator_title": "Za facilitatore",
        "facilitator_intro": "Sve što vam treba za vođenje OSFL radionica — vodiči, radni listovi i planovi sjednica.",
        "facilitator_worksheets": "Radni listovi",
        "facilitator_guides": "Vodiči za facilitatore",
        "facilitator_sessions": "Planovi sjednica",
    },
    "mk": {
        "hero_title": "Финансиска писменост за Балканот",
        "hero_subtitle": "Бесплатен отворен курикулум на 7 јазици за 6 земји. Од основи до претприемништво.",
        "cta_modules": "Прегледај ги модулите",
        "cta_tools": "Истражи ги алатките",
        "cta_start": "Започни",
        "cta_open_tool": "Отвори алатка",
        "paths_heading": "Одбери ниво",
        "modules": "Модули",
        "path_foundation_desc": "Пари, банкарство, буџетирање и управување со долг. Нема предуслови.",
        "path_intermediate_desc": "Инвестирање, осигурување, даноци и планирање на пензија.",
        "path_advanced_desc": "Претприемништво, деловни структури и напредни стратегии.",
        "tools_heading": "Интерактивни алатки",
        "tool_budget_name": "Калкулатор на буџет",
        "tool_budget_desc": "Внеси приходи и расходи — види ја распределбата според правилото 50/30/20.",
        "tool_savings_name": "Планер на штедење",
        "tool_savings_desc": "Пресметај колку треба да штедиш секој месец за да ја достигнеш целта.",
        "tool_comparator_name": "Споредба на деловни структури",
        "tool_comparator_desc": "Спореди ги правните форми на работење достапни во твојата земја.",
        "grant_note": "Проектот го финансира",
        "license_note": "Содржината е достапна под лиценца",
        "facilitator_title": "За фасилитатори",
        "facilitator_intro": "Сè што ви треба за водење на OSFL работилници — прирачници, работни листови и планови за сесии.",
        "facilitator_worksheets": "Работни листови",
        "facilitator_guides": "Прирачници за фасилитатори",
        "facilitator_sessions": "Планови за сесии",
    },
    "sq": {
        "hero_title": "Arsimi financiar për Ballkanin",
        "hero_subtitle": "Kurrikul i hapur falas në 7 gjuhë për 6 vende. Nga bazat deri tek sipërmarrja.",
        "cta_modules": "Shiko modulet",
        "cta_tools": "Eksploro mjetet",
        "cta_start": "Fillo",
        "cta_open_tool": "Hap mjetin",
        "paths_heading": "Zgjidhni nivelin",
        "modules": "Modulet",
        "path_foundation_desc": "Para, banka, buxhetim dhe menaxhim borxhi. Pa parakushte.",
        "path_intermediate_desc": "Investime, sigurime, taksa dhe planifikim pensioni.",
        "path_advanced_desc": "Sipërmarrja, strukturat e biznesit dhe strategji të avancuara.",
        "tools_heading": "Mjete interaktive",
        "tool_budget_name": "Kalkulator buxheti",
        "tool_budget_desc": "Shkruaj të ardhurat dhe shpenzimet — shiko ndarjen sipas rregullit 50/30/20.",
        "tool_savings_name": "Planifikues kursimesh",
        "tool_savings_desc": "Llogarit sa duhet të kursesh çdo muaj për të arritur qëllimin.",
        "tool_comparator_name": "Krahasues strukturash biznesi",
        "tool_comparator_desc": "Krahaso format ligjore të biznesit të disponueshme në vendin tënd.",
        "grant_note": "Projekt i financuar nga",
        "license_note": "Përmbajtja disponohet nën licencën",
        "facilitator_title": "Për lehtësuesit",
        "facilitator_intro": "Gjithçka që ju nevojitet për të drejtuar punëtorito OSFL — udhëzues, fletë pune dhe plane sesionesh.",
        "facilitator_worksheets": "Fletë pune",
        "facilitator_guides": "Udhëzues për lehtësuesit",
        "facilitator_sessions": "Plane sesionesh",
    },
}

# ── Append new keys to i18n files ────────────────────────────────────────────
for lang, keys in NEW_KEYS.items():
    f = REPO_DIR / "i18n" / f"{lang}.yaml"
    existing = f.read_text(encoding="utf-8") if f.exists() else ""
    lines_to_add = []
    for key, val in keys.items():
        if f"{key}:" not in existing:
            # Escape any double quotes in value
            val_safe = val.replace('"', '\\"')
            lines_to_add.append(f'{key}: "{val_safe}"')
    if lines_to_add:
        with f.open("a", encoding="utf-8") as fh:
            fh.write("\n" + "\n".join(lines_to_add) + "\n")
        print(f"  ✓  i18n/{lang}.yaml — added {len(lines_to_add)} keys")
    else:
        print(f"  –  i18n/{lang}.yaml — all keys already present")

# ── Homepage _index.md for all 7 languages ───────────────────────────────────
homepage_titles = {
    "hr": "OSFL Balkans — Financijska pismenost",
    "sr-latn": "OSFL Balkans — Finansijska pismenost",
    "sr-cyrl": "OSFL Balkans — Финансијска писменост",
    "bs": "OSFL Balkans — Finansijska pismenost",
    "cnr": "OSFL Balkans — Finansijska pismenost",
    "mk": "OSFL Balkans — Финансиска писменост",
    "sq": "OSFL Balkans — Arsimi financiar",
}
for lang, title in homepage_titles.items():
    f = REPO_DIR / "content" / lang / "_index.md"
    if not f.exists():
        f.write_text(f'---\ntitle: "{title}"\n---\n', encoding="utf-8")
        print(f"  ✓  content/{lang}/_index.md")

# ── Tools section content ─────────────────────────────────────────────────────
tools_titles = {
    "hr": "Alati", "sr-latn": "Alati", "sr-cyrl": "Алати",
    "bs": "Alati", "cnr": "Alati", "mk": "Алатки", "sq": "Mjetet",
}
for lang, title in tools_titles.items():
    d = REPO_DIR / "content" / lang / "tools"
    d.mkdir(parents=True, exist_ok=True)
    f = d / "_index.md"
    if not f.exists():
        f.write_text(f'---\ntitle: "{title}"\n---\n', encoding="utf-8")
        print(f"  ✓  content/{lang}/tools/_index.md")

# ── Facilitator section content ───────────────────────────────────────────────
facilitator_titles = {
    "hr": "Za facilitatore", "sr-latn": "Za facilitatore", "sr-cyrl": "За фацилитаторе",
    "bs": "Za facilitatore", "cnr": "Za facilitatore", "mk": "За фасилитатори", "sq": "Për lehtësuesit",
}
for lang, title in facilitator_titles.items():
    d = REPO_DIR / "content" / lang / "facilitator"
    d.mkdir(parents=True, exist_ok=True)
    f = d / "_index.md"
    if not f.exists():
        f.write_text(f'---\ntitle: "{title}"\n---\n', encoding="utf-8")
        print(f"  ✓  content/{lang}/facilitator/_index.md")

print("\nDone.")
