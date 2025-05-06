export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { isHttpError, error, isRedirect, redirect } from "@sveltejs/kit";
import { BACKEND_URL } from "$lib/config/config";
import type { AwardResponse } from "$lib/types/award/award.js";
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

    let award: AwardResponse | null = null;

    try {
        const res = await axios.get<AwardResponse>(`${BACKEND_URL}/awards/${id}/${slug}`);
        award = res.data;

        if (slug !== award.slug) throw redirect(301, `/user/awards/${id}/${award.slug}/edit`);

        const meta: Meta = {
            title: `${award.id} - Award Editor`,
            description: `Edit your award announcement.`
        };

        const { data: awardCategories, error: awardCategoriesFetchingError } = await db.from("award_categories").select("id, category");
        const { data: awardLevels, error: awardLevelsFetchingError } = await db.from("award_levels").select("id, level");
        const { data: awardTitles, error: awardTitlesFetchingError } = await db.from("award_titles").select("id, title");
        const { data: studentClasses, error: studentClassesFetchingError } = await db.from("student_classes").select("id, class");
    
        if (
            awardCategoriesFetchingError ||
            awardLevelsFetchingError ||
            awardTitlesFetchingError ||
            studentClassesFetchingError
        ) {
            throw error(500, "Internal Server Error");
        }

        return { award, awardCategories, awardLevels, awardTitles, studentClasses, meta };
        
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            if (err.status === 301 && award) throw redirect(301, `/user/awards/${id}/${award.slug}/edit`);
            throw error(err?.response?.status || 404, err?.response?.data?.message || "Not found");    
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error");
        }
    }
}