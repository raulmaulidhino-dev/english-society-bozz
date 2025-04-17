export const ssr = false;

import { db } from "$lib/supabase";

export async function load() {
    const {
        data: { session }
    } = await db.auth.getSession();

    if (session?.user) window.location.replace('/user/profile');
}