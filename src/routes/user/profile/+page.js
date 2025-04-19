export const ssr = false;

import axios from "axios";
import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config.js";

import { redirect, error } from "@sveltejs/kit";

const fetchUserProfile = async (token) => {

    let userProfile = null;

    try {      
        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        userProfile = response.data;

    } catch (err) {
        if (err.response?.status === 404 && err.response?.data.redirect) {
            throw redirect(302, err.response.data.redirect);
        } else {
            throw error(404, "Not found");
        }
    }
    
    return userProfile;
};

export async function load() {    
    const {
        data: { session }
    } = await db.auth.getSession();

    const token = session?.access_token;

    if (!token) {
        throw error(404, "Not found");
    }

    let userProfile = await fetchUserProfile(token);

    const roles = session?.user?.app_metadata?.roles;
    if (roles) userProfile = {...userProfile, roles};

    const meta = {
        title: `My Profile`,
        description: `Manage your profile.`
    }
    
    return { userProfile: userProfile, meta };
}