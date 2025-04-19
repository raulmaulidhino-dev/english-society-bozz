export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config";
import { error } from "@sveltejs/kit";

export async function load({ url }) {
    const page = parseInt(url.searchParams.get("page") || 1);
    const limit = 12;
    const offset = (page - 1) * limit;

    const {
        data: { session }
    } = await db.auth.getSession();

    const roles = session?.user?.app_metadata?.roles;

    if (!roles.includes("event_maker")) throw error(404, "Not found");

    const token = session?.access_token;

    try {
        const res = await axios.get(`${BACKEND_URL}/user/events?limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const events = res.data.data;
        const count = res.data.count;
        const pageCount = Math.ceil(count / limit);
        
        if (page > pageCount || page < 1) throw error(404, "Not Found");

        const meta = {
            title: `My Events - Page ${page}`,
            description: `Manage my ${count} event(s).`
        }
        
        return { events, pageCount, page, meta }
    } catch (error) {
        throw error(error?.response?.status || 404, error?.response?.message || "Not found");
    }
}
