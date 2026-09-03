# 🤝 Contributing to DevForge AI

Thank you for your interest in contributing to **DevForge AI**! We welcome contributions from developers, designers, prompt engineers, and open-source enthusiasts worldwide.

---

## 📜 Code of Conduct

* Be respectful, welcoming, and inclusive to all contributors.
* Provide constructive, clear, and actionable feedback during code reviews.
* Focus on keeping DevForge AI fast, privacy-focused, accessible, and lightweight.

---

## 🛠️ How to Contribute

### 1. Reporting Bugs
Before submitting an issue, search the [GitHub Issues](https://github.com/YOUR_USERNAME/devforge-ai/issues) to ensure the bug hasn't already been reported.

When creating a bug report, please include:
* Clear description of the bug.
* Steps to reproduce the issue.
* Browser and OS version (e.g. Chrome 128 on Windows 11).
* Console error logs (if any).

### 2. Suggesting Enhancements & New Tools
We are always looking for helpful developer utilities (e.g., Cron expression parsers, Curl to Fetch converters, Markdown live editors).
* Open a **Feature Request** on GitHub.
* Describe the use case and why it benefits developers/AI engineers.
* Outline the proposed UI elements and calculations.

---

## 💻 Development Workflow

1. **Fork the repository** on GitHub.
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/devforge-ai.git
   cd devforge-ai
   ```
3. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feat/add-cron-calculator
   ```
4. **Make your changes**:
   * Adhere to the zero-dependency philosophy (pure HTML5, CSS3, ES6+ JS).
   * Ensure dark and light themes are fully supported for all new UI components.
   * Verify all 5 accent colors blend smoothly with your components.
   * Add comments to explain complex formulas or logic.
5. **Test locally**:
   * Test responsive layout across mobile, tablet, and widescreen displays.
   * Verify console is clean without JavaScript errors or warnings.
6. **Commit with conventional commit messages**:
   ```bash
   git commit -m "feat(utilities): add cron expression parser"
   ```
7. **Push to your fork and open a Pull Request**:
   ```bash
   git push origin feat/add-cron-calculator
   ```

---

## 🎨 Code Style Guidelines

* **Vanilla HTML/CSS/JS**: Keep logic client-side and avoid adding external npm dependencies or bundling requirements.
* **CSS Custom Properties**: Always use established CSS variables (e.g. `var(--accent-primary)`, `var(--bg-card)`, `var(--text-main)`) rather than hardcoded hex colors.
* **Accessibility (a11y)**: Provide `aria-label` attributes on icon-only buttons and ensure interactive elements can be focused via keyboard.
* **Performance**: Heavy computations should be throttled or executed non-blockingly to maintain a smooth 60fps frame rate for animations.
