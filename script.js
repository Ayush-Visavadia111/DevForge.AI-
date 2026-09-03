/**
 * DevForge AI — Ultimate Developer & AI Engineering Platform Logic
 * 100% Client-side, privacy-first, ultra-responsive developer workstation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. Toast Notification System
    // =========================================================================
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'info', iconClass = 'fa-solid fa-circle-check') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        let typeClass = '';
        if (type === 'success') typeClass = 'toast-success';
        else if (type === 'error') typeClass = 'toast-error';

        toast.className = `toast ${typeClass}`;
        toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    // =========================================================================
    // 2. Authentication & Workspace Sync State (LocalStorage)
    // =========================================================================
    const defaultAccounts = [
        {
            name: 'Alex Chen',
            email: 'alex@devforge.ai',
            password: 'password123',
            role: 'Senior AI Architect',
            avatar: 'AC'
        },
        {
            name: 'Sarah Jenkins',
            email: 'sarah@company.io',
            password: 'clientpass',
            role: 'Full Stack Architect',
            avatar: 'SJ'
        },
        {
            name: 'Elena Rostova',
            email: 'guest@reviewer.dev',
            password: 'guest123',
            role: 'DevOps Specialist',
            avatar: 'ER'
        }
    ];

    function getUsers() {
        const stored = localStorage.getItem('devforge_users');
        if (!stored) {
            localStorage.setItem('devforge_users', JSON.stringify(defaultAccounts));
            return defaultAccounts;
        }
        try {
            return JSON.parse(stored);
        } catch {
            return defaultAccounts;
        }
    }

    function getActiveSession() {
        const session = localStorage.getItem('devforge_session');
        if (!session) return null;
        try {
            return JSON.parse(session);
        } catch {
            return null;
        }
    }

    function setActiveSession(user) {
        localStorage.setItem('devforge_session', JSON.stringify(user));
        updateAuthUI();
    }

    function clearActiveSession() {
        localStorage.removeItem('devforge_session');
        updateAuthUI();
    }

    // UI Elements for Auth
    const authLoggedOut = document.getElementById('auth-logged-out');
    const authLoggedIn = document.getElementById('auth-logged-in');
    const openAuthBtn = document.getElementById('open-auth-btn');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const profileDropdownMenu = document.getElementById('profile-dropdown-menu');
    const navUserInitials = document.getElementById('nav-user-initials');
    const navUserName = document.getElementById('nav-user-name');
    const menuUserName = document.getElementById('menu-user-name');
    const menuUserEmail = document.getElementById('menu-user-email');
    const menuUserRole = document.getElementById('menu-user-role');
    const logoutBtn = document.getElementById('logout-btn');

    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const authErrorBanner = document.getElementById('auth-error-banner');
    const authErrorText = document.getElementById('auth-error-text');

    function updateAuthUI() {
        const session = getActiveSession();
        if (session) {
            if (authLoggedOut) authLoggedOut.style.display = 'none';
            if (authLoggedIn) authLoggedIn.style.display = 'block';
            if (navUserInitials) navUserInitials.textContent = session.avatar || 'AI';
            if (navUserName) navUserName.textContent = session.name.split(' ')[0];
            if (menuUserName) menuUserName.textContent = session.name;
            if (menuUserEmail) menuUserEmail.textContent = session.email;
            if (menuUserRole) menuUserRole.textContent = session.role;
        } else {
            if (authLoggedOut) authLoggedOut.style.display = 'block';
            if (authLoggedIn) authLoggedIn.style.display = 'none';
            if (profileDropdownMenu) profileDropdownMenu.classList.remove('active');
        }
    }

    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openAuthBtn) {
        openAuthBtn.addEventListener('click', () => openModal(authModal));
    }
    if (authCloseBtn) {
        authCloseBtn.addEventListener('click', () => closeModal(authModal));
    }

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdownMenu) profileDropdownMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (profileDropdownMenu && !profileDropdownMenu.contains(e.target) && userProfileBtn && !userProfileBtn.contains(e.target)) {
            profileDropdownMenu.classList.remove('active');
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            clearActiveSession();
            showToast('Switched to Local Workspace Mode', 'info', 'fa-solid fa-hard-drive');
        });
    }

    // Auth Tabs Switcher
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetId = `auth-pane-${tab.dataset.authTab}`;
            document.querySelectorAll('.auth-pane').forEach(p => p.classList.remove('active'));
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');
            if (authErrorBanner) authErrorBanner.classList.remove('active');
        });
    });

    // 1-Click Demo Profile Chips
    document.querySelectorAll('.demo-account-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const type = chip.dataset.demo;
            let account;
            if (type === 'architect') account = defaultAccounts[0];
            else if (type === 'client') account = defaultAccounts[1];
            else account = defaultAccounts[2];

            setActiveSession(account);
            closeModal(authModal);
            showToast(`Synced as ${account.name} (${account.role})`, 'success', 'fa-solid fa-cloud-arrow-up');
        });
    });

    // Sign in Form Handler
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim().toLowerCase();
            const password = document.getElementById('signin-password').value;
            const users = getUsers();
            const found = users.find(u => u.email.toLowerCase() === email && u.password === password);

            if (found) {
                setActiveSession(found);
                closeModal(authModal);
                showToast(`Welcome back, ${found.name}! Workspace synchronized.`, 'success', 'fa-solid fa-circle-check');
            } else {
                if (authErrorBanner) {
                    authErrorText.textContent = 'Invalid developer email or password.';
                    authErrorBanner.classList.add('active');
                }
            }
        });
    }

    updateAuthUI();

    // =========================================================================
    // 3. Dark / Light Theme & 5-Accent Palette Engine
    // =========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const accentToggleBtn = document.getElementById('accent-toggle-btn');
    const accentPaletteMenu = document.getElementById('accent-palette-menu');
    const colorOptions = document.querySelectorAll('.color-option');

    const savedTheme = localStorage.getItem('devforge_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const savedAccent = localStorage.getItem('devforge_accent') || 'cyan';
    document.documentElement.setAttribute('data-accent', savedAccent);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('devforge_theme', next);
            updateThemeIcon(next);
            showToast(`Theme switched to ${next} mode`, 'info', next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun');
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    if (accentToggleBtn) {
        accentToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (accentPaletteMenu) accentPaletteMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (accentPaletteMenu && !accentPaletteMenu.contains(e.target) && accentToggleBtn && !accentToggleBtn.contains(e.target)) {
            accentPaletteMenu.classList.remove('active');
        }
    });

    colorOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const color = opt.dataset.color;
            document.documentElement.setAttribute('data-accent', color);
            localStorage.setItem('devforge_accent', color);
            if (accentPaletteMenu) accentPaletteMenu.classList.remove('active');
            showToast(`Accent palette updated to ${color}`, 'success', 'fa-solid fa-palette');
        });
    });

    // =========================================================================
    // 4. Mouse-Spotlight Glow on Cards
    // =========================================================================
    function attachSpotlights() {
        const cards = document.querySelectorAll('.spotlight-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
    attachSpotlights();

    // =========================================================================
    // 5. Interactive Particle Constellation Background Canvas
    // =========================================================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.8;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.fill();
            }
        }

        const count = Math.min(Math.floor(window.innerWidth / 20), 65);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        function renderCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(renderCanvas);
        }
        renderCanvas();
    }

    // =========================================================================
    // 6. Mobile Navigation Menu Toggle
    // =========================================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // =========================================================================
    // 7. Hero Visual Interactive Preview Widget
    // =========================================================================
    const heroTabs = document.querySelectorAll('.hero-visual .ide-tab');
    heroTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            heroTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            document.querySelectorAll('.hero-visual .ide-pane').forEach(p => p.classList.remove('active'));
            const activePane = document.getElementById(`pane-${target}`);
            if (activePane) activePane.classList.add('active');
        });
    });

    const heroPromptInput = document.getElementById('hero-prompt-input');
    const heroModelSelect = document.getElementById('hero-model-select');
    const heroTokenCount = document.getElementById('hero-token-count');
    const heroCostEst = document.getElementById('hero-cost-est');

    const modelRates = {
        'gpt4o': { inRate: 2.50, outRate: 10.00, ctx: 128000 },
        'claude35': { inRate: 3.00, outRate: 15.00, ctx: 200000 },
        'gemini15': { inRate: 1.25, outRate: 5.00, ctx: 2000000 },
        'deepseek': { inRate: 0.14, outRate: 0.28, ctx: 128000 },
        'llama': { inRate: 0.00, outRate: 0.00, ctx: 128000 }
    };

    function updateHeroCalculations() {
        if (!heroPromptInput || !heroModelSelect) return;
        const text = heroPromptInput.value || '';
        // Heuristic: ~4 chars per token for English & code
        const tokens = Math.max(1, Math.ceil(text.length / 4));
        if (heroTokenCount) heroTokenCount.textContent = `${tokens} tokens`;

        const modelKey = heroModelSelect.value;
        const rates = modelRates[modelKey] || modelRates.gpt4o;
        // Cost per 1000 calls assuming input tokens + 500 output tokens average
        const costInput = (tokens / 1000000) * rates.inRate;
        const costOutput = (500 / 1000000) * rates.outRate;
        const costPerK = (costInput + costOutput) * 1000;

        if (heroCostEst) {
            heroCostEst.textContent = rates.inRate === 0 ? 'Free (Local)' : `$${costPerK.toFixed(3)}`;
        }
    }

    if (heroPromptInput) heroPromptInput.addEventListener('input', updateHeroCalculations);
    if (heroModelSelect) heroModelSelect.addEventListener('change', updateHeroCalculations);
    updateHeroCalculations();

    // Hero VRAM Quick Calc
    const heroVramSize = document.getElementById('hero-vram-size');
    const heroVramQuant = document.getElementById('hero-vram-quant');
    const heroVramVal = document.getElementById('hero-vram-val');
    const heroVramRec = document.getElementById('hero-vram-rec');

    function updateHeroVram() {
        if (!heroVramSize || !heroVramQuant) return;
        const params = parseFloat(heroVramSize.value);
        const bits = parseFloat(heroVramQuant.value);
        // Formula: (params * (bits/8) * 1.15) + (4k context cache ~ 1GB)
        const vramGb = ((params * (bits / 8) * 1.15) + 1.2).toFixed(1);
        if (heroVramVal) heroVramVal.textContent = `~${vramGb} GB`;

        let recText = 'RTX 3060 (12GB) or Apple M-Series (16GB)';
        if (vramGb > 40) recText = 'Dual RTX 3090/4090 or Mac Studio 64GB+';
        else if (vramGb > 20) recText = 'RTX 3090 / 4090 (24GB) or Mac 36GB+';
        else if (vramGb > 10) recText = 'RTX 4070 (12GB) or Apple M1/M2/M3 (16GB)';
        if (heroVramRec) heroVramRec.textContent = `Recommended: ${recText}`;
    }

    if (heroVramSize) heroVramSize.addEventListener('change', updateHeroVram);
    if (heroVramQuant) heroVramQuant.addEventListener('change', updateHeroVram);

    // Hero Quick JSON Beautifier
    const heroJsonInput = document.getElementById('hero-json-input');
    const heroJsonFormatBtn = document.getElementById('hero-json-format-btn');
    if (heroJsonFormatBtn && heroJsonInput) {
        heroJsonFormatBtn.addEventListener('click', () => {
            try {
                const parsed = JSON.parse(heroJsonInput.value);
                heroJsonInput.value = JSON.stringify(parsed, null, 2);
                showToast('JSON formatted successfully', 'success');
            } catch (err) {
                showToast(`JSON Syntax Error: ${err.message}`, 'error', 'fa-solid fa-triangle-exclamation');
            }
        });
    }

    // =========================================================================
    // 8. AI PROMPT & SYSTEM PROMPT WORKBENCH
    // =========================================================================
    const promptTemplates = {
        'refactor': {
            system: 'You are a Principal Software Architect. Analyze the provided codebase for adherence to clean architecture, SOLID principles, zero-allocation memory bottlenecks, and strict type safety.',
            user: 'Refactor this TypeScript API handler to implement a resilient circuit breaker pattern with backoff retries and explicit error unions:\n\n```ts\nasync function fetchUserData(id: string) {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}\n```'
        },
        'bugfix': {
            system: 'You are an Elite Debugging Engineer. Your job is to isolate concurrency bugs, memory leaks, unhandled promise rejections, and race conditions.',
            user: 'Identify the concurrency flaw in this async queue processing loop and provide the fixed, safe implementation:\n\n```ts\nconst queue = [1, 2, 3, 4, 5];\nqueue.forEach(async (id) => {\n  await processItem(id);\n});\nconsole.log("All processed!");\n```'
        },
        'tests': {
            system: 'You are a Senior Quality Engineering Lead. Generate comprehensive unit and edge-case tests with 100% boundary coverage using Jest / Vitest.',
            user: 'Write parameterized unit tests for a token bucket rate limiter including burst capacity, refill tick precision, and concurrent client requests.'
        },
        'sql': {
            system: 'You are a Database Performance Tuning Specialist. Analyze SQL queries for missing B-tree indexes, sequential scans, and sub-optimal join orders.',
            user: 'Optimize this slow analytical query running on a 20M-row PostgreSQL table:\n\n```sql\nSELECT u.id, u.email, COUNT(o.id) as total_orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE u.created_at >= NOW() - INTERVAL "30 days"\nGROUP BY u.id, u.email\nORDER BY total_orders DESC;\n```'
        },
        'agent': {
            system: 'You are an Autonomous AI Agent Orchestrator. Output strict JSON tool schemas adhering to OpenAI Function Calling and Anthropic Tool Specs.',
            user: 'Create a production JSON tool specification for a database vector query tool named "search_knowledge_base" with query embedding string, top_k integer (1-50), and metadata filter dictionary.'
        },
        'security': {
            system: 'You are a Certified Application Security Specialist (OSCP). Audit code for OWASP Top 10 vulnerabilities, SSRF, SQL Injection, prototype pollution, and improper authorization checks.',
            user: 'Audit this Node.js Express route for security flaws:\n\n```javascript\napp.get("/proxy", async (req, res) => {\n  const targetUrl = req.query.url;\n  const response = await axios.get(targetUrl);\n  res.send(response.data);\n});\n```'
        }
    };

    const systemPromptInput = document.getElementById('system-prompt-input');
    const userPromptInput = document.getElementById('user-prompt-input');
    const promptModelSelect = document.getElementById('prompt-model-select');
    const promptTempSlider = document.getElementById('prompt-temp-slider');
    const tempDisplay = document.getElementById('temp-display');
    const promptMaxTokens = document.getElementById('prompt-max-tokens');
    const tokensDisplay = document.getElementById('tokens-display');

    const metricInputTokens = document.getElementById('metric-input-tokens');
    const metricOutputTokens = document.getElementById('metric-output-tokens');
    const metricTotalTokens = document.getElementById('metric-total-tokens');
    const metricSingleCost = document.getElementById('metric-single-cost');
    const metricKCost = document.getElementById('metric-k-cost');
    const contextFill = document.getElementById('context-fill');
    const contextUsedPct = document.getElementById('context-used-pct');
    const contextMaxLabel = document.getElementById('context-max-label');
    const pricingTip = document.getElementById('pricing-tip');

    // Template buttons
    const templateChips = document.querySelectorAll('.template-chip');
    templateChips.forEach(chip => {
        chip.addEventListener('click', () => {
            templateChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const tmpl = promptTemplates[chip.dataset.template];
            if (tmpl) {
                if (systemPromptInput) systemPromptInput.value = tmpl.system;
                if (userPromptInput) userPromptInput.value = tmpl.user;
                updateWorkbenchCalculations();
                showToast(`Loaded ${chip.textContent} template`, 'info');
            }
        });
    });

    // Default template load
    if (systemPromptInput && userPromptInput && promptTemplates.refactor) {
        systemPromptInput.value = promptTemplates.refactor.system;
        userPromptInput.value = promptTemplates.refactor.user;
    }

    if (promptTempSlider && tempDisplay) {
        promptTempSlider.addEventListener('input', () => {
            const val = parseFloat(promptTempSlider.value);
            let desc = 'Balanced';
            if (val < 0.3) desc = 'Deterministic / Strict';
            else if (val > 0.7) desc = 'Creative / Diverse';
            tempDisplay.textContent = `${val.toFixed(2)} (${desc})`;
        });
    }

    if (promptMaxTokens && tokensDisplay) {
        promptMaxTokens.addEventListener('input', () => {
            tokensDisplay.textContent = promptMaxTokens.value;
            updateWorkbenchCalculations();
        });
    }

    const fullModelRates = {
        'gpt-4o': { inRate: 2.50, outRate: 10.00, maxCtx: 128000, name: 'GPT-4o' },
        'claude-3-5-sonnet': { inRate: 3.00, outRate: 15.00, maxCtx: 200000, name: 'Claude 3.5 Sonnet' },
        'gemini-1-5-pro': { inRate: 1.25, outRate: 5.00, maxCtx: 2000000, name: 'Gemini 1.5 Pro' },
        'deepseek-v3': { inRate: 0.14, outRate: 0.28, maxCtx: 128000, name: 'DeepSeek V3' },
        'deepseek-r1': { inRate: 0.55, outRate: 2.19, maxCtx: 128000, name: 'DeepSeek R1' },
        'llama-3-3-70b': { inRate: 0.00, outRate: 0.00, maxCtx: 128000, name: 'Llama 3.3 70B' }
    };

    function updateWorkbenchCalculations() {
        const sys = systemPromptInput ? systemPromptInput.value : '';
        const usr = userPromptInput ? userPromptInput.value : '';
        const totalChars = sys.length + usr.length;
        const inputTokens = Math.max(1, Math.ceil(totalChars / 4));
        const maxOutTokens = promptMaxTokens ? parseInt(promptMaxTokens.value) : 2048;
        const combinedTokens = inputTokens + maxOutTokens;

        const modelId = promptModelSelect ? promptModelSelect.value : 'gpt-4o';
        const model = fullModelRates[modelId] || fullModelRates['gpt-4o'];

        if (metricInputTokens) metricInputTokens.textContent = inputTokens.toLocaleString();
        if (metricOutputTokens) metricOutputTokens.textContent = maxOutTokens.toLocaleString();
        if (metricTotalTokens) metricTotalTokens.textContent = combinedTokens.toLocaleString();

        const costIn = (inputTokens / 1000000) * model.inRate;
        const costOut = (maxOutTokens / 1000000) * model.outRate;
        const singleTotal = costIn + costOut;
        const thousandTotal = singleTotal * 1000;

        if (metricSingleCost) {
            metricSingleCost.textContent = model.inRate === 0 ? 'Free ($0.00)' : `$${singleTotal.toFixed(4)}`;
        }
        if (metricKCost) {
            metricKCost.textContent = model.inRate === 0 ? 'Free ($0.00)' : `$${thousandTotal.toFixed(2)}`;
        }

        const pctUsed = Math.min(100, (combinedTokens / model.maxCtx) * 100);
        if (contextFill) contextFill.style.width = `${Math.max(1.5, pctUsed)}%`;
        if (contextUsedPct) contextUsedPct.textContent = `${pctUsed.toFixed(2)}% used`;
        if (contextMaxLabel) contextMaxLabel.textContent = `${model.maxCtx.toLocaleString()} max tokens`;

        // Update pricing tip
        if (pricingTip) {
            if (modelId === 'deepseek-v3') {
                pricingTip.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>Optimal cost-efficiency active! DeepSeek V3 provides frontier coding quality at 95% less cost.</span>`;
            } else if (modelId === 'llama-3-3-70b') {
                pricingTip.innerHTML = `<i class="fa-solid fa-shield"></i><span>Local execution active: zero API fees, full data isolation & privacy via Ollama.</span>`;
            } else {
                pricingTip.innerHTML = `<i class="fa-solid fa-lightbulb"></i><span>Switching to DeepSeek V3 would save ~94% on input costs ($0.14 vs $${model.inRate}/1M).</span>`;
            }
        }
    }

    if (systemPromptInput) systemPromptInput.addEventListener('input', updateWorkbenchCalculations);
    if (userPromptInput) userPromptInput.addEventListener('input', updateWorkbenchCalculations);
    if (promptModelSelect) promptModelSelect.addEventListener('change', updateWorkbenchCalculations);
    updateWorkbenchCalculations();

    // Variable injector
    const injectVarBtn = document.getElementById('inject-var-btn');
    if (injectVarBtn && userPromptInput) {
        injectVarBtn.addEventListener('click', () => {
            userPromptInput.value += '\n\n{{code}}\n';
            updateWorkbenchCalculations();
            showToast('Injected {{code}} variable placeholder', 'info');
        });
    }

    // Clear system prompt
    const clearSysBtn = document.getElementById('clear-system-prompt');
    if (clearSysBtn && systemPromptInput) {
        clearSysBtn.addEventListener('click', () => {
            systemPromptInput.value = '';
            updateWorkbenchCalculations();
            showToast('System prompt cleared', 'info');
        });
    }

    // Copy full prompt
    const copyFullPromptBtn = document.getElementById('copy-full-prompt-btn');
    if (copyFullPromptBtn) {
        copyFullPromptBtn.addEventListener('click', () => {
            const sys = systemPromptInput ? systemPromptInput.value : '';
            const usr = userPromptInput ? userPromptInput.value : '';
            const full = `[SYSTEM INSTRUCTION]\n${sys}\n\n[USER QUERY]\n${usr}`;
            navigator.clipboard.writeText(full).then(() => {
                showToast('Full prompt copied to clipboard!', 'success');
            });
        });
    }

    // Optimize prompt
    const optimizePromptBtn = document.getElementById('optimize-prompt-btn');
    if (optimizePromptBtn && userPromptInput) {
        optimizePromptBtn.addEventListener('click', () => {
            const current = userPromptInput.value;
            userPromptInput.value = `### OBJECTIVE\n${current}\n\n### CONSTRAINTS & REQUIREMENTS\n- Strict type-safety, zero any types\n- Microsecond latency optimization\n- Include inline comments explaining architecture\n\n### OUTPUT SCHEMA\nProvide the solution formatted in Markdown with code blocks and complexity analysis (Time & Space).`;
            updateWorkbenchCalculations();
            showToast('Structured prompt with Objective, Constraints & Schema', 'success');
        });
    }

    // Export SDK Code Modal
    const exportSdkBtn = document.getElementById('export-sdk-btn');
    const exportModal = document.getElementById('export-modal');
    const exportModalClose = document.getElementById('export-modal-close');
    const closeExportBtn = document.getElementById('close-export-btn');
    const exportCodeContent = document.getElementById('export-code-content');
    const copyExportCodeBtn = document.getElementById('copy-export-code-btn');

    let currentExportLang = 'python';

    function generateSdkCode(lang) {
        const sys = systemPromptInput ? systemPromptInput.value.replace(/"/g, '\\"') : '';
        const usr = userPromptInput ? userPromptInput.value.replace(/"/g, '\\"') : '';
        const model = promptModelSelect ? promptModelSelect.value : 'gpt-4o';
        const temp = promptTempSlider ? promptTempSlider.value : '0.2';
        const maxTokens = promptMaxTokens ? promptMaxTokens.value : '2048';

        if (lang === 'python') {
            return `# Python 3.10+ SDK Execution
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="${model}",
    temperature=${temp},
    max_tokens=${maxTokens},
    messages=[
        {"role": "system", "content": "${sys}"},
        {"role": "user", "content": "${usr}"}
    ]
)

print(response.choices[0].message.content)`;
        } else if (lang === 'node') {
            return `// Node.js TypeScript Execution
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    model: "${model}",
    temperature: ${temp},
    max_tokens: ${maxTokens},
    messages: [
      { role: "system", content: "${sys}" },
      { role: "user", content: "${usr}" }
    ]
  });

  console.log(completion.choices[0].message.content);
}

main().catch(console.error);`;
        } else {
            return `# cURL REST Request
curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "${model}",
    "temperature": ${temp},
    "max_tokens": ${maxTokens},
    "messages": [
      {"role": "system", "content": "${sys}"},
      {"role": "user", "content": "${usr}"}
    ]
  }'`;
        }
    }

    if (exportSdkBtn) {
        exportSdkBtn.addEventListener('click', () => {
            if (exportCodeContent) exportCodeContent.textContent = generateSdkCode(currentExportLang);
            openModal(exportModal);
        });
    }
    if (exportModalClose) exportModalClose.addEventListener('click', () => closeModal(exportModal));
    if (closeExportBtn) closeExportBtn.addEventListener('click', () => closeModal(exportModal));

    document.querySelectorAll('.export-tabs-bar .mini-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.export-tabs-bar .mini-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentExportLang = chip.dataset.exportlang;
            if (exportCodeContent) exportCodeContent.textContent = generateSdkCode(currentExportLang);
        });
    });

    if (copyExportCodeBtn && exportCodeContent) {
        copyExportCodeBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(exportCodeContent.textContent).then(() => {
                showToast('SDK code snippet copied to clipboard!', 'success');
            });
        });
    }

    // =========================================================================
    // 9. AI MODEL MATRIX & LOCAL HARDWARE VRAM CALCULATOR
    // =========================================================================
    const modelFilterInput = document.getElementById('model-filter-input');
    const modelMatrixTable = document.getElementById('model-matrix-table');
    const modelFilterChips = document.querySelectorAll('.filter-chips-mini .mini-chip');

    let activeFilterCat = 'all';

    function filterModelTable() {
        if (!modelMatrixTable) return;
        const q = modelFilterInput ? modelFilterInput.value.toLowerCase().trim() : '';
        const rows = modelMatrixTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cat = row.dataset.cat || '';
            const text = row.textContent.toLowerCase();
            const matchesCat = activeFilterCat === 'all' || cat.includes(activeFilterCat);
            const matchesQuery = !q || text.includes(q);

            row.style.display = (matchesCat && matchesQuery) ? '' : 'none';
        });
    }

    if (modelFilterInput) modelFilterInput.addEventListener('input', filterModelTable);
    modelFilterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            modelFilterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeFilterCat = chip.dataset.modelfilter;
            filterModelTable();
        });
    });

    // VRAM Estimator
    const vramParams = document.getElementById('vram-params');
    const vramQuant = document.getElementById('vram-quant');
    const vramContext = document.getElementById('vram-context');
    const vramCtxLabel = document.getElementById('vram-ctx-label');
    const calcWeightsGb = document.getElementById('calc-weights-gb');
    const calcKvGb = document.getElementById('calc-kv-gb');
    const calcTotalGb = document.getElementById('calc-total-gb');
    const calcHardwareText = document.getElementById('calc-hardware-text');
    const ollamaCommand = document.getElementById('ollama-command');
    const copyOllamaBtn = document.getElementById('copy-ollama-btn');

    function calculateVRAM() {
        if (!vramParams || !vramQuant || !vramContext) return;
        const params = parseFloat(vramParams.value);
        const quantBits = parseFloat(vramQuant.value);
        const ctxTokens = parseInt(vramContext.value);

        if (vramCtxLabel) vramCtxLabel.textContent = `${ctxTokens.toLocaleString()} tokens`;

        // Model weights VRAM: params * (bits / 8) * 1.15 overhead
        const weightsGb = params * (quantBits / 8) * 1.15;
        // KV Cache formula approximation: (ctxTokens / 16384) * (params / 7) * 1.35 GB
        const kvGb = (ctxTokens / 16384) * (params / 7) * 1.35;
        const totalGb = weightsGb + kvGb;

        if (calcWeightsGb) calcWeightsGb.textContent = `${weightsGb.toFixed(1)} GB`;
        if (calcKvGb) calcKvGb.textContent = `${kvGb.toFixed(1)} GB`;
        if (calcTotalGb) calcTotalGb.textContent = `${totalGb.toFixed(1)} GB`;

        let hw = 'NVIDIA RTX 3060 (12GB) or Apple M-Series (16GB RAM)';
        if (totalGb <= 8) hw = 'NVIDIA GTX 1660 / RTX 3050 (8GB) or Apple M1 8GB';
        else if (totalGb <= 12) hw = 'NVIDIA RTX 3060 / 4070 (12GB) or Apple M-Series (16GB)';
        else if (totalGb <= 16) hw = 'NVIDIA RTX 4080 (16GB) or Apple M-Series (24GB Unified)';
        else if (totalGb <= 24) hw = 'NVIDIA RTX 3090 / 4090 (24GB) or Apple M-Series (36GB Unified)';
        else if (totalGb <= 48) hw = 'Dual RTX 3090 / 4090 (48GB) or Apple Mac Studio (64GB)';
        else hw = 'Enterprise 80GB A100 / H100 or Mac Studio 128GB Unified Memory';

        if (calcHardwareText) calcHardwareText.textContent = hw;

        // Ollama command
        let modelTag = 'llama3.1:8b';
        if (params === 14) modelTag = 'qwen2.5:14b';
        else if (params === 32) modelTag = 'qwen2.5-coder:32b';
        else if (params === 70) modelTag = 'llama3.3:70b';
        else if (params === 3) modelTag = 'llama3.2:3b';

        let quantTag = 'q4_K_M';
        if (quantBits === 8) quantTag = 'q8_0';
        else if (quantBits === 16) quantTag = 'fp16';

        const cmd = `ollama run ${modelTag}-${quantTag}`;
        if (ollamaCommand) ollamaCommand.textContent = cmd;
    }

    if (vramParams) vramParams.addEventListener('change', calculateVRAM);
    if (vramQuant) vramQuant.addEventListener('change', calculateVRAM);
    if (vramContext) vramContext.addEventListener('input', calculateVRAM);
    calculateVRAM();

    if (copyOllamaBtn && ollamaCommand) {
        copyOllamaBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(ollamaCommand.textContent).then(() => {
                showToast('Ollama run command copied!', 'success');
            });
        });
    }

    // =========================================================================
    // 10. SWISS-ARMY DEV UTILITIES HUB
    // =========================================================================
    const utilTabs = document.querySelectorAll('.util-tab');
    utilTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            utilTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.util;
            document.querySelectorAll('.util-pane').forEach(p => p.classList.remove('active'));
            const activePane = document.getElementById(`pane-util-${target}`);
            if (activePane) activePane.classList.add('active');
        });
    });

    // --- JSON Studio ---
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const jsonStatus = document.getElementById('json-status');
    const jsonBeautifyBtn = document.getElementById('json-beautify-btn');
    const jsonMinifyBtn = document.getElementById('json-minify-btn');
    const jsonToTsBtn = document.getElementById('json-to-ts-btn');
    const jsonSampleBtn = document.getElementById('json-sample-btn');
    const copyJsonBtn = document.getElementById('copy-json-btn');

    function parseInputJson() {
        if (!jsonInput) return null;
        try {
            const parsed = JSON.parse(jsonInput.value);
            if (jsonStatus) {
                jsonStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Valid JSON`;
                jsonStatus.style.color = '#10b981';
            }
            return parsed;
        } catch (err) {
            if (jsonStatus) {
                jsonStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${err.message}`;
                jsonStatus.style.color = '#f43f5e';
            }
            return null;
        }
    }

    if (jsonBeautifyBtn) {
        jsonBeautifyBtn.addEventListener('click', () => {
            const data = parseInputJson();
            if (data !== null && jsonOutput) {
                jsonOutput.value = JSON.stringify(data, null, 2);
                showToast('JSON beautified with 2-space indent', 'success');
            }
        });
    }

    if (jsonMinifyBtn) {
        jsonMinifyBtn.addEventListener('click', () => {
            const data = parseInputJson();
            if (data !== null && jsonOutput) {
                jsonOutput.value = JSON.stringify(data);
                showToast('JSON minified to single line', 'success');
            }
        });
    }

    if (jsonToTsBtn) {
        jsonToTsBtn.addEventListener('click', () => {
            const data = parseInputJson();
            if (data !== null && jsonOutput) {
                let ts = 'export interface RootObject {\n';
                for (const key of Object.keys(data)) {
                    const val = data[key];
                    let type = typeof val;
                    if (val === null) type = 'null';
                    else if (Array.isArray(val)) {
                        type = val.length > 0 ? `${typeof val[0]}[]` : 'any[]';
                    } else if (type === 'object') {
                        type = 'Record<string, any>';
                    }
                    ts += `  ${key}: ${type};\n`;
                }
                ts += '}';
                jsonOutput.value = ts;
                showToast('Generated TypeScript interface!', 'success');
            }
        });
    }

    if (jsonSampleBtn && jsonInput) {
        jsonSampleBtn.addEventListener('click', () => {
            jsonInput.value = JSON.stringify({
                platform: 'DevForge AI',
                version: '2.4.0',
                activeEngineers: 14200,
                offlineSupport: true,
                supportedArchitectures: ['x86_64', 'ARM64', 'Apple Silicon'],
                metrics: {
                    uptimeSLA: 0.9999,
                    p99LatencyMs: 1.4
                }
            }, null, 2);
            parseInputJson();
            showToast('Sample developer telemetry JSON loaded', 'info');
        });
    }

    if (copyJsonBtn && jsonOutput) {
        copyJsonBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(jsonOutput.value || jsonInput.value).then(() => {
                showToast('JSON output copied to clipboard', 'success');
            });
        });
    }

    // --- Regex Tester ---
    const regexPattern = document.getElementById('regex-pattern');
    const regexFlags = document.getElementById('regex-flags');
    const regexTestText = document.getElementById('regex-test-text');
    const regexHighlightOutput = document.getElementById('regex-highlight-output');
    const regexMatchCount = document.getElementById('regex-match-count');

    const regexPresets = {
        'email': { pat: '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+', flags: 'g' },
        'url': { pat: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'gi' },
        'ipv4': { pat: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b', flags: 'g' },
        'uuid': { pat: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}', flags: 'gi' },
        'semver': { pat: 'v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?', flags: 'g' }
    };

    function runRegexTest() {
        if (!regexPattern || !regexFlags || !regexTestText || !regexHighlightOutput) return;
        const patStr = regexPattern.value;
        const flagsStr = regexFlags.value;
        const text = regexTestText.value;

        if (!patStr) {
            regexHighlightOutput.textContent = text;
            if (regexMatchCount) regexMatchCount.textContent = '0 matches';
            return;
        }

        try {
            const re = new RegExp(patStr, flagsStr);
            const matches = text.match(re);
            const count = matches ? matches.length : 0;
            if (regexMatchCount) regexMatchCount.textContent = `${count} match${count === 1 ? '' : 'es'}`;

            // Replace matches with highlight mark
            const safeText = text.replace(/[&<>'"]/g, tag => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
            }[tag] || tag));

            const safeRe = new RegExp(patStr, flagsStr);
            const highlighted = safeText.replace(safeRe, match => `<span class="regex-match-mark">${match}</span>`);
            regexHighlightOutput.innerHTML = highlighted;
        } catch (err) {
            if (regexMatchCount) regexMatchCount.textContent = 'Invalid Pattern';
            regexHighlightOutput.innerHTML = `<span style="color: #f43f5e;">Regex Error: ${err.message}</span>`;
        }
    }

    if (regexPattern) regexPattern.addEventListener('input', runRegexTest);
    if (regexFlags) regexFlags.addEventListener('input', runRegexTest);
    if (regexTestText) regexTestText.addEventListener('input', runRegexTest);
    runRegexTest();

    document.querySelectorAll('.regex-quick-chips .mini-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const p = regexPresets[chip.dataset.regex];
            if (p) {
                regexPattern.value = p.pat;
                regexFlags.value = p.flags;
                runRegexTest();
                showToast(`Applied ${chip.textContent} regex preset`, 'info');
            }
        });
    });

    // --- JWT Inspector ---
    const jwtInput = document.getElementById('jwt-input');
    const decodeJwtBtn = document.getElementById('decode-jwt-btn');
    const sampleJwtBtn = document.getElementById('sample-jwt-btn');
    const jwtHeaderOut = document.getElementById('jwt-header-out');
    const jwtPayloadOut = document.getElementById('jwt-payload-out');
    const jwtSecurityOut = document.getElementById('jwt-security-out');

    function decodeJwt() {
        if (!jwtInput) return;
        const token = jwtInput.value.trim();
        if (!token) return;

        const parts = token.split('.');
        if (parts.length < 2) {
            showToast('Invalid JWT: Expected 3 period-separated parts', 'error');
            return;
        }

        try {
            function b64Decode(str) {
                str = str.replace(/-/g, '+').replace(/_/g, '/');
                while (str.length % 4) str += '=';
                return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            }

            const header = JSON.parse(b64Decode(parts[0]));
            const payload = JSON.parse(b64Decode(parts[1]));

            if (jwtHeaderOut) jwtHeaderOut.textContent = JSON.stringify(header, null, 2);
            if (jwtPayloadOut) jwtPayloadOut.textContent = JSON.stringify(payload, null, 2);

            let statusHtml = `<div><strong>Algorithm:</strong> <code>${header.alg || 'none'}</code></div>`;
            if (payload.exp) {
                const expDate = new Date(payload.exp * 1000);
                const isExpired = Date.now() > (payload.exp * 1000);
                statusHtml += `<div><strong>Expires At:</strong> ${expDate.toLocaleString()}</div>`;
                statusHtml += `<div style="margin-top: 0.4rem;"><span style="color: ${isExpired ? '#f43f5e' : '#10b981'}; font-weight: 700;">${isExpired ? '❌ TOKEN EXPIRED' : '✅ TOKEN ACTIVE'}</span></div>`;
            } else {
                statusHtml += `<div><span style="color: #f59e0b;">⚠️ No exp claim found (Immortal Token)</span></div>`;
            }

            if (jwtSecurityOut) jwtSecurityOut.innerHTML = statusHtml;
            showToast('JWT decoded successfully!', 'success');
        } catch (err) {
            showToast(`JWT Decode Error: ${err.message}`, 'error');
        }
    }

    if (decodeJwtBtn) decodeJwtBtn.addEventListener('click', decodeJwt);
    if (sampleJwtBtn && jwtInput) {
        sampleJwtBtn.addEventListener('click', () => {
            jwtInput.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDkwMSIsIm5hbWUiOiJBbGV4IENoZW4iLCJyb2xlIjoiU2VuaW9yIEFJIEFyY2hpdGVjdCIsImlhdCI6MTczNTY4OTYwMCwiZXhwIjoyMDgxMDQ5NjAwfQ.s8S_dummy_signature_verified_locally';
            decodeJwt();
        });
    }

    // --- UUID & Crypto Hashes ---
    const uuidCountSelect = document.getElementById('uuid-count-select');
    const genUuidBtn = document.getElementById('gen-uuid-btn');
    const copyUuidBtn = document.getElementById('copy-uuid-btn');
    const uuidOutput = document.getElementById('uuid-output');

    function generateUuidV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function runUuidGen() {
        if (!uuidOutput) return;
        const count = uuidCountSelect ? parseInt(uuidCountSelect.value) : 5;
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(generateUuidV4());
        }
        uuidOutput.value = list.join('\n');
    }

    if (genUuidBtn) {
        genUuidBtn.addEventListener('click', () => {
            runUuidGen();
            showToast('Fresh UUID v4 generated', 'success');
        });
    }
    if (copyUuidBtn && uuidOutput) {
        copyUuidBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(uuidOutput.value).then(() => {
                showToast('UUID(s) copied to clipboard', 'success');
            });
        });
    }
    runUuidGen();

    const hashInput = document.getElementById('hash-input');
    const hashSha256 = document.getElementById('hash-sha256');
    const hashBase64 = document.getElementById('hash-base64');
    const hashUrlencoded = document.getElementById('hash-urlencoded');

    async function updateHashes() {
        if (!hashInput) return;
        const val = hashInput.value || '';
        if (!val) {
            if (hashSha256) hashSha256.textContent = '-';
            if (hashBase64) hashBase64.textContent = '-';
            if (hashUrlencoded) hashUrlencoded.textContent = '-';
            return;
        }

        if (hashBase64) {
            try {
                hashBase64.textContent = btoa(unescape(encodeURIComponent(val)));
            } catch {
                hashBase64.textContent = 'Encoding Error';
            }
        }

        if (hashUrlencoded) {
            hashUrlencoded.textContent = encodeURIComponent(val);
        }

        if (hashSha256 && window.crypto && window.crypto.subtle) {
            const encoder = new TextEncoder();
            const data = encoder.encode(val);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            hashSha256.textContent = hex;
        }
    }

    if (hashInput) {
        hashInput.addEventListener('input', updateHashes);
        hashInput.value = 'DevForge AI 2026';
        updateHashes();
    }

    // --- Cron Expression Explainer ---
    const cronExpression = document.getElementById('cron-expression');
    const explainCronBtn = document.getElementById('explain-cron-btn');
    const cronHumanText = document.getElementById('cron-human-text');

    function explainCron() {
        if (!cronExpression || !cronHumanText) return;
        const expr = cronExpression.value.trim();
        const parts = expr.split(/\s+/);

        if (parts.length !== 5) {
            cronHumanText.textContent = 'Invalid Cron: Please provide exactly 5 fields (min, hour, day-of-month, month, day-of-week)';
            cronHumanText.style.color = '#f43f5e';
            return;
        }

        cronHumanText.style.color = 'var(--text-primary)';
        const [min, hr, dom, mon, dow] = parts;

        let explanation = '';
        if (min === '*' && hr === '*') explanation = 'Every minute, every hour, every day';
        else if (min.startsWith('*/')) explanation = `Every ${min.replace('*/', '')} minutes, continuously`;
        else if (min === '0' && hr === '*') explanation = 'At the start of every hour';
        else if (min === '0' && hr === '0') explanation = 'At midnight (00:00) every day';
        else if (min === '0' && hr === '9' && dow === '1-5') explanation = 'At 09:00 AM on Monday through Friday';
        else if (min === '0' && hr === '0' && dom === '1') explanation = 'At midnight on the 1st of every month';
        else explanation = `At minute ${min}, hour ${hr}, day of month ${dom}, month ${mon}, weekday ${dow}`;

        cronHumanText.textContent = explanation;
    }

    if (explainCronBtn) explainCronBtn.addEventListener('click', explainCron);
    document.querySelectorAll('.cron-presets-row .mini-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (cronExpression) cronExpression.value = chip.dataset.cron;
            explainCron();
        });
    });

    // --- Code & Prompt Diff Checker ---
    const diffOriginal = document.getElementById('diff-original');
    const diffModified = document.getElementById('diff-modified');
    const computeDiffBtn = document.getElementById('compute-diff-btn');
    const diffSampleBtn = document.getElementById('diff-sample-btn');
    const diffOutputContainer = document.getElementById('diff-output-container');

    function computeDiff() {
        if (!diffOriginal || !diffModified || !diffOutputContainer) return;
        const lines1 = diffOriginal.value.split('\n');
        const lines2 = diffModified.value.split('\n');

        let html = '';
        const maxLen = Math.max(lines1.length, lines2.length);

        for (let i = 0; i < maxLen; i++) {
            const l1 = lines1[i];
            const l2 = lines2[i];

            if (l1 === l2) {
                html += `<span class="diff-line-same">  ${l1 || ''}</span>`;
            } else {
                if (l1 !== undefined) {
                    html += `<span class="diff-line-del">- ${l1}</span>`;
                }
                if (l2 !== undefined) {
                    html += `<span class="diff-line-add">+ ${l2}</span>`;
                }
            }
        }

        diffOutputContainer.innerHTML = html;
        showToast('Diff calculated successfully', 'success');
    }

    if (computeDiffBtn) computeDiffBtn.addEventListener('click', computeDiff);
    if (diffSampleBtn) {
        diffSampleBtn.addEventListener('click', () => {
            diffOriginal.value = 'function getUser() {\n  return db.query("SELECT * FROM users");\n}';
            diffModified.value = 'async function getUser(): Promise<User[]> {\n  return await db.query<User[]>("SELECT id, name FROM users");\n}';
            computeDiff();
        });
    }

    // =========================================================================
    // 11. LIVE CODE PLAYGROUND & SANDBOX
    // =========================================================================
    const pgTabs = document.querySelectorAll('.pg-tab');
    pgTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pgTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.pg;
            document.querySelectorAll('.pg-pane').forEach(p => p.classList.remove('active'));
            const pane = document.getElementById(`pg-pane-${target}`);
            if (pane) pane.classList.add('active');
        });
    });

    const pgRunBtn = document.getElementById('pg-run-btn');
    const pgClearBtn = document.getElementById('pg-clear-btn');
    const pgJsEditor = document.getElementById('pg-js-editor');
    const pgJsConsole = document.getElementById('pg-js-console');
    const pgHtmlEditor = document.getElementById('pg-html-editor');
    const pgHtmlPreview = document.getElementById('pg-html-preview');
    const pgSqlEditor = document.getElementById('pg-sql-editor');
    const pgSqlOutput = document.getElementById('pg-sql-output');

    // Run active playground mode
    if (pgRunBtn) {
        pgRunBtn.addEventListener('click', () => {
            const activeTab = document.querySelector('.pg-tab.active');
            const mode = activeTab ? activeTab.dataset.pg : 'js';

            if (mode === 'js') {
                if (!pgJsEditor || !pgJsConsole) return;
                const code = pgJsEditor.value;
                pgJsConsole.textContent = '';
                const logs = [];

                const customConsole = {
                    log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ')),
                    table: (data) => logs.push(JSON.stringify(data, null, 2)),
                    error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
                    warn: (...args) => logs.push('[WARN] ' + args.join(' '))
                };

                try {
                    const fn = new Function('console', code);
                    fn(customConsole);
                    pgJsConsole.textContent = logs.length > 0 ? logs.join('\n') : '> Executed successfully with no console output.';
                    showToast('Code executed in isolated context', 'success');
                } catch (err) {
                    pgJsConsole.textContent = `Runtime Error: ${err.message}`;
                    showToast(`Error: ${err.message}`, 'error');
                }
            } else if (mode === 'html') {
                if (!pgHtmlEditor || !pgHtmlPreview) return;
                pgHtmlPreview.srcdoc = pgHtmlEditor.value;
                showToast('HTML / CSS preview rendered', 'success');
            } else if (mode === 'sql') {
                executeMockSql();
            }
        });
    }

    if (pgClearBtn) {
        pgClearBtn.addEventListener('click', () => {
            if (pgJsConsole) pgJsConsole.textContent = '> Console cleared.';
            showToast('Console cleared', 'info');
        });
    }

    // Initial HTML render
    if (pgHtmlEditor && pgHtmlPreview) {
        pgHtmlPreview.srcdoc = pgHtmlEditor.value;
    }

    // In-memory SQL Mock Engine
    const mockDb = {
        developers: [
            { id: 1, name: 'Alex Chen', role: 'Lead AI Architect', primary_language: 'Python', rating: 4.95, experience_years: 8 },
            { id: 2, name: 'Sarah Jenkins', role: 'Distributed Systems Eng', primary_language: 'Go', rating: 4.90, experience_years: 6 },
            { id: 3, name: 'Elena Rostova', role: 'Frontend Platform Lead', primary_language: 'TypeScript', rating: 4.85, experience_years: 5 },
            { id: 4, name: 'Marcus Reynolds', role: 'Staff ML Researcher', primary_language: 'Python', rating: 4.88, experience_years: 7 },
            { id: 5, name: 'Liam Vance', role: 'DevOps & SRE Specialist', primary_language: 'Rust', rating: 4.75, experience_years: 4 }
        ],
        ai_models: [
            { id: 1, name: 'Claude 3.5 Sonnet', provider: 'Anthropic', context_k: 200, humaneval_pct: 93.7 },
            { id: 2, name: 'GPT-4o', provider: 'OpenAI', context_k: 128, humaneval_pct: 90.2 },
            { id: 3, name: 'DeepSeek V3', provider: 'DeepSeek', context_k: 128, humaneval_pct: 89.1 },
            { id: 4, name: 'Gemini 1.5 Pro', provider: 'Google', context_k: 2000, humaneval_pct: 84.1 },
            { id: 5, name: 'Llama 3.3 70B', provider: 'Meta', context_k: 128, humaneval_pct: 86.2 }
        ]
    };

    function executeMockSql() {
        if (!pgSqlEditor || !pgSqlOutput) return;
        const q = pgSqlEditor.value.trim().toLowerCase();

        let table = mockDb.developers;
        if (q.includes('from ai_models')) table = mockDb.ai_models;

        let filtered = [...table];
        if (q.includes('where rating >= 4.8')) {
            filtered = filtered.filter(item => item.rating >= 4.8);
        } else if (q.includes('where context_k >= 200')) {
            filtered = filtered.filter(item => item.context_k >= 200);
        }

        if (q.includes('order by rating desc')) {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        if (filtered.length === 0) {
            pgSqlOutput.innerHTML = `<div style="color: var(--text-muted); padding: 1rem;">Query returned 0 rows.</div>`;
            return;
        }

        const cols = Object.keys(filtered[0]);
        let html = '<table class="pg-sql-table"><thead><tr>';
        cols.forEach(c => html += `<th>${c}</th>`);
        html += '</tr></thead><tbody>';

        filtered.forEach(row => {
            html += '<tr>';
            cols.forEach(c => html += `<td>${row[c]}</td>`);
            html += '</tr>';
        });
        html += '</tbody></table>';

        pgSqlOutput.innerHTML = html;
        showToast(`SQL returned ${filtered.length} row(s)`, 'success');
    }

    document.querySelectorAll('.sql-presets-bar .mini-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (pgSqlEditor) {
                pgSqlEditor.value = chip.dataset.sql;
                executeMockSql();
            }
        });
    });

    // =========================================================================
    // 12. AI DEVELOPER API CHEAT SHEETS (Instant Copy)
    // =========================================================================
    document.querySelectorAll('.copy-cheat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.cheat-card');
            const code = card ? card.querySelector('pre code').textContent : '';
            if (code) {
                navigator.clipboard.writeText(code).then(() => {
                    showToast('API Recipe copied to clipboard!', 'success');
                });
            }
        });
    });

    // =========================================================================
    // 13. DEVELOPER SNIPPETS & PROMPTS VAULT (LocalStorage)
    // =========================================================================
    const defaultSnippets = [
        {
            id: 'snip-1',
            title: 'Resilient Fetch with AbortController & Timeout',
            tag: 'typescript',
            code: `export async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}`
        },
        {
            id: 'snip-2',
            title: 'Structured Output System Prompt for Code Review',
            tag: 'ai',
            code: `You are a Principal Security Auditor. Review incoming code and return ONLY valid JSON:
{
  "criticalVulnerabilities": ["desc"],
  "performanceBottlenecks": ["desc"],
  "refactoredCode": "string"
}`
        },
        {
            id: 'snip-3',
            title: 'Async Token Bucket Rate Limiter in Python',
            tag: 'python',
            code: `import asyncio, time

class TokenBucket:
    def __init__(self, rate: float, capacity: float):
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_check = time.monotonic()
        self.lock = asyncio.Lock()

    async def acquire(self):
        async with self.lock:
            now = time.monotonic()
            elapsed = now - self.last_check
            self.last_check = now
            self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
            if self.tokens < 1.0:
                await asyncio.sleep((1.0 - self.tokens) / self.rate)
                self.tokens = 0
            else:
                self.tokens -= 1.0`
        },
        {
            id: 'snip-4',
            title: 'SQL Recursive CTE for Org Hierarchy & Graph',
            tag: 'sql',
            code: `WITH RECURSIVE OrgChart AS (
  SELECT emp_id, manager_id, full_name, 1 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id, e.full_name, oc.depth + 1
  FROM employees e
  INNER JOIN OrgChart oc ON e.manager_id = oc.emp_id
)
SELECT * FROM OrgChart ORDER BY depth;`
        }
    ];

    function getSnippets() {
        const stored = localStorage.getItem('devforge_snippets_vault');
        if (!stored) {
            localStorage.setItem('devforge_snippets_vault', JSON.stringify(defaultSnippets));
            return defaultSnippets;
        }
        try {
            return JSON.parse(stored);
        } catch {
            return defaultSnippets;
        }
    }

    function saveSnippets(list) {
        localStorage.setItem('devforge_snippets_vault', JSON.stringify(list));
        renderSnippets();
    }

    const vaultGrid = document.getElementById('vault-grid');
    const vaultSearchInput = document.getElementById('vault-search-input');
    const vaultPills = document.querySelectorAll('.vault-pill');
    let activeVaultTag = 'all';

    function renderSnippets() {
        if (!vaultGrid) return;
        const snippets = getSnippets();
        const query = vaultSearchInput ? vaultSearchInput.value.toLowerCase().trim() : '';

        const filtered = snippets.filter(s => {
            const matchesTag = activeVaultTag === 'all' || s.tag === activeVaultTag;
            const matchesQuery = !query || s.title.toLowerCase().includes(query) || s.code.toLowerCase().includes(query);
            return matchesTag && matchesQuery;
        });

        if (filtered.length === 0) {
            vaultGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">No snippets match your filter. Click "+ New Snippet" to add one!</div>`;
            return;
        }

        vaultGrid.innerHTML = filtered.map(s => `
            <div class="snippet-card spotlight-card">
                <div class="snippet-card-top">
                    <span class="snippet-card-tag">${s.tag}</span>
                    <div class="snippet-card-title">${s.title}</div>
                    <pre class="snippet-code-preview"><code>${escapeHtml(s.code)}</code></pre>
                </div>
                <div class="snippet-actions">
                    <button class="btn btn-outline btn-sm copy-snippet-btn" data-id="${s.id}"><i class="fa-regular fa-copy"></i> Copy</button>
                    <button class="btn-text btn-sm delete-snippet-btn" data-id="${s.id}" style="color: #f43f5e;"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        `).join('');

        attachSpotlights();

        // Wire copy buttons
        vaultGrid.querySelectorAll('.copy-snippet-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const snip = snippets.find(x => x.id === btn.dataset.id);
                if (snip) {
                    navigator.clipboard.writeText(snip.code).then(() => {
                        showToast(`Copied "${snip.title}" to clipboard`, 'success');
                    });
                }
            });
        });

        // Wire delete buttons
        vaultGrid.querySelectorAll('.delete-snippet-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const list = getSnippets().filter(x => x.id !== btn.dataset.id);
                saveSnippets(list);
                showToast('Snippet deleted from vault', 'info');
            });
        });
    }

    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag));
    }

    if (vaultSearchInput) vaultSearchInput.addEventListener('input', renderSnippets);
    vaultPills.forEach(pill => {
        pill.addEventListener('click', () => {
            vaultPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeVaultTag = pill.dataset.tag;
            renderSnippets();
        });
    });

    // New Snippet Modal
    const snippetModal = document.getElementById('snippet-modal');
    const openNewSnippetBtn = document.getElementById('open-new-snippet-btn');
    const snippetModalClose = document.getElementById('snippet-modal-close');
    const newSnippetForm = document.getElementById('new-snippet-form');

    if (openNewSnippetBtn) openNewSnippetBtn.addEventListener('click', () => openModal(snippetModal));
    if (snippetModalClose) snippetModalClose.addEventListener('click', () => closeModal(snippetModal));

    if (newSnippetForm) {
        newSnippetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('new-snippet-title').value.trim();
            const tag = document.getElementById('new-snippet-tag').value;
            const code = document.getElementById('new-snippet-code').value.trim();

            if (title && code) {
                const list = getSnippets();
                list.unshift({
                    id: 'snip-' + Date.now(),
                    title,
                    tag,
                    code
                });
                saveSnippets(list);
                newSnippetForm.reset();
                closeModal(snippetModal);
                showToast(`Saved "${title}" to your Snippet Vault!`, 'success');
            }
        });
    }

    renderSnippets();

    // =========================================================================
    // 14. DEVELOPER FOCUS LAB & SOUNDSCAPE SYNTHESIZER
    // =========================================================================
    // --- Pomodoro Timer ---
    const timerDigits = document.getElementById('timer-digits');
    const timerStatusText = document.getElementById('timer-status-text');
    const timerToggleBtn = document.getElementById('timer-toggle-btn');
    const timerIcon = document.getElementById('timer-icon');
    const timerBtnText = document.getElementById('timer-btn-text');
    const timerResetBtn = document.getElementById('timer-reset-btn');
    const focusPills = document.querySelectorAll('.focus-timer-header .focus-pill');

    let timerDuration = 25 * 60;
    let timerRemaining = timerDuration;
    let timerInterval = null;
    let timerRunning = false;

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimerDisplay() {
        if (timerDigits) timerDigits.textContent = formatTime(timerRemaining);
        if (timerRunning) {
            document.title = `(${formatTime(timerRemaining)}) DevForge AI`;
        } else {
            document.title = 'DevForge AI — Ultimate Developer & AI Engineering Platform';
        }
    }

    function toggleTimer() {
        if (timerRunning) {
            clearInterval(timerInterval);
            timerRunning = false;
            if (timerIcon) timerIcon.className = 'fa-solid fa-play';
            if (timerBtnText) timerBtnText.textContent = 'Resume';
            showToast('Timer paused', 'info');
        } else {
            timerRunning = true;
            if (timerIcon) timerIcon.className = 'fa-solid fa-pause';
            if (timerBtnText) timerBtnText.textContent = 'Pause';
            showToast('Focus session started — Stay in the zone!', 'success');

            timerInterval = setInterval(() => {
                if (timerRemaining > 0) {
                    timerRemaining--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    if (timerIcon) timerIcon.className = 'fa-solid fa-play';
                    if (timerBtnText) timerBtnText.textContent = 'Start';
                    playAudioNotification();
                    showToast('🎉 Focus Sprint Complete! Take a well-deserved break.', 'success');
                }
            }, 1000);
        }
        updateTimerDisplay();
    }

    if (timerToggleBtn) timerToggleBtn.addEventListener('click', toggleTimer);
    if (timerResetBtn) {
        timerResetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerRunning = false;
            timerRemaining = timerDuration;
            if (timerIcon) timerIcon.className = 'fa-solid fa-play';
            if (timerBtnText) timerBtnText.textContent = 'Start Focus';
            updateTimerDisplay();
            showToast('Timer reset', 'info');
        });
    }

    focusPills.forEach(pill => {
        pill.addEventListener('click', () => {
            focusPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            clearInterval(timerInterval);
            timerRunning = false;
            if (timerIcon) timerIcon.className = 'fa-solid fa-play';
            if (timerBtnText) timerBtnText.textContent = 'Start';

            const mode = pill.dataset.mode;
            if (mode === 'pomodoro') {
                timerDuration = 25 * 60;
                if (timerStatusText) timerStatusText.textContent = 'Deep Work Sprint';
            } else if (mode === 'short') {
                timerDuration = 5 * 60;
                if (timerStatusText) timerStatusText.textContent = 'Short Coffee Break';
            } else {
                timerDuration = 15 * 60;
                if (timerStatusText) timerStatusText.textContent = 'Long Restoration Break';
            }
            timerRemaining = timerDuration;
            updateTimerDisplay();
        });
    });

    // --- Web Audio Synthesizer (Zero External Files Required) ---
    let audioCtx = null;
    let activeNoiseNode = null;
    let activeGainNode = null;
    let activeSoundType = null;

    const audioVolume = document.getElementById('audio-volume');
    const audioNowPlaying = document.getElementById('audio-now-playing');
    const soundChips = document.querySelectorAll('.sound-chip');

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playAudioNotification() {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }

    function stopAmbientSound() {
        if (activeNoiseNode) {
            try {
                activeNoiseNode.stop();
                activeNoiseNode.disconnect();
            } catch {}
            activeNoiseNode = null;
        }
        activeSoundType = null;
        soundChips.forEach(c => c.classList.remove('active'));
        if (audioNowPlaying) {
            audioNowPlaying.innerHTML = `<span class="pulse-dot" style="background: var(--text-muted);"></span><span>Audio Generator: Inactive</span>`;
        }
    }

    function startAmbientSound(type) {
        initAudio();
        stopAmbientSound();

        const vol = audioVolume ? parseFloat(audioVolume.value) : 0.5;
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(vol * 0.25, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
        activeGainNode = masterGain;

        if (type === 'binaural') {
            // Dual sine wave creating 10Hz Alpha Focus Beat
            const oscL = audioCtx.createOscillator();
            const oscR = audioCtx.createOscillator();
            oscL.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscR.frequency.setValueAtTime(210, audioCtx.currentTime);

            const merger = audioCtx.createChannelMerger(2);
            oscL.connect(merger, 0, 0);
            oscR.connect(merger, 0, 1);
            merger.connect(masterGain);

            oscL.start();
            oscR.start();
            activeNoiseNode = {
                stop: () => { oscL.stop(); oscR.stop(); },
                disconnect: () => { oscL.disconnect(); oscR.disconnect(); merger.disconnect(); }
            };
        } else {
            // White or Brown noise buffer
            const bufferSize = audioCtx.sampleRate * 2;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);

            if (type === 'brown') {
                let lastOut = 0.0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = data[i];
                    data[i] *= 3.5;
                }
            } else {
                // Cyber Rain (Filtered noise with drops)
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
            }

            const noiseSource = audioCtx.createBufferSource();
            noiseSource.buffer = buffer;
            noiseSource.loop = true;

            const filter = audioCtx.createBiquadFilter();
            filter.type = type === 'rain' ? 'bandpass' : 'lowpass';
            filter.frequency.setValueAtTime(type === 'rain' ? 800 : 350, audioCtx.currentTime);
            if (type === 'rain') filter.Q.setValueAtTime(1.5, audioCtx.currentTime);

            noiseSource.connect(filter);
            filter.connect(masterGain);
            noiseSource.start();
            activeNoiseNode = noiseSource;
        }

        activeSoundType = type;
        if (audioNowPlaying) {
            audioNowPlaying.innerHTML = `<span class="pulse-dot" style="background: #10b981;"></span><span>Now Playing: <strong>${type.toUpperCase()}</strong> Soundscape</span>`;
        }
    }

    soundChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const sound = chip.dataset.sound;
            if (activeSoundType === sound) {
                stopAmbientSound();
                showToast('Ambient audio stopped', 'info');
            } else {
                soundChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                startAmbientSound(sound);
                showToast(`Started ${sound} audio soundscape`, 'success');
            }
        });
    });

    if (audioVolume) {
        audioVolume.addEventListener('input', () => {
            if (activeGainNode && audioCtx) {
                const vol = parseFloat(audioVolume.value);
                activeGainNode.gain.setValueAtTime(vol * 0.25, audioCtx.currentTime);
            }
        });
    }

    // --- Developer Daily Sprint Checklist ---
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const clearTasksBtn = document.getElementById('clear-tasks-btn');

    function getTasks() {
        const stored = localStorage.getItem('devforge_sprint_tasks');
        if (!stored) {
            return [
                { text: 'Configure DevForge AI workspace & shortcuts', done: true },
                { text: 'Fine-tune system prompts for Code Auditor', done: false },
                { text: 'Benchmark local Llama 3.3 70B quantized memory', done: false }
            ];
        }
        try { return JSON.parse(stored); } catch { return []; }
    }

    function saveTasks(tasks) {
        localStorage.setItem('devforge_sprint_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        if (!taskList) return;
        const tasks = getTasks();
        taskList.innerHTML = tasks.map((t, idx) => `
            <li class="task-item">
                <input type="checkbox" data-idx="${idx}" ${t.done ? 'checked' : ''}>
                <span class="task-text ${t.done ? 'done' : ''}">${escapeHtml(t.text)}</span>
            </li>
        `).join('');

        taskList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const idx = parseInt(cb.dataset.idx);
                const currentTasks = getTasks();
                if (currentTasks[idx]) {
                    currentTasks[idx].done = cb.checked;
                    saveTasks(currentTasks);
                }
            });
        });
    }

    if (addTaskBtn && newTaskInput) {
        addTaskBtn.addEventListener('click', () => {
            const val = newTaskInput.value.trim();
            if (val) {
                const tasks = getTasks();
                tasks.push({ text: val, done: false });
                saveTasks(tasks);
                newTaskInput.value = '';
                showToast('Added task to Sprint Scratchpad', 'success');
            }
        });
        newTaskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addTaskBtn.click();
        });
    }

    if (clearTasksBtn) {
        clearTasksBtn.addEventListener('click', () => {
            const active = getTasks().filter(t => !t.done);
            saveTasks(active);
            showToast('Cleared completed tasks', 'info');
        });
    }
    renderTasks();

    // =========================================================================
    // 15. GLOBAL COMMAND PALETTE (Ctrl + K / Cmd + K)
    // =========================================================================
    const cmdModal = document.getElementById('cmd-modal');
    const cmdInput = document.getElementById('cmd-input');
    const cmdList = document.getElementById('cmd-list');
    const cmdPaletteBtn = document.getElementById('cmd-palette-btn');

    function toggleCmdModal(open) {
        if (!cmdModal) return;
        if (open) {
            cmdModal.classList.add('active');
            if (cmdInput) {
                cmdInput.value = '';
                cmdInput.focus();
                filterCmdItems('');
            }
        } else {
            cmdModal.classList.remove('active');
        }
    }

    if (cmdPaletteBtn) cmdPaletteBtn.addEventListener('click', () => toggleCmdModal(true));

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCmdModal(!cmdModal.classList.contains('active'));
        }
        if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('active')) {
            toggleCmdModal(false);
        }
    });

    if (cmdModal) {
        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) toggleCmdModal(false);
        });
    }

    function filterCmdItems(q) {
        if (!cmdList) return;
        const items = cmdList.querySelectorAll('.cmd-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = !q || text.includes(q.toLowerCase()) ? 'flex' : 'none';
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', () => filterCmdItems(cmdInput.value));
    }

    if (cmdList) {
        cmdList.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                const target = item.dataset.target;
                toggleCmdModal(false);

                if (action === 'navigate' && target) {
                    const el = document.querySelector(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'quick-uuid') {
                    const uuid = generateUuidV4();
                    navigator.clipboard.writeText(uuid).then(() => {
                        showToast(`Generated & copied UUID: ${uuid}`, 'success');
                    });
                } else if (action === 'quick-timer') {
                    if (!timerRunning) toggleTimer();
                    const el = document.querySelector('#focus-lab');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'toggle-theme') {
                    if (themeToggle) themeToggle.click();
                } else if (action === 'open-auth') {
                    openModal(authModal);
                }
            });
        });
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animated Numbers / Counters on Scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function countStats() {
        if (counted) return;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            let current = 0;
            const inc = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, 30);
        });
        counted = true;
    }

    const heroStatsEl = document.querySelector('.hero-stats');
    if (heroStatsEl) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                countStats();
                obs.disconnect();
            }
        }, { threshold: 0.2 });
        obs.observe(heroStatsEl);
    }

    // =========================================================================
    // 16. DriftWall 3D Background Parallax Engine
    // =========================================================================
    (function () {
        const container = document.getElementById('drift-wall');
        if (!container) return;

        const CFG = {
            gap: 18,
            pauseOnHover: true,
            parallax: 0.08,
            columns: [
                {
                    tiles: [
                        { color: '#0f172a', text: 'AI Prompt Studio', icon: 'fa-brain' },
                        { color: '#1e1b4b', text: 'VRAM Matrix', icon: 'fa-server' },
                        { color: '#172554', text: 'Ollama CLI', icon: 'fa-terminal' }
                    ]
                },
                {
                    tiles: [
                        { color: '#14532d', text: 'JSON Studio', icon: 'fa-brackets-curly' },
                        { color: '#064e3b', text: 'Regex Engine', icon: 'fa-asterisk' },
                        { color: '#134e4a', text: 'JWT Decoder', icon: 'fa-key' }
                    ]
                },
                {
                    tiles: [
                        { color: '#312e81', text: 'Live Sandbox', icon: 'fa-code' },
                        { color: '#4a044e', text: 'SQL Runner', icon: 'fa-database' },
                        { color: '#581c87', text: 'Focus Synth', icon: 'fa-headphones' }
                    ]
                }
            ]
        };

        let containerH = container.clientHeight || 600;
        let colEls = [];
        let trackEls = [];
        let offsets = [0, 50, 100];

        function buildColumns() {
            container.innerHTML = '';
            const plane = document.createElement('div');
            plane.className = 'drift-wall__plane';
            plane.style.display = 'flex';
            plane.style.gap = `${CFG.gap}px`;
            plane.style.justifyContent = 'center';
            plane.style.height = '100%';

            CFG.columns.forEach((colData, idx) => {
                const col = document.createElement('div');
                col.className = 'drift-wall__col';
                col.style.width = '200px';
                col.style.position = 'relative';
                col.style.overflow = 'hidden';

                const track = document.createElement('div');
                track.className = 'drift-wall__track';
                track.style.display = 'flex';
                track.style.flexDirection = 'column';
                track.style.gap = `${CFG.gap}px`;

                // Duplicate tiles for continuous loop
                const allTiles = [...colData.tiles, ...colData.tiles, ...colData.tiles];
                allTiles.forEach(tile => {
                    const tileEl = document.createElement('div');
                    tileEl.className = 'drift-wall__tile';
                    tileEl.style.height = '120px';
                    tileEl.style.background = tile.color;
                    tileEl.style.borderRadius = '12px';
                    tileEl.style.border = '1px solid rgba(255,255,255,0.08)';
                    tileEl.style.display = 'flex';
                    tileEl.style.flexDirection = 'column';
                    tileEl.style.alignItems = 'center';
                    tileEl.style.justifyContent = 'center';
                    tileEl.style.color = '#fff';
                    tileEl.style.fontSize = '0.85rem';
                    tileEl.style.fontWeight = '600';
                    tileEl.style.gap = '0.5rem';
                    tileEl.innerHTML = `<i class="fa-solid ${tile.icon}" style="font-size: 1.4rem; color: var(--accent-primary);"></i><span>${tile.text}</span>`;
                    track.appendChild(tileEl);
                });

                col.appendChild(track);
                plane.appendChild(col);
                colEls.push(col);
                trackEls.push(track);
            });

            container.appendChild(plane);
        }

        buildColumns();

        function animateDrift() {
            for (let i = 0; i < trackEls.length; i++) {
                const speed = (i % 2 === 0 ? 0.35 : -0.35);
                offsets[i] = (offsets[i] + speed) % 360;
                if (trackEls[i]) {
                    trackEls[i].style.transform = `translate3d(0, ${-offsets[i]}px, 0)`;
                }
            }
            requestAnimationFrame(animateDrift);
        }
        requestAnimationFrame(animateDrift);
    })();
});
