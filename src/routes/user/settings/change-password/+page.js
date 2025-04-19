export const ssr = false;

import { db } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
    const {
        data: { session }
    } = await db.auth.getSession();
    
    if (!session?.user) throw error(404, "Not found");

    const meta = {
        title: `Change Password - Settings`,
        description: `Create a more strong and secure password`
    }
    
    return { meta };
}