export const ssr = false;

import axios from "axios";
import { isHttpError, error, isRedirect, redirect } from "@sveltejs/kit";

import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config";

import type { UserProfile } from "$lib/types/user/user.js";
import type { ErrorResponse } from "$lib/types/error/error.js";
import type { Meta } from "$lib/types/meta/meta.js";

let user: UserProfile | null = null;

export async function load({ url, params }) {
    const { username } = params;

    try {
        const res = await axios.get<UserProfile>(`${BACKEND_URL}/user/${username}`);
        user = res?.data;

        const { data } = await db.auth.getSession();
        const token: string | undefined = data?.session?.access_token;

        if (token) {
            const response = await axios.get<UserProfile>(`${BACKEND_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userProfile: UserProfile = response?.data;

            if (username === userProfile?.username) {
                throw redirect(302, '/user/profile');
            }
        }

        const meta: Meta = {
            title: `${user.full_name} (@${user.username}) | English Society-Bozz`,
            description: `${user.bio}` || "No bio yet.",
            url: url.href
        };

        return { user, meta };

    } catch (err: unknown) {
        if (axios.isAxiosError<ErrorResponse>(err)) {
            if (err.status === 401 && user) {
                const meta: Meta = {
                    title: `${user.full_name} (@${user.username}) | English Society-Bozz`,
                    description: `${user.bio}` || "No bio yet.",
                    url: url.href
                };
        
                return { user, meta };
            }
            else throw error(404, "Not found");    
        } else if (isRedirect(err) || isHttpError(err)) {
            throw err;
        } else {
            throw error(500, "Unexpected error!");
        }
    }
}