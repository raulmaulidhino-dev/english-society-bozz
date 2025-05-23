import { db } from '$lib/supabase';
import { error } from '@sveltejs/kit';

export async function load() {
    const { data: esbozzData, error: esbozzDataFetchingError } = await db.from("esbozz_data").select("mission, focus, join_us_url, activities");    
    const { data: esbozzOfficers, error: officersFetchingError } = await db.from("esbozz_officers").select("president, vice_president, secretary_1, secretary_2, treasurer_1, treasurer_2, it_manager_1, it_manager_2, officers"); 

    if (esbozzDataFetchingError || officersFetchingError) throw error(500, "Unexpected error");

    const { data } = await db.auth.getSession();
    
    const roles: string[] = data?.session?.user?.app_metadata?.roles;

    if (roles) return { esbozzData: esbozzData[0], esbozzOfficers: esbozzOfficers[0], roles };
    return { esbozzData: esbozzData[0], esbozzOfficers: esbozzOfficers[0], roles: [""] };
}
