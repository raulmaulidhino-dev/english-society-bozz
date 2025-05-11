import axios from "axios";
import { error, isHttpError, isRedirect } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

import type { EventResponse, EventsResponse } from "$lib/types/event/event.js";
import type { Meta } from "$lib/types/meta/meta.js";
import type { ErrorResponse } from "$lib/types/error/error.js";

export async function load({ url }) {
    const page: number = parseInt(url.searchParams.get("page") ?? "1");
    const limit: number = 12;
    const offset: number = (page - 1) * limit;
    const sortBy: string = url.searchParams.get("sortBy") ?? "date"; 
    const sortOrder: string = url.searchParams.get("sortOrder") ?? "desc";
    const search: string = url.searchParams.get("search") ?? "";

    const meta: Meta = {
        title: "Events | English Society-Bozz",
        description: "Stay up-to-date with upcoming ES-Bozz events, workshops, and gatherings. Join us in celebrating milestones, learning new things, and building a vibrant community.",
        url: url.href
    }

    try {
        const res = await axios.get<EventsResponse>(`${BACKEND_URL}/events?search=${encodeURIComponent(search)}&sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}&limit=${limit}&offset=${offset}`);
        const events: EventResponse[] = res.data.data;
        const count: number = res.data.count;
        const pageCount: number = Math.ceil(count / limit);

        const showPagination: boolean = count > limit;    
        
        if ((page > pageCount && count > 0) || page < 1) throw error(404, "Not Found");

        meta.title = `Events - Page ${page} | English Society-Bozz`;
        
        return { events, pageCount, page, meta, showPagination, search, sortBy, sortOrder };
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            if (err?.response?.status === 404) throw error(404, "Not Found");
            return { err, meta };    
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error");
        }
    }
}
