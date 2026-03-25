// Supabase Real-time Subscriptions
import { supabase } from './supabase.js';
import { showToast } from './notifications.js';

export function subscribeToInitiative(initiativeId, callbacks) {
    return supabase.channel(`initiative:${initiativeId}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `initiative_id=eq.${initiativeId}` }, callbacks.onTaskUpdate)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'initiative_members', filter: `initiative_id=eq.${initiativeId}` }, callbacks.onMemberJoin)
        .subscribe();
}

export function subscribeToNotifications(userId, onNew) {
    return supabase.channel(`user_notifs:${userId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, payload => {
            onNew(payload.new);
            showToast(payload.new);
        })
        .subscribe();
}

export function unsubscribeAll() {
    return supabase.removeAllChannels();
}
