// Secure Authentication Implementation
import { supabase } from './supabase.js';

export async function signUp(email, password, fullName, phone, wilaya, neighborhood) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    wilaya: wilaya,
                    neighborhood: neighborhood
                }
            }
        });
        if (error) throw error;
        window.location.href = '/pages/dashboard.html';
    } catch (e) {
        return { error: e.message };
    }
}

export async function signIn(email, password) {
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/pages/dashboard.html';
    } catch (e) {
        return { error: e.message };
    }
}

export async function signOut() {
    await supabase.auth.signOut();
    localStorage.removeItem('moubadara_session');
    window.location.href = '/pages/auth.html';
}

export async function requireAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '/pages/auth.html';
        return null;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    return { user: session.user, profile };
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
