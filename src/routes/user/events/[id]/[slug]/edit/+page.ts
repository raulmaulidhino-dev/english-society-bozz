export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { isHttpError, error, isRedirect, redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "$lib/config/config";
import type { EventResponse } from "$lib/types/event/event.js";
import type { ErrorResponse } from "$lib/types/error/error.js";
import type { Meta } from "$lib/types/meta/meta.js";

interface Params {
    id: string;
    slug: string;
}

export async function load({ params }) {
    const { id, slug }: Params = params;

    const {
        data: { session }
    } = await db.auth.getSession();

    const roles: string[] = session?.user?.app_metadata?.roles;

    if (!roles.includes("event_maker")) throw error(404, "Not found");

    let event: EventResponse | null = null;

    try {
        const res = await axios.get<EventResponse>(`${BACKEND_URL}/events/${id}/${slug}`);
        event = res.data;

        if (slug !== event.slug) throw redirect(301, `/user/events/${id}/${event.slug}/edit`);

        const meta: Meta = {
            title: `${event.id} - Event Editor`,
            description: `Edit your event.`
        };

        return { event, meta };
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            if (err.status === 301 && event) throw redirect(301, `/user/events/${id}/${event.slug}/edit`);
            throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");    
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error");
        }
    }
}