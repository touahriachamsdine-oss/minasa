// Shared Layout Injection Logic (Upgarded Sidebar)
import { signOut } from './auth.js';
import { getCurrentLang, setLanguage } from './i18n.js';
import { toggleTheme } from './theme.js';
import { ParticleField } from './particles.js';

export function injectLayout() {
    const lang = getCurrentLang();
    const isRtl = lang === 'ar';

    // 1. Inject Sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div style="padding: 40px 20px; display: flex; flex-direction: column; height: 100%; gap: 10px;">
                <div class="logo syne gradient-text mb-40" style="font-size: 28px; font-weight:800; text-align:center;">MOUBADARA</div>
                
                <nav style="display: flex; flex-direction: column; gap: 8px;">
                    <a href="dashboard.html" class="nav-item ${isActive('dashboard')}"><span>🏠</span> ${isRtl ? 'لوحة التحكم' : 'Dashboard'}</a>
                    <a href="tasks.html" class="nav-item ${isActive('tasks')}"><span>📋</span> ${isRtl ? 'مهامي' : 'My Tasks'}</a>
                    <a href="notifications.html" class="nav-item ${isActive('notifications')}"><span>🔔</span> ${isRtl ? 'التنبيهات' : 'Notifications'}</a>
                    <a href="invites.html" class="nav-item ${isActive('invites')}"><span>✉️</span> ${isRtl ? 'الدعوات' : 'Invites'}</a>
                    <hr style="border:none; border-top:1px solid var(--glass-border); margin:15px 0;">
                    <a href="explore.html" class="nav-item ${isActive('explore')}"><span>🌍</span> ${isRtl ? 'استكشف' : 'Explore'}</a>
                    <a href="create.html" class="nav-item ${isActive('create')}"><span>➕</span> ${isRtl ? 'مبادرة جديدة' : 'New Initiative'}</a>
                    <a href="profile.html" class="nav-item ${isActive('profile')}"><span>👤</span> ${isRtl ? 'الملف الشخصي' : 'Profile'}</a>
                </nav>

                <div style="margin-top: auto; display: flex; flex-direction: column; gap: 15px;">
                    <!-- UTILITIES PANEL -->
                    <div class="glass" style="padding: 15px; border-radius: 20px; display: flex; justify-content: space-around; align-items: center;">
                        <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                        <div style="width: 1px; height: 20px; background: var(--glass-border);"></div>
                        <select id="lang-select" style="background:none; border:none; color:white; font-size:12px; cursor:pointer; outline:none;">
                            <option value="ar" ${lang === 'ar' ? 'selected' : ''}>AR</option>
                            <option value="fr" ${lang === 'fr' ? 'selected' : ''}>FR</option>
                            <option value="en" ${lang === 'en' ? 'selected' : ''}>EN</option>
                        </select>
                    </div>

                    <button id="logout-btn" class="nav-item" style="color: var(--neon-red); border: 1px solid rgba(255,0,0,0.1);">
                        <span>🚪</span> ${isRtl ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                </div>
            </div>
        `;

        // Event Listeners
        document.getElementById('logout-btn').onclick = signOut;
        document.getElementById('theme-toggle').onclick = async () => {
            const newTheme = await toggleTheme();
            // Optional: toast or icon update
        };
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
