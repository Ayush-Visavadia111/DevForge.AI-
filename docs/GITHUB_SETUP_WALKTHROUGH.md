# 🚀 GitHub Publishing & Setup Walkthrough

This guide gives you the **exact, copy-and-paste commands and steps** to publish **DevForge AI** from your local computer to GitHub, host it for free on GitHub Pages, and maintain it.

---

## 📋 Prerequisites Checklist

1. **Git installed** on your computer.
   * Check by running: `git --version`
   * If not installed, download it from [git-scm.com](https://git-scm.com).
2. A free **GitHub Account**: [github.com/signup](https://github.com/signup).
3. The project folder: `c:\Users\Aush\Downloads\demo 1` (or wherever you placed it).

---

## 🛠️ Step 1: Open Your Terminal / Command Prompt

1. In VS Code or your terminal:
   * Press <kbd>Ctrl</kbd> + <kbd>`</kbd> to open the integrated terminal in VS Code.
   * Or open PowerShell / Git Bash and navigate to your project folder:
     ```powershell
     cd "c:\Users\Aush\Downloads\demo 1"
     ```

---

## 🛠️ Step 2: Configure Your Git Identity (If Not Done Before)

If this is your first time using Git on this machine, tell Git who you are:

```bash
git config --global user.name "Your Name or GitHub Username"
git config --global user.email "your_email@example.com"
```
*(Make sure the email matches your GitHub account email address).*

---

## 🛠️ Step 3: Initialize Git & Create Your First Commit

Run the following commands inside the project root:

```bash
# 1. Initialize git with default branch named 'main'
git init -b main

# 2. Stage all project files (including docs, templates, and assets)
git add .

# 3. Create your first commit
git commit -m "feat: initial commit of DevForge AI platform"
```

---

## 🛠️ Step 4: Create a New Repository on GitHub

You can create the repository via the **GitHub Website** or via **GitHub CLI**:

### Method A: Via GitHub Website (Easiest)
1. Go to [https://github.com/new](https://github.com/new).
2. Fill in the repository details:
   * **Repository name**: `devforge-ai` (or any name you prefer).
   * **Description**: `Ultimate All-in-One Developer & AI Engineering Workstation. 100% client-side, zero dependencies.`
   * **Visibility**: Select **Public** (so anyone can view and use your GitHub Pages site) or **Private**.
   * **Initialize repository with**:
     * ⚠️ **Leave unchecked**: "Add a README file"
     * ⚠️ **Leave unchecked**: "Add .gitignore"
     * ⚠️ **Leave unchecked**: "Choose a license"  
       *(Because our project already includes all three!)*
3. Click the green **Create repository** button.

### Method B: Via GitHub CLI (`gh`)
If you have the `gh` command-line tool installed and logged in:
```bash
gh repo create devforge-ai --public --source=. --remote=origin --push
```
*(If you run this, you can skip Step 5 below!)*

---

## 🛠️ Step 5: Link Your Local Folder to GitHub & Push

Copy your repository URL from GitHub. It looks like:
`https://github.com/YOUR_USERNAME/devforge-ai.git`

Run these two commands in your terminal:

```bash
# Link the remote repository
git remote add origin https://github.com/YOUR_USERNAME/devforge-ai.git

# Push your code to the 'main' branch
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username).*

> [!NOTE]
> **Authentication Prompt**:
> When prompted for credentials:
> - You can log in via your browser pop-up.
> - Or use a **Personal Access Token (Classic)** as your password (generate one at [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)).

---

## 🌐 Step 6: Enable Free GitHub Pages Website (Live Link)

Make your web application live on the internet in seconds:

### Method 1: Using the Included Automated GitHub Actions (Recommended)
1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/devforge-ai`.
2. Click **Settings** (top right navigation bar).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, click the dropdown and choose **GitHub Actions**.
5. Because our project contains `.github/workflows/deploy.yml`, GitHub will automatically trigger the deployment workflow.
6. Check the **Actions** tab on GitHub. In ~45 seconds, you'll see a green checkmark!
7. Your live URL will be:
   ```text
   https://YOUR_USERNAME.github.io/devforge-ai/
   ```

### Method 2: Direct Branch Deployment (Alternative)
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, keep **Deploy from a branch**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Refresh the page after 1 minute to see your live URL.

---

## 🔄 Daily Git Workflow (How to Update Your Project Later)

Whenever you make changes to your project files (like tweaking CSS, adding new tools, or editing docs), update GitHub with these 3 quick commands:

```bash
# 1. Stage the changes
git add .

# 2. Commit with a message describing what you changed
git commit -m "feat: added new JSON validator tool"

# 3. Push to GitHub
git push
```
GitHub Pages will automatically rebuild and update your live website!

---

## ❓ Troubleshooting & Common Questions

### Error: `fatal: remote origin already exists`
You previously added an origin. Update it:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/devforge-ai.git
```

### Error: `Support for password authentication was removed`
GitHub requires a Personal Access Token instead of your account password:
1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens).
2. Click **Generate new token (classic)**.
3. Give it a note (e.g. `Laptop Git Push`) and select the `repo` scope.
4. Copy the token (starts with `ghp_...`).
5. When Git asks for your password in the terminal, paste the token.

### Error: `Updates were rejected because the remote contains work that you do not have locally`
This happens if you checked "Add a README" on GitHub while creating the repository. Run:
```bash
git pull origin main --rebase
git push -u origin main
```

---

## 🏷️ Creating a GitHub Release

To tag a formal version (e.g., `v1.0.0`):
1. In your GitHub repository, click **Releases** (on the right sidebar).
2. Click **Draft a new release**.
3. Click **Choose a tag** and type `v1.0.0` -> click **Create new tag**.
4. Title: `DevForge AI v1.0.0 — Launch Edition`.
5. Click **Publish release**.
