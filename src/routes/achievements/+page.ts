export const ssr = false;

import axios from "axios";
import { error, isHttpError, isRedirect } from "@sveltejs/kit";

import { BACKEND_URL } from "$lib/config/config";

import type { AchievementResponse, AchievementsResponse } from "$lib/types/achievement/achievement.js";
import type { Meta } from "$lib/types/meta/meta.js";
import type { ErrorResponse } from "$lib/types/error/error.js";

export async function load({ url }) {
    const page: number = parseInt(url.searchParams.get("page") ?? "1");
    const limit: number = 12;
    const offset: number = (page - 1) * limit;

    const meta: Meta = {
        title: "Achievements | English Society-Bozz",
        description: "From awards to major milestones, see how far we've come. This section showcases our proudest moments and the progress we've made over time."
    }

    try {
        const res = await axios.get<AchievementsResponse>(`${BACKEND_URL}/achievements?limit=${limit}&offset=${offset}`);
        const achievements: AchievementResponse[] = res.data.data;
        const count: number = res.data.count;
        const pageCount: number = Math.ceil(count / limit);
        
        if ((page > pageCount && count > 0) || page < 1) throw error(404, "Not Found");

        meta.title = `Achievements - Page ${page} | English Society-Bozz`;
        
        return { achievements, pageCount, page, meta };
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
