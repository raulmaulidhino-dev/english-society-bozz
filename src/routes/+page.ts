export const ssr = false;

import { BACKEND_URL } from '$lib/config/config';
import { db } from '$lib/supabase';
import type { AwardsResponse, AwardResponse } from '$lib/types/award/award';
import axios from 'axios';

export async function load() {
    const { data, error } = await db.from("esbozz_data").select("join_us_url");    

    if (error) return { join_now_url: null };

    let awards: AwardResponse[] | null = null;

    const limit: number = 8;
    const sortBy: string = "award_date"; 
    const sortOrder: string = "desc";
    
    try {
      const res = await axios.get<AwardsResponse>(
        `${BACKEND_URL}/awards?sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}&limit=${limit}`
      );

      awards = res.data.data;
        
    } catch {
        awards = null;
    }
    
    return { join_now_url: data[0].join_us_url, awards };
}
