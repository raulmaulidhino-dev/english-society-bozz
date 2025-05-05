import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/supabase/supabase";

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const db = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);
