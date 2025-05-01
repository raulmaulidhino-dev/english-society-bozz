export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config.js";

import { redirect, error, isRedirect, isHttpError } from "@sveltejs/kit";

import type { ErrorResponse } from "$lib/types/error/error";
import type { UserProfile } from "$lib/types/user/user";
import type { Meta } from "$lib/types/meta/meta";

const fetchUserProfile = async (token: string): Promise<UserProfile> => {

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
            if (err.response?.status === 404) {
                throw redirect(302, "/user/profile/edit");
            } else {
                throw error(404, "Not found");
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

    let userProfile: UserProfile = await fetchUserProfile(token);

    const roles: string[] = session?.user?.app_metadata?.roles;
    if (roles) userProfile = {...userProfile, roles};

    const meta: Meta = {
        title: `My Profile`,
        description: `Manage your profile.`
    }
    
    return { userProfile, meta };
}