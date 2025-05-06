export const ssr = false;

import { db } from '$lib/supabase';

export async function load() {
    const { data, error } = await db.from("esbozz_data").select("join_us_url");    

    if (error) return { join_now_url: null };
    
    return { join_now_url: data[0].join_us_url };
}
