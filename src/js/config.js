// Moubadara App Configuration (Neon Native)
export const NEON_AUTH_URL = 'YOUR_NEON_AUTH_URL';
export const NEON_API_URL = 'YOUR_NEON_API_URL';

export const APP_CONFIG = {
    name: { ar: 'مبادرة', fr: 'Moubadara', en: 'Moubadara' },
    version: '1.0.0',
    defaultLang: 'ar',
    defaultTheme: 'dark',
    // ... rest of config
    wilayas: [
        'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
        'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
        'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
        'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
        'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj',
        'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
        'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
        'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal',
        'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet',
        'El M\'Ghair', 'El Meniaa'
    ],
    categories: [
        { id: 'cleaning', icon: '🧹', ar: 'نظافة', fr: 'Propreté', en: 'Cleaning' },
        { id: 'planting', icon: '🌳', ar: 'تشجير', fr: 'Plantation', en: 'Planting' },
        { id: 'lighting', icon: '💡', ar: 'إنارة', fr: 'Éclairage', en: 'Lighting' },
        { id: 'roads', icon: '🛣️', ar: 'طرق', fr: 'Routes', en: 'Roads' },
        { id: 'security', icon: '🔒', ar: 'أمن', fr: 'Sécurité', en: 'Security' },
        { id: 'other', icon: '✨', ar: 'أخرى', fr: 'Autre', en: 'Other' }
    ],
    steps: [
        { n: 1, ar: 'تحديد المشكلة', fr: 'Définir le problème', en: 'Define Problem' },
        { n: 2, ar: 'التخطيط', fr: 'Planification', en: 'Planning' },
        { n: 3, ar: 'التنفيذ', fr: 'Exécution', en: 'Execution' },
        { n: 4, ar: 'التقييم', fr: 'Évaluation', en: 'Evaluation' },
        { n: 5, ar: 'الاستمرارية', fr: 'Durabilité', en: 'Sustainability' }
    ]
};
