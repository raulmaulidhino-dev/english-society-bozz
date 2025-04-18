export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase.js";
import { BACKEND_URL } from "$lib/config/config";

import { error } from "@sveltejs/kit";

const fetchUserProfile = async (token) => {
    let userProfile = null;

    if (!token) {
        throw error(404, "Not found");
    }

    try {            
        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        userProfile = response.data;

    } catch (err) {
        if (err.response?.status === 404 && err.response?.data.redirect) {
            userProfile = {};
        } else {
            throw error(404, "Not found");
        }
    }
    
    return userProfile;
};

export async function load({ url }) {
    const {
        data: { session }
    } = await db.auth.getSession();

    const token = session?.access_token;

    const newAvatarUrl = url.searchParams?.get('newAvatarUrl') || null;

    let userProfile = await fetchUserProfile(token);
    if (newAvatarUrl) userProfile = {...userProfile, new_avatar_url: newAvatarUrl};

    const meta = {
        title: `Edit Profile`,
        description: `Edit my profile data.`
    }

    return { userProfile, meta };
}