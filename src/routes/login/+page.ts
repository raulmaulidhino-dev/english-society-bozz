export const ssr = false;

import { db } from '$lib/supabase';

import type { Meta } from '$lib/types/meta/meta';

export async function load() {
    const {
        data: { session }
    } = await db.auth.getSession();
    
    if (session?.user) window.location.replace('/user/profile');
        
    const meta: Meta = {
        title: "Login | English Society-Bozz",
        description: "Securely log in to you ES-Bozz account to manage your account, settings, data, and resources based on your role(s)"
    }

    return { meta };
}