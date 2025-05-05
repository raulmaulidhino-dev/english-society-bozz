export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config.js";

import { redirect, error, isRedirect, isHttpError } from "@sveltejs/kit";
import type { ErrorResponse } from "$lib/types/error/error";
import type { UserProfile } from "$lib/types/user/user";

const fetchUserProfile = async (token: string) => {

    let userProfile: UserProfile | null = null;

    try {      
        const response = await axios.get<UserProfile>(`${BACKEND_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        userProfile = response.data;

    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            // eslint-disable-next-line no-unused-vars
            let errorMsg = err.response?.data?.message || err;

            if (err.response?.status === 404) {
                throw redirect(302, "/user/profile/edit");
            } else if (isRedirect(err) || isHttpError(err)) {
                throw err;
            } else {
                throw error(404, "Not found");
            }

        } else {
            throw error(500, "Unexpected error");
        }
    }
    return userProfile;
};

export async function load() {    
    const {
        data: { session }
    } = await db.auth.getSession();

    const roles = session?.user?.app_metadata?.roles;

    if (!roles.includes("officer") && !roles.includes("teacher")) throw error(404, "Not found");

    const token = session?.access_token;

    if (!token) {
        throw error(404, "Not found");
    }

    let userProfile = await fetchUserProfile(token);

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

    const meta = {
        title: `Announce an Award - Award Editor`,
        description: `Announce a new award.`
    };
    
    return { userProfile, awardCategories, awardLevels, awardTitles, studentClasses, meta };
}