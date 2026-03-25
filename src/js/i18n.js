// Internationalization System (Neon Native)
import { neon } from './neon.js';
import { getSession } from './auth.js';

export const TRANSLATIONS = {
    ar: {
        nav_explore: 'استكشف',
        nav_how: 'كيف تعمل',
        nav_login: 'دخول',
        nav_start: 'ابدأ الآن',
        hero_title: 'حوّل حيّك إلى مجتمع',
        hero_subtitle: 'منصة لمبادرات الجزائريين',
        placeholder_search: 'ابحث عن مبادرة...',
        btn_save: 'حفظ التغييرات',
        msg_success: 'تمت العملية بنجاح'
    },
    fr: {
        nav_explore: 'Explorer',
        nav_how: 'Comment ça marche',
        nav_login: 'Connexion',
        nav_start: 'Démarrer',
        hero_title: 'Transforme ton quartier',
        hero_subtitle: 'Plateforme pour les initiatives algériennes',
        placeholder_search: 'Rechercher...',
        btn_save: 'Sauvegarder',
        msg_success: 'Opération réussie'
    },
    en: {
        nav_explore: 'Explore',
        nav_how: 'How it works',
        nav_login: 'Sign In',
        nav_start: 'Start Now',
        hero_title: 'Transform Your Neighborhood',
        hero_subtitle: 'Platform for Algerian initiatives',
        placeholder_search: 'Search...',
        btn_save: 'Save Changes',
        msg_success: 'Operation successful'
    }
};

export function setLanguage(lang) {
    localStorage.setItem('moubadara_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
    });

    syncLang(lang);
}

async function syncLang(lang) {
    const session = await getSession();
    if (session) {
        await neon.from('profiles').update({ lang }, session.user.id);
    }
}

export function getCurrentLang() {
    return localStorage.getItem('moubadara_lang') || 'ar';
}
