<div align="center">

# ⚡ DevForge AI
### Ultimate Developer & AI Engineering Workstation
**100% Client-Side • Privacy-First • Zero Dependencies • Ultra-Fast**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen.svg)](https://pages.github.com/)
[![Pure JavaScript](https://img.shields.io/badge/Stack-HTML5%20%7C%20Vanilla%20CSS%20%7C%20ES6+-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Local%20Storage-purple.svg)](#privacy--offline-first)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-cyan.svg)](docs/CONTRIBUTING.md)

<p align="center">
  <a href="#-features-overview">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-deployment-guide">Deploy to GitHub Pages</a> •
  <a href="#-documentation-directory">Full Documentation</a> •
  <a href="docs/CONTRIBUTING.md">Contributing</a>
</p>

---

</div>

## 🌟 Overview

**DevForge AI** is a state-of-the-art, all-in-one productivity workstation built specifically for software engineers, prompt architects, machine learning practitioners, and DevOps teams.

Tired of juggling 15 open browser tabs for JSON formatting, JWT decoding, token counting, regex debugging, and ambient soundscapes? **DevForge AI consolidates your entire daily engineering toolkit into a single, cohesive, lightning-fast dashboard** that runs entirely inside your browser with zero tracking, zero server calls, and instant local storage persistence.

---

## 🚀 Features Overview

### 1. 🧠 AI Prompt & System Prompt Workbench
* **Dual Multi-Turn Studio**: Craft system and user prompts side-by-side with real-time heuristic token estimation.
* **Token & Cost Calculator**: Instant input/output cost estimates across leading foundation models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek V3, Llama 3.3).
* **Curated Prompt Templates**: 1-click presets for code refactoring, concurrency bug fixing, unit test generation, and system architecture planning.
* **Export Options**: Export formatted prompts directly to JSON, Markdown, or clean text.

### 2. 📊 AI Model Matrix & Hardware VRAM Estimator
* **Model Benchmark Matrix**: Compare context window sizes, HumanEval coding scores, MMLU benchmarks, and pricing across 15+ models.
* **Local Hardware Calculator**: Select parameter count (7B, 14B, 32B, 70B) and quantization level (FP16, Q8, Q4_K_M, Q2_K) to calculate exact VRAM requirements.
* **GPU Recommendations**: Automatic hardware suitability alerts (e.g. RTX 3060, RTX 4090, Apple Silicon unified memory).
* **Instant Ollama Generator**: 1-click terminal command generation for local model execution (`ollama run llama3.3:70b-instruct-q4_K_M`).

### 3. 🛠️ Swiss-Army Developer Utilities
* **JSON Studio**: Format, validate, minify, and inspect JSON with detailed error markers.
* **Regex Engine**: Test regular expressions with instant match highlighting, flag toggles (`g`, `i`, `m`), and common preset patterns.
* **JWT Inspector**: Decode JSON Web Tokens on the fly; inspect headers, claims, and payload securely without transmitting secrets across the web.
* **Base64 & URL Tool**: Fast bi-directional encoding and decoding for strings, API parameters, and payloads.
* **Diff Checker**: Side-by-side textual diff computation for code snippets, configs, and JSON files.
* **UUID & Hash Generator**: Generate cryptographically secure v4 UUIDs and compute client-side SHA-256 / SHA-512 hashes.

### 4. 💻 Live Code Playground & Sandboxes
* **JavaScript Sandbox**: Isolated runtime console with custom logger supporting objects, warnings, and runtime error handling.
* **Live HTML / CSS Previewer**: Real-time iframe sandbox with instant preview and markup experimentation.
* **In-Memory SQL Query Engine**: Query mock relational databases (`developers`, `ai_models`) with standard SQL statements and result tables.

### 5. 📚 AI Developer API Hub
* Instant production-ready code snippets across:
  * **OpenAI API** (Chat completions, streaming, structured outputs)
  * **Anthropic Claude** (System prompts, message streaming)
  * **Google Gemini** (Multimodal analysis, large context inputs)
  * **Ollama Local API** (Self-hosted REST calls)
  * **LangChain & Groq** (LPU ultra-fast inference)

### 6. 🗄️ Snippet Vault & Developer Scratchpad
* Categorized storage for code snippets, prompt chains, and configuration scripts.
* Full client-side persistence in `localStorage`.
* Tag filtering (TypeScript, Python, Docker, AI, Rust) and instant copy functionality.

### 7. 🎧 Focus Lab & Soundscape Synthesizer
* **Pomodoro Timer**: Configurable focus sessions (25/50/60 min) with dynamic browser tab countdown.
* **Pure Web Audio API Soundscapes**: Synthesizes generative audio on-the-fly without downloading audio files:
  * White Noise & Pink Noise (Calibrated relaxation filters)
  * Brown Noise (Deep low-frequency focus drone)
  * Binaural Focus Tone (432Hz harmonic beat generator)
  * Rain & Storm Simulator (Modulated pink noise with random thunder decays)
* **Dev Task Scratchpad**: Minimalist Kanban/checklist for daily priorities.

### 8. ⚡ Global Command Palette (`Ctrl + K` / `Cmd + K`)
* Universal command bar accessible from anywhere in the application.
* Instant navigation, theme toggling, quick UUID generation, and timer triggers.

### 9. 🎨 Adaptive Theme Engine
* **Dark / Light Mode**: Full high-contrast dark theme and clean light theme.
* **5 Vibrant Accent Palettes**: Cyber Cyan, Neon Purple, Emerald Glow, Sunset Flame, and Golden Amber.
* **Interactive Visuals**: Real-time HTML5 canvas constellation background with interactive mouse-spotlight cards.

---

## 📁 Repository Structure

```text
devforge-ai/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml              # Automatic GitHub Pages CI/CD workflow
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md           # Issue template for reporting bugs
│   │   └── feature_request.md      # Issue template for new tool requests
│   └── PULL_REQUEST_TEMPLATE.md    # Pull request checklist & template
├── docs/                           # 📖 Comprehensive Documentation Hub
│   ├── README.md                   # Docs directory index
│   ├── GITHUB_SETUP_WALKTHROUGH.md # Step-by-step GitHub publishing guide
│   ├── ARCHITECTURE.md             # Technical architecture & state flow
│   ├── FEATURES_GUIDE.md           # In-depth user manual for all tools
│   ├── DEPLOYMENT_GUIDE.md         # Deployment to GitHub Pages, Vercel, Docker
│   └── CONTRIBUTING.md             # Contributing guidelines & code standards
├── index.html                      # Semantic application structure (1,480+ lines)
├── styles.css                      # Modern CSS design system & animations (1,800+ lines)
├── script.js                       # Comprehensive client-side logic (2,100+ lines)
├── package.json                    # Project metadata & local dev scripts
├── .gitignore                      # Git ignore patterns
└── LICENSE                         # MIT Open Source License
```

---

## ⚡ Quick Start

### Option A: Open Directly in Browser (No Server Required!)
Because DevForge AI is built with modern standard web technologies (HTML5, Vanilla CSS, ES6+ JavaScript), you can run it immediately without compiling or installing anything:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/devforge-ai.git
   cd devforge-ai
   ```
2. Double-click `index.html` or open it with your favorite browser:
   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

### Option B: Run with a Local Static Server
If you prefer running via `localhost`:

```bash
# Using Node.js (via package.json)
npm start

# OR using Python 3
python -m http.server 3000

# OR using npx serve directly
npx serve . -l 3000
```
Visit `http://localhost:3000` in your browser.

---

## 🚢 Posting Your Project to GitHub (Step-by-Step)

Follow these quick commands to push this project to your GitHub account:

### 1. Initialize Git and Commit
```bash
git init -b main
git add .
git commit -m "feat: initial release of DevForge AI workstation"
```

### 2. Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Set the repository name to `devforge-ai`.
3. Choose **Public** (or **Private**).
4. Do **not** check "Add a README file", ".gitignore", or "license" (these are already created).
5. Click **Create repository**.

### 3. Connect and Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/devforge-ai.git
git push -u origin main
```

### 4. Enable Free GitHub Pages Hosting
1. On your GitHub repo, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions** (our included `.github/workflows/deploy.yml` will automatically build and publish).
3. Alternatively, select **Deploy from a branch** > branch `main` > folder `/ (root)` > click **Save**.
4. Your site will be live within 60 seconds at:  
   `https://YOUR_USERNAME.github.io/devforge-ai/`

👉 **For the complete walkthrough with troubleshooting, SSH instructions, and GitHub CLI methods, read [docs/GITHUB_SETUP_WALKTHROUGH.md](docs/GITHUB_SETUP_WALKTHROUGH.md).**

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Open Command Palette | Universal quick launcher and navigation |
| <kbd>Esc</kbd> | Close Modals | Closes Command Palette or Auth dialog |
| <kbd>Click Outside</kbd> | Dismiss Menus | Closes accent pickers, profile dropdowns |

---

## 🔒 Privacy & Offline First

* **Zero External Telemetry**: DevForge AI does not send user data, code, prompts, or JWTs to any third-party server.
* **100% Client-Side Compute**: Calculations (VRAM, tokens, regex matching, audio synthesis, SQL execution) run directly on your device's CPU/browser runtime.
* **Local Persistence**: User sessions, custom code snippets, and active tasks are stored safely in browser `localStorage`.

---

## 📖 Full Documentation Directory

| Document | Purpose |
| :--- | :--- |
| 📘 [docs/GITHUB_SETUP_WALKTHROUGH.md](docs/GITHUB_SETUP_WALKTHROUGH.md) | Step-by-step guide to push to GitHub, setup GitHub Pages, and create releases |
| 🏗️ [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, state flow, Web Audio engine, Canvas renderer, and component breakdown |
| 🧰 [docs/FEATURES_GUIDE.md](docs/FEATURES_GUIDE.md) | Exhaustive user manual for each developer utility, calculator, and playground |
| 🚀 [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) | Production hosting on GitHub Pages, Vercel, Netlify, Cloudflare, and Docker |
| 🤝 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contributor guidelines, code style, pull request workflow, and roadmap |

---

## 🤝 Contributing

Contributions are warmly welcomed! Whether you want to add a new developer utility, improve the prompt templates, or optimize performance:
1. Review [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)
2. Fork the repository
3. Create your feature branch (`git checkout -b feature/amazing-tool`)
4. Commit your changes (`git commit -m 'feat: add amazing tool'`)
5. Push to the branch (`git push origin feature/amazing-tool`)
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ for the global developer and AI engineering community.
</div>
