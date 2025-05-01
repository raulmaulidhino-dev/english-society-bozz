export const ssr = false;

import axios from "axios";
import { isHttpError, error, isRedirect, redirect } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

import type { EventResponse } from "$lib/types/event/event.js";

export async function load({ params }) {
    const { id, slug } = params;

    let event: EventResponse | null = null;

    try {
        const res = await axios.get<EventResponse>(`${BACKEND_URL}/events/${id}/${slug}`);
        event = res.data;

        if (slug !== event.slug) throw redirect(301, `/events/${id}/${event.slug}`);

        const event_date = new Date(event.date).toLocaleString();

        const meta = {
            title: `${event.title} - Event`,
            description: `${event.location} • ${event_date} • By ${event.event_maker_name}`,
        }

        return { event, meta };

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 301) {
                if (event) throw redirect(301, `/events/${id}/${event.slug}`);
                else throw error(404, "Not found");
            } else if (err.response?.status === 404) {
                throw error(404, "Not found");
            } else {
                throw error(500, "Unexpected error");
            }
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error");
        }
    }
}