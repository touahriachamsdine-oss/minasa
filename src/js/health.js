// Client-side Health Analytics
import { supabase } from './supabase.js';

export async function getHealthReport(initiativeId) {
    // This is often handled by the Postgres function, but we provide client-side access
    const { data } = await supabase
        .from('initiatives')
        .select('health_score, status, current_step')
        .eq('id', initiativeId)
        .single();
    return data;
}

export function getHealthColor(score) {
    if (score >= 70) return '#00FFB2'; // Neon Green
    if (score >= 40) return '#FFD700'; // Gold
    return '#FF3E3E'; // Neon Red
}
