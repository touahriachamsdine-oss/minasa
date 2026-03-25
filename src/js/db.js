// Database Access Layer
import { supabase } from './supabase.js';

export async function getProfile(userId) {
    return supabase.from('profiles').select('*').eq('id', userId).single();
}

export async function updateProfile(userId, data) {
    return supabase.from('profiles').update(data).eq('id', userId);
}

export async function getMyInitiatives(userId) {
    return supabase
        .from('initiative_members')
        .select(`
            initiative_id,
            initiatives (*),
            role
        `)
        .eq('user_id', userId);
}

export async function createInitiative(data, userId) {
    try {
        // 1. Insert Initiative
        const { data: initiative, error: iErr } = await supabase
            .from('initiatives')
            .insert([{ ...data, created_by: userId, status: 'planning' }])
            .select()
            .single();
        if (iErr) throw iErr;

        // 2. Add Founder
        await supabase.from('initiative_members').insert([{
            initiative_id: initiative.id,
            user_id: userId,
            role: 'founder',
            is_confirmed: true
        }]);

        // 3. Create 5 Steps
        const steps = [1, 2, 3, 4, 5].map(n => ({ initiative_id: initiative.id, step_number: n }));
        await supabase.from('steps').insert(steps);

        // 4. Log Activity
        await logActivity(initiative.id, 'initiative_created', { userId });

        return { data: initiative };
    } catch (e) {
        return { data: null, error: e.message };
    }
}

export async function logActivity(initiativeId, action, details = {}) {
    const { data: { user } } = await supabase.auth.getUser();
    return supabase.from('activity_log').insert([{
        initiative_id: initiativeId,
        user_id: user?.id,
        action,
        details
    }]);
}

export async function completeTask(taskId, initiativeId) {
    try {
        const { error } = await supabase.from('tasks').update({ is_completed: true, completed_at: new Date() }).eq('id', taskId);
        if (error) throw error;

        // Recalculate health
        await supabase.rpc('calculate_health_score', { initiative_id: initiativeId });
        return { success: true };
    } catch (e) {
        return { error: e.message };
    }
}
