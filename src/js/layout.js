// Shared Layout Injection Logic
import { signOut } from './auth.js';
import { getCurrentLang, TRANSLATIONS } from './i18n.js';
import { ParticleField } from './particles.js';

export function injectLayout() {
    const lang = getCurrentLang();

    // 1. Inject Sidebar (if container exists)
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div style="padding: 40px 20px; display: flex; flex-direction: column; height: 100%; gap: 30px;">
                <div class="logo syne gradient-text" style="font-size: 24px;">MOUBADARA</div>
                <nav style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="dashboard.html" class="glass glass-interactive" style="padding: 12px 20px;">DASHBOARD</a>
                    <a href="tasks.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">MY TASKS</a>
                    <a href="notifications.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">NOTIFICATIONS</a>
                    <a href="invites.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">INVITES</a>
                    <hr style="border:none; border-top:1px solid var(--glass-border); margin:10px 0;">
                    <a href="explore.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">EXPLORE</a>
                    <a href="create.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">NEW INITIATIVE</a>
                    <a href="profile.html" class="glass glass-interactive" style="padding: 12px 20px; opacity:0.7;">PROFILE</a>
                </nav>
                <button id="logout-btn" class="btn btn-primary" style="margin-top: auto; background: var(--neon-red); color: white;">LOGOUT</button>
            </div>
        `;
        document.getElementById('logout-btn').onclick = signOut;
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
