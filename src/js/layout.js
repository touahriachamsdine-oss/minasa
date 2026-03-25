// Shared Layout Injection Logic (Fully Localized + High Fidelity)
import { signOut } from './auth.js';
import { getCurrentLang, setLanguage, TRANSLATIONS } from './i18n.js';
import { toggleTheme } from './theme.js';
import { ParticleField } from './particles.js';

export function injectLayout() {
    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

    // 1. Inject Sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div style="padding: 40px 20px; display: flex; flex-direction: column; height: 100%; gap: 10px;">
                <div class="logo-container" style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:40px;">
                    <img src="../public/logo.svg" alt="Logo" style="width:45px; height:45px; filter: drop-shadow(0 0 10px var(--neon-green));">
                    <div class="logo syne gradient-text" style="font-size: 22px; font-weight:800; letter-spacing:-1px;">MOUBADARA</div>
                </div>
                
                <nav style="display: flex; flex-direction: column; gap: 8px;">
                    <a href="dashboard.html" class="nav-item ${isActive('dashboard')}"><span>🏠</span> ${t.nav_dashboard}</a>
                    <a href="tasks.html" class="nav-item ${isActive('tasks')}"><span>📋</span> ${t.nav_tasks}</a>
                    <a href="notifications.html" class="nav-item ${isActive('notifications')}"><span>🔔</span> ${t.nav_notifications}</a>
                    <a href="invites.html" class="nav-item ${isActive('invites')}"><span>✉️</span> ${t.nav_invites}</a>
                    <hr style="border:none; border-top:1px solid var(--glass-border); margin:10px 0;">
                    <a href="explore.html" class="nav-item ${isActive('explore')}"><span>🌍</span> ${t.nav_explore}</a>
                    <a href="create.html" class="nav-item ${isActive('create')}"><span>➕</span> ${t.nav_create}</a>
                    <a href="profile.html" class="nav-item ${isActive('profile')}"><span>👤</span> ${t.nav_profile}</a>
                </nav>

                <div style="margin-top: auto; display: flex; flex-direction: column; gap: 15px;">
                    <div class="glass" style="padding: 15px; border-radius: 20px; display: flex; justify-content: space-around; align-items: center;">
                        <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                        <div style="width: 1px; height: 20px; background: var(--glass-border);"></div>
                        <select id="lang-select" style="background:none; border:none; color:inherit; font-size:12px; cursor:pointer; outline:none; font-weight:bold;">
                            <option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية</option>
                            <option value="fr" ${lang === 'fr' ? 'selected' : ''}>FR</option>
                            <option value="en" ${lang === 'en' ? 'selected' : ''}>EN</option>
                        </select>
                    </div>

                    <button id="logout-btn" class="nav-item" style="color: var(--neon-red); border: 1px solid rgba(255,0,0,0.1);">
                        <span>🚪</span> ${t.nav_logout}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('logout-btn').onclick = signOut;
        document.getElementById('theme-toggle').onclick = toggleTheme;
        document.getElementById('lang-select').onchange = (e) => {
            setLanguage(e.target.value);
            window.location.reload();
        };
    }

    // 2. Inject Background
    if (!document.getElementById('living-canvas')) {
        const bg = document.createElement('div');
        bg.id = 'living-canvas';
        bg.style.cssText = 'position:fixed; inset:0; z-index:-1; pointer-events:none;';
        document.body.prepend(bg);
        new ParticleField('living-canvas');
    }
}

function isActive(page) {
    return window.location.pathname.includes(page) ? 'active' : '';
}
