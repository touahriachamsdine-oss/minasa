// Token-based Invitation Logic
import { supabase } from './supabase.js';

export async function createInvite(initiativeId, invitedBy, phone = null) {
    const { data, error } = await supabase
        .from('invites')
        .insert([{ initiative_id: initiativeId, invited_by: invitedBy, phone }])
        .select()
        .single();

    return { data, shareUrl: `${window.location.origin}/pages/join.html?token=${data?.token}` };
}

export async function acceptInvite(token, userId) {
    try {
        const { data: invite, error: vErr } = await supabase
            .from('invites')
            .select('*')
            .eq('token', token)
            .single();

        if (vErr || !invite) throw new Error('Invalid or expired token');

        // Add member
        await supabase.from('initiative_members').insert([{
            initiative_id: invite.initiative_id,
            user_id: userId,
            is_confirmed: true
        }]);

        // Mark accepted
        await supabase.from('invites').update({ is_accepted: true }).eq('id', invite.id);

        return { success: true, initiativeId: invite.initiative_id };
    } catch (e) {
        return { error: e.message };
    }
}
