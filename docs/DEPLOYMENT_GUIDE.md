# 🚀 DevForge AI — Deployment & Hosting Guide

Because **DevForge AI** is built with zero build steps and 100% client-side web technologies, it can be hosted on virtually any modern static hosting provider **completely free of charge**.

---

## 📑 Deployment Options

| Provider | Difficulty | Free Tier | Recommended For |
| :--- | :--- | :--- | :--- |
| **GitHub Pages** | ⭐ (Easiest) | Unlimited Public | Open-source repos, fast setup |
| **Vercel** | ⭐ (Very Easy) | Generous Free | Custom domains, preview URLs |
| **Netlify** | ⭐ (Very Easy) | Generous Free | Drag-and-drop, quick previews |
| **Cloudflare Pages** | ⭐ (Easy) | Unlimited Bandwidth | Global edge speed, custom domains |
| **Docker / Nginx** | ⭐⭐ (Medium) | Self-hosted | Enterprise on-premise, intranet |

---

## 1. 🐙 Deploying to GitHub Pages (Recommended)

### Automatic GitHub Actions Deployment (Included)
Our repository includes `.github/workflows/deploy.yml`. To activate it:

1. Push your code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! GitHub will trigger the workflow and publish your site at:
   `https://YOUR_USERNAME.github.io/devforge-ai/`

### Manual Branch Deployment
If you prefer not using Actions:
1. Go to **Settings** > **Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`.
4. Click **Save**.

---

## 2. ▲ Deploying to Vercel

### Method A: Via Vercel Web Dashboard
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New Project**.
3. Import your `devforge-ai` repository.
4. Keep the default settings (Framework Preset: *Other*, Root Directory: `./`).
5. Click **Deploy**.

### Method B: Via Vercel CLI
```bash
npm install -g vercel
vercel
# Follow the interactive prompts, then deploy to production:
vercel --prod
```

---

## 3. 🌐 Deploying to Netlify

### Method A: Drag & Drop (Instant, No Git Needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop your `demo 1` folder directly onto the page.
3. Your site is live immediately!

### Method B: Git Integration
1. Connect your GitHub repository in the Netlify Dashboard.
2. Build command: *(leave blank)*.
3. Publish directory: `.` (or leave blank).
4. Click **Deploy site**.

---

## 4. ⚡ Deploying to Cloudflare Pages

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your `devforge-ai` repository.
4. Set:
   * **Framework preset**: *None*
   * **Build command**: *(leave blank)*
   * **Build output directory**: `.`
5. Click **Save and Deploy**.

---

## 5. 🐳 Deploying via Docker (Self-Hosted / On-Premise)

If you wish to run DevForge AI inside a private enterprise network or on an internal Docker server:

### 1. Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Build and Run:
```bash
# Build the Docker image
docker build -t devforge-ai:latest .

# Run container on port 8080
docker run -d -p 8080:80 --name devforge-workstation devforge-ai:latest
```
Now visit `http://localhost:8080` in your browser.

---

## 6. 💻 Running Locally

### Node.js (via package.json)
```bash
npm start
```

### Python 3
```bash
python -m http.server 3000
```

### PHP Built-in Server
```bash
php -S localhost:3000
```
