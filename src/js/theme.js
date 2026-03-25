// Theme Persistence Logic
import { supabase } from './supabase.js';

export function initTheme() {
    const currentTheme = localStorage.getItem('moubadara_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
}

export async function toggleTheme() {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('moubadara_theme', newTheme);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('profiles').update({ theme: newTheme }).eq('id', user.id);
    }
}
