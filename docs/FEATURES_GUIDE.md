# 🧰 DevForge AI — Features & User Guide

An exhaustive manual for every tool, utility, and workflow provided inside **DevForge AI**.

---

## 📑 Table of Contents

1. [AI Prompt & System Prompt Workbench](#1-ai-prompt--system-prompt-workbench)
2. [AI Model Matrix & Local VRAM Calculator](#2-ai-model-matrix--local-vram-calculator)
3. [Swiss-Army Developer Utilities](#3-swiss-army-developer-utilities)
4. [Live Code Playground & Sandboxes](#4-live-code-playground--sandboxes)
5. [AI Developer API Hub](#5-ai-developer-api-hub)
6. [Snippet Vault & Developer Scratchpad](#6-snippet-vault--developer-scratchpad)
7. [Focus Lab & Soundscape Synthesizer](#7-focus-lab--soundscape-synthesizer)
8. [Global Command Palette (Ctrl + K)](#8-global-command-palette-ctrl--k)
9. [Personalization & Theme Engine](#9-personalization--theme-engine)

---

## 1. AI Prompt & System Prompt Workbench

The Prompt Studio is crafted for prompt engineers, researchers, and developers crafting production-ready system instructions.

### Core Capabilities:
* **System & User Split**: Maintain strict boundary between system instructions and conversational user inputs.
* **Token Estimator**: Calculates token heuristics based on tokenization averages ($\approx 4\text{ characters}$ per token in English and code).
* **Cost Predictor**: Estimates dollar cost per 1,000 queries across:
  * OpenAI GPT-4o
  * Anthropic Claude 3.5 Sonnet
  * Google Gemini 1.5 Pro
  * DeepSeek V3
  * Meta Llama 3.3 (Local / Free)
* **Preset Template Injector**:
  * **Architecture Refactor**: Enforces SOLID principles and zero-allocation patterns.
  * **Concurrency Bugfix**: Pinpoints race conditions and unhandled promise rejections.
  * **Unit Test Generator**: Writes comprehensive Jest / Vitest boundary test suites.
  * **System Design Spec**: Produces RFC-style architectural proposals.
* **Export Actions**: Copy to clipboard, export as Markdown, or download as JSON payload.

---

## 2. AI Model Matrix & Local VRAM Calculator

Plan local self-hosted AI deployments and compare leading cloud models.

### Model Matrix Comparison Table:
* Filter models by category: All, Frontier LLM, Open Weights, Coding Specialists.
* Real-time search by model name, provider, or capability.
* Key benchmark metrics displayed: Context window ($K$), HumanEval ($%$), and pricing per million tokens.

### Hardware VRAM & Quantization Calculator:
1. **Model Parameter Count**: Select `7B`, `8B`, `14B`, `32B`, or `70B`.
2. **Quantization Level**: Select precision:
   * `FP16` (Full precision, 16-bit)
   * `Q8_0` (8-bit quantized, near lossless)
   * `Q4_K_M` (4-bit medium, optimal speed/quality trade-off)
   * `Q2_K` (2-bit extreme compression)
3. **Instant Outputs**:
   * Calculated VRAM Requirement (GB)
   * Recommended Hardware Tier (e.g., RTX 3060, RTX 4090, Apple Silicon Mac Studio)
   * **1-Click Ollama Terminal Command**: Ready to copy and paste directly into your terminal.

---

## 3. Swiss-Army Developer Utilities

A comprehensive suite of essential daily tools:

### A. JSON Studio
* **Format & Beautify**: Indents messy JSON with clean 2-space indentation.
* **Minify**: Strips all whitespace for compact payload transmission.
* **Syntax Validation**: Catches trailing commas, unquoted keys, and malformed characters with explicit line error messages.

### B. Regex Engine
* Test regular expressions in real-time with instant match highlighting.
* Toggle active flags: `g` (global), `i` (case-insensitive), `m` (multiline).
* Quick presets: Email matching, URLs, IPv4 addresses, ISO-8601 timestamps, Semantic Versioning (SemVer).

### C. JWT Inspector
* Paste any JSON Web Token (`eyJhbGciOi...`).
* Instantly decodes the Header, Payload claims, and Signature validity.
* **Privacy Assurance**: Decoding runs entirely via client-side Base64URL parsing. No tokens are sent over the network.

### D. Base64 & URL Tool
* Bi-directional encoding and decoding for standard Base64 strings.
* URL encoding and decoding for URI components, query parameters, and redirects.

### E. Diff Checker
* Paste two versions of code, JSON, or configuration.
* Computes added, modified, and removed lines with side-by-side colorized highlighting.

### F. UUID & Hash Tool
* Cryptographic v4 UUID generation with one-click copy.
* Client-side cryptographic hashing (SHA-256 / SHA-512) via the Web Cryptography API (`crypto.subtle`).

---

## 4. Live Code Playground & Sandboxes

Test code ideas without leaving your workspace.

* **JavaScript Console Sandbox**:
  * Execute modern ES6+ code in an isolated scoped runner.
  * Injected custom console logs objects, arrays, warnings, and errors directly to the built-in terminal.
* **HTML / CSS Live Sandbox**:
  * Write HTML markup and CSS rules with instant live iframe rendering.
* **In-Memory SQL Studio**:
  * Execute real SQL statements against preloaded relational tables (`developers`, `ai_models`).
  * Features pre-configured SQL query chips (e.g. `SELECT * FROM developers WHERE rating >= 4.8`).

---

## 5. AI Developer API Hub

Production-ready integration recipes for top AI APIs:
* **OpenAI SDK** (`openai`)
* **Anthropic Claude SDK** (`@anthropic-ai/sdk`)
* **Google Gemini SDK** (`@google/genai`)
* **Ollama REST API** (curl / fetch)
* **Groq SDK** (ultra-fast LPU inference)

Includes one-click copy buttons for immediate integration into your backends.

---

## 6. Snippet Vault & Developer Scratchpad

Never lose a useful snippet or prompt again:
* Save snippets with Title, Tag (TypeScript, Python, Docker, AI, Rust), and Code.
* Filter by tag with instant multi-tag pills.
* All snippets persist across browser restarts via `localStorage`.

---

## 7. Focus Lab & Soundscape Synthesizer

Stay in the flow state while engineering complex systems.

### Pomodoro Focus Timer:
* Preset durations: 25 min (Standard), 50 min (Deep Work), 15 min (Short Break).
* Live title bar countdown update (`(24:59) DevForge AI`).
* Audio chime alert upon session completion.

### Web Audio Ambient Soundscapes:
* **White Noise**: Crisp, high-frequency distraction blocker.
* **Pink Noise**: Balanced, natural frequency roll-off for long coding sessions.
* **Brown Noise**: Deep, rumble-like frequency profile favored for intense focus.
* **Rain Simulator**: Generative rain drops with modulated pink noise filters.
* **Binaural 432Hz Tone**: Pure dual-oscillator 4Hz theta wave beat for deep concentration.

---

## 8. Global Command Palette (Ctrl + K)

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (Windows/Linux) or <kbd>Cmd</kbd> + <kbd>K</kbd> (macOS) to activate:
* **Quick Navigation**: Jump straight to Workbench, Models, Utilities, Playground, or Focus Lab.
* **Instant Actions**:
  * Generate and copy a UUID v4
  * Start / pause the Pomodoro timer
  * Toggle between Dark and Light mode
  * Open user authentication dialog

---

## 9. Personalization & Theme Engine

* **Theme Modes**: High-contrast dark theme or clean daylight theme.
* **5 Accent Colors**:
  * **Cyber Cyan** (`#00f2fe`)
  * **Neon Purple** (`#a855f7`)
  * **Emerald Glow** (`#10b981`)
  * **Sunset Flame** (`#f43f5e`)
  * **Golden Amber** (`#f59e0b`)
* Dynamic CSS custom property updates propagate across background particles, borders, badges, buttons, and glowing spotlights immediately.
