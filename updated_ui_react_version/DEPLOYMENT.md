# Deployment Guide for Happy Valley Park Website

**Target:** Hostinger VPS (`93.127.206.52`)
**Domain:** `fend.gohappyvalley.com`
**Repo:** `https://github.com/royal300/happy_valley_park`

This guide explains how to set up your VPS to host the application in a **separate directory** to avoid conflicts.

## Step 1: VPS Setup (One-Time)

Log in to your VPS:
```bash
ssh root@93.127.206.52
```

### 1. Install Prerequisites
Ensure Git, Node.js, and Nginx are installed.
```bash
apt update
apt install -y git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### 2. Setup Project Directory & Clone Repo
We will host this site in **`/var/www/happyvalley_frontend`**.

```bash
# Create the NEW separate directory
mkdir -p /var/www/happyvalley_frontend

# Clone the repository into this directory
git clone https://github.com/royal300/happy_valley_park /var/www/happyvalley_frontend

# Navigate to the PROJECT SUBDIRECTORY to install dependencies
cd /var/www/happyvalley_frontend/updated_ui_react_version

# Install dependencies and build
npm install
npm run build
```

### 3. Configure Nginx
Create a **new** Nginx server block file `happyvalley_frontend`.

```bash
nano /etc/nginx/sites-available/happyvalley_frontend
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name fend.gohappyvalley.com;

    # Point to the 'dist' folder inside the NEW directory
    root /var/www/happyvalley_frontend/updated_ui_react_version/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site and reload:
```bash
ln -s /etc/nginx/sites-available/happyvalley_frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Step 4: Secure with HTTPS (SSL)

To enable HTTPS for `fend.gohappyvalley.com`, run the following commands on your VPS:

1.  **Install Certbot:**
    ```bash
    apt install -y certbot python3-certbot-nginx
    ```

2.  **Obtain and Install Certificate:**
    ```bash
    certbot --nginx -d fend.gohappyvalley.com
    ```

    - Enter your email when asked.
    - Agree to terms (`A`).
    - Choose whether to share email (`Y` or `N`).
    - Certbot will automatically update your Nginx configuration.

3.  **Verify Auto-Renewal:**
    ```bash
    systemctl status certbot.timer
    ```

---

## Step 2: Automated Deployment

The `deploy.sh` script is configured to update the site in `/var/www/happyvalley_frontend`.

### How to use:
1.  Push changes to Git.
2.  Run:
    ```bash
    ./deploy.sh
    ```
