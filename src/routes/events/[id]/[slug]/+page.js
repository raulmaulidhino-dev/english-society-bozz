export const ssr = false;

import axios from "axios";
import { error, redirect } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

export async function load({ params }) {
    const { id, slug } = params;

    let event = null;

    try {
        const res = await axios.get(`${BACKEND_URL}/events/${id}/${slug}`);
        event  = res.data;

        if (slug !== event.slug) throw redirect(301, `/events/${id}/${event.slug}`);

        const event_date = new Date(event.date).toLocaleString();

        const meta = {
            title: `${event.title} - Event`,
            description: `${event.location} • ${event_date} • By ${event.event_maker_name}`,
        }

        return { event, meta };
    } catch (err) {
        if (err.status === 301) throw redirect(301, `/events/${id}/${event.slug}`);
        throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");
    }
}