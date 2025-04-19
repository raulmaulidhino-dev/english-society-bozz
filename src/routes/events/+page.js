export const ssr = false;

import axios from "axios";
import { error } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

export async function load({ url }) {
    const page = parseInt(url.searchParams.get("page") || 1);
    const limit = 12;
    const offset = (page - 1) * limit;

    const meta = {
        title: "Events | ES-Bozz",
        description: "Stay up-to-date with upcoming ES-Bozz events, workshops, and gatherings. Join us in celebrating milestones, learning new things, and building a vibrant community."
    }

    try {
        const res = await axios.get(`${BACKEND_URL}/events?limit=${limit}&offset=${offset}`);
        const events = res.data.data;
        const count = res.data.count;
        const pageCount = Math.ceil(count / limit);
        
        if (page > pageCount || page < 1) throw error(404, "Not Found");

        meta.title = `Events - Page ${page} | ES-Bozz`;
        
        return { events, pageCount, page, meta };
    } catch (error) {
        return { error, meta };
    }

}
