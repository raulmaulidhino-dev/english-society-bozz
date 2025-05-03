export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase.js";
import { BACKEND_URL } from "$lib/config/config";

import { error, isHttpError, isRedirect } from "@sveltejs/kit";
import type { ErrorResponse } from "$lib/types/error/error.js";
import type { Meta } from "$lib/types/meta/meta.js";
import type { UserProfile } from "$lib/types/user/user.js";

const fetchUserProfile = async (token: string) => {
    let userProfile: UserProfile | null = null;

    if (!token) {
        throw error(404, "Not found");
    }

    try {            
        const response = await axios.get<UserProfile>(`${BACKEND_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        userProfile = response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            if (err.response?.status === 404) {
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
    
    return userProfile;
};

export async function load() {
    const {
        data: { session }
    } = await db.auth.getSession();

    const token: string | undefined = session?.access_token;

    if (!token) {
        throw error(404, "Not found");
    }

    let userProfile = await fetchUserProfile(token);

    const meta: Meta = {
        title: `Edit Profile`,
        description: `Edit my profile data.`
    }

    return { userProfile, meta };
}