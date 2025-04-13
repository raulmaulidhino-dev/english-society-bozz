export const ssr = false;

import axios from "axios";

import { BACKEND_URL } from "$lib/config/config";

export async function load({ url }) {
    const page = parseInt(url.searchParams.get("page") || 1);
    const limit = 12;
    const offset = (page - 1) * limit;

    try {
        const res = await axios.get(`${BACKEND_URL}/events?limit=${limit}&offset=${offset}`);
        const events = res.data.data;
        const count = res.data.count;
        const pageCount = Math.ceil(count / limit);
        
        if (page > pageCount || page < 1) return {};
        
        return { events, pageCount, page }
    } catch (error) {
        return { error };
    }

}
