export const ssr = false;

import axios from "axios";
import { error } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

export async function load({ params }) {
    const { id, slug } = params;

    try {
        const res = await axios.get(`${BACKEND_URL}/events/${id}/${slug}`);
        const event  = res.data;
        return { event };
    } catch (err) {
        throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");
    }
}