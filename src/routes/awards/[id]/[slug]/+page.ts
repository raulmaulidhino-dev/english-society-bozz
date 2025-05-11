import axios from "axios";
import { isHttpError, error, isRedirect, redirect } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

import type { AwardResponse } from "$lib/types/award/award.js";

export async function load({ url, params }) {
    const { id, slug } = params;

    let award: AwardResponse | null = null;

    try {
        const res = await axios.get<AwardResponse>(`${BACKEND_URL}/awards/${id}/${slug}`);
        award = res.data;

        if (slug !== award.slug) throw redirect(301, `/awards/${id}/${award.slug}`);

        const meta = {
            title: `${award.name} - Award`,
            description: `${award.award_categories.category} • ${award.award_levels.level} • Awarded by ${award.student_name}`,
            url: url.href,
            ogImage: award?.photo_url ?? undefined
        }

        return { award, meta };

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 301) {
                if (award) throw redirect(301, `/events/${id}/${award.slug}`);
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