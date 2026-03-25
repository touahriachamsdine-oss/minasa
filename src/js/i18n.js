// Internationalization System (Full Dictionary)
import { neon } from './neon.js';
import { getSession } from './auth.js';

export const TRANSLATIONS = {
    ar: {
        nav_dashboard: 'لوحة التحكم',
        nav_tasks: 'مهامي',
        nav_notifications: 'التنبيهات',
        nav_invites: 'الدعوات',
        nav_explore: 'استكشف المبادرات',
        nav_create: 'مبادرة جديدة',
        nav_profile: 'الملف الشخصي',
        nav_logout: 'تسجيل الخروج',
        hero_title: 'حوّل حيّك إلى مجتمع',
        hero_subtitle: 'منصة لمبادرات الجزائريين من أجل حي أفضل.',
        btn_start: 'ابدأ الآن',
        btn_save: 'حفظ التغييرات',
        msg_success: 'تمت العملية بنجاح',
        login_title: 'دخول',
        signup_title: 'إنشاء حساب'
    },
    fr: {
        nav_dashboard: 'Tableau de bord',
        nav_tasks: 'Mes Tâches',
        nav_notifications: 'Notifications',
        nav_invites: 'Invitations',
        nav_explore: 'Explorer',
        nav_create: 'Nouvelle Initiative',
        nav_profile: 'Profil',
        nav_logout: 'Déconnexion',
        hero_title: 'Transformez votre quartier',
        hero_subtitle: 'Plateforme pour les initiatives algériennes.',
        btn_start: 'Démarrer',
        btn_save: 'Sauvegarder',
        msg_success: 'Opération réussie',
        login_title: 'Connexion',
        signup_title: 'Inscription'
    },
    en: {
        nav_dashboard: 'Dashboard',
        nav_tasks: 'My Tasks',
        nav_notifications: 'Notifications',
        nav_invites: 'Invites',
        nav_explore: 'Explore',
        nav_create: 'New Initiative',
        nav_profile: 'Profile',
        nav_logout: 'Logout',
        hero_title: 'Transform Your Neighborhood',
        hero_subtitle: 'Platform for Algerian initiatives.',
        btn_start: 'Get Started',
        btn_save: 'Save Changes',
        msg_success: 'Success',
        login_title: 'Sign In',
        signup_title: 'Sign Up'
    }
};

export function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'ar';
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
