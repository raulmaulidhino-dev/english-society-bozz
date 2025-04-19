export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { error, redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "$lib/config/config";

export async function load({ params }) {
    const { id, slug } = params;

    const {
        data: { session }
    } = await db.auth.getSession();

    const roles = session?.user?.app_metadata?.roles;

    if (!roles.includes("event_maker")) throw error(404, "Not found");

    let event = null;

    try {
        const res = await axios.get(`${BACKEND_URL}/events/${id}/${slug}`);
        event  = res.data;

        if (slug !== event.slug) throw redirect(301, `/user/events/${id}/${event.slug}/edit`);

        const meta = {
            title: `${event.id} - Event Editor`,
            description: `Edit your event.`
        };

        return { event, meta };
    } catch (err) {
        if (err.status === 301) throw redirect(301, `/user/events/${id}/${event.slug}/edit`);
        throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");
    }
}