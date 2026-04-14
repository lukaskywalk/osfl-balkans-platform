#!/usr/bin/env bash
# server-setup.sh
# Sets up the OSFL Balkans platform on a fresh Ubuntu server.
# Assumes: Nginx already installed (same server as drugakozmicka.com / ethzagreb.com)
# Run as root or with sudo: sudo bash scripts/server-setup.sh
#
# What this does:
#   1. Installs Hugo (extended binary)
#   2. Creates the web root directory
#   3. Writes the Nginx server block
#   4. Installs Umami analytics (optional — prompts)
#   5. Clones the repo and does the first build

set -euo pipefail

DOMAIN="osflbalkans.org"
WEBROOT="/var/www/osfl-balkans/public"
REPO_URL="https://github.com/lukaskywalk/osfl-balkans-platform.git"
REPO_DIR="/var/www/osfl-balkans/repo"
HUGO_VERSION="0.160.1"  # update to latest stable

echo "=== OSFL Balkans Server Setup ==="
echo "Domain:  $DOMAIN"
echo "Webroot: $WEBROOT"
echo ""

# --- 1. Install Hugo ---
if ! command -v hugo &>/dev/null; then
  echo "[1/5] Installing Hugo $HUGO_VERSION..."
  HUGO_TAR="hugo_extended_${HUGO_VERSION}_linux-arm64.tar.gz"
  # Use amd64 if not ARM:
  ARCH=$(uname -m)
  if [ "$ARCH" = "x86_64" ]; then HUGO_TAR="hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"; fi
  wget -q "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_TAR}" -O /tmp/hugo.tar.gz
  tar -xzf /tmp/hugo.tar.gz -C /tmp hugo
  mv /tmp/hugo /usr/local/bin/hugo
  rm /tmp/hugo.tar.gz
  echo "  Hugo installed: $(hugo version)"
else
  echo "[1/5] Hugo already installed: $(hugo version)"
fi

# --- 2. Create web root ---
echo "[2/5] Creating web root..."
mkdir -p "$WEBROOT"
mkdir -p "$REPO_DIR"

# --- 3. Clone repo and build ---
echo "[3/5] Cloning repository..."
if [ -d "$REPO_DIR/.git" ]; then
  cd "$REPO_DIR" && git pull
else
  git clone "$REPO_URL" "$REPO_DIR"
fi

echo "  Running content import script..."
cd "$REPO_DIR"
# If M3 content is available on this server, run import; otherwise skip
if [ -f "scripts/import-content.sh" ]; then
  bash scripts/import-content.sh || echo "  (Import skipped — M3 content not present on this server)"
fi

echo "  Building site..."
hugo --minify --destination "$WEBROOT" --source "$REPO_DIR"
echo "  Build complete. Files in $WEBROOT"

# --- 4. Nginx config ---
echo "[4/5] Writing Nginx config..."
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

cat > "$NGINX_CONF" << NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root $WEBROOT;
    index index.html;

    # Serve pre-built static files
    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }

    # Cache static assets aggressively (Cloudflare will also cache)
    location ~* \.(css|js|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|json)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Pagefind search assets
    location /pagefind/ {
        try_files \$uri =404;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
    gzip_min_length 1000;

    access_log /var/log/nginx/${DOMAIN}_access.log;
    error_log  /var/log/nginx/${DOMAIN}_error.log;
}
NGINX

# Enable site
ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$DOMAIN"

# Test and reload Nginx
nginx -t && systemctl reload nginx
echo "  Nginx config written and reloaded."
echo "  Note: SSL is handled by Cloudflare (orange cloud proxy). No certbot needed."

# --- 5. Deploy script ---
echo "[5/5] Writing deploy script to /usr/local/bin/osfl-deploy..."
cat > /usr/local/bin/osfl-deploy << 'DEPLOY'
#!/usr/bin/env bash
# osfl-deploy: pull latest code and rebuild the site
# Usage: osfl-deploy
set -euo pipefail
cd /var/www/osfl-balkans/repo
git pull
hugo --minify --destination /var/www/osfl-balkans/public --source .
# Rebuild Pagefind search index
if command -v npx &>/dev/null; then
  npx pagefind --source /var/www/osfl-balkans/public
fi
echo "Deploy complete: $(date)"
DEPLOY
chmod +x /usr/local/bin/osfl-deploy

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Point $DOMAIN DNS A record to this server's IP in Cloudflare"
echo "  2. Enable Cloudflare orange cloud (proxy) for SSL"
echo "  3. Run 'osfl-deploy' after any code changes"
echo "  4. (Optional) Set up Umami analytics — see scripts/install-umami.sh"
echo ""
echo "Deploy command: osfl-deploy"
