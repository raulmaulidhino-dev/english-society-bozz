export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config";
import { error, isHttpError, isRedirect } from "@sveltejs/kit";
import type { EventsResponse } from "$lib/types/event/event.js";
import type { ErrorResponse } from "$lib/types/error/error.js";

export async function load({ url }) {
    const page: number = parseInt(url.searchParams.get("page") || "1");
    const limit: number = 12;
    const offset: number = (page - 1) * limit;

    const {
        data: { session }
    } = await db.auth.getSession();

    const roles: string[] = session?.user?.app_metadata?.roles;

    if (!roles.includes("event_maker")) throw error(404, "Not found");

    const token: string | undefined = session?.access_token;

    if (!token) {
        throw error(404, "Not found");
    }

    try {
        const res = await axios.get<EventsResponse>(`${BACKEND_URL}/user/events?limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const events = res.data.data;
        const count = res.data.count;
        const pageCount = Math.ceil(count / limit);

        if ((page > pageCount && count > 0) || page < 1) throw error(404, "Not Found");
        
        const meta = {
            title: `My Event Announcements - Page ${page}`,
            description: `Manage my ${count} event announcement(s).`
        }
        
        return { events, pageCount, page, meta }
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error");
        }
    }
}
