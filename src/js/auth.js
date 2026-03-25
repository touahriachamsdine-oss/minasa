// Neon Auth Implementation
import { NEON_AUTH_URL } from './config.js';
import { neon } from './neon.js';

export async function signUp(email, password, fullName, phone, wilaya, neighborhood) {
    try {
        const res = await fetch(`${NEON_AUTH_URL}/signUp`, {
            method: 'POST',
            body: JSON.stringify({ email, password, name: fullName, metadata: { phone, wilaya, neighborhood } })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        localStorage.setItem('neon_session', JSON.stringify(data.session));
        neon.setToken(data.session.token);
        window.location.href = '/pages/dashboard.html';
    } catch (e) {
        return { error: e.message };
    }
}

export async function signIn(email, password) {
    try {
        const res = await fetch(`${NEON_AUTH_URL}/signIn`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        localStorage.setItem('neon_session', JSON.stringify(data.session));
        neon.setToken(data.session.token);
        window.location.href = '/pages/dashboard.html';
    } catch (e) {
        return { error: e.message };
    }
}

export async function signOut() {
    localStorage.removeItem('neon_session');
    window.location.href = '/pages/auth.html';
}

export async function getSession() {
    const sessionStr = localStorage.getItem('neon_session');
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    neon.setToken(session.token);
    return session;
}

export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        window.location.href = '/pages/auth.html';
        return null;
    }

    const { data: profile } = await neon.from('profiles').select().id(session.user.id);
    return { user: session.user, profile: profile ? profile[0] : null };
}

export async function requireAdmin() {
    const auth = await requireAuth();
    if (!auth) return null;

    if (auth.profile.role !== 'admin' && auth.profile.role !== 'superadmin') {
        window.location.href = '/pages/dashboard.html';
        return null;
    }
    return auth;
}
