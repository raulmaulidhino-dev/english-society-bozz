export const ssr = false;

import axios from "axios";
import { error, redirect } from "@sveltejs/kit";

import { db } from "$lib/supabase";
import { BACKEND_URL } from "$lib/config/config";

export async function load({ params }) {
    const { username } = params;

    try {
        const res = await axios.get(`${BACKEND_URL}/user/${username}`);
        const user = res?.data;


        const { data } = await db.auth.getSession();
        const token = data?.session?.access_token;

        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userProfile = response?.data;

        if (username === userProfile?.username) {
            throw redirect(302, '/user/profile');
        }

        return { user };

    } catch (err) {
        console.log(err || "Unknown Error");

        if (err.status === 302) throw redirect(302, '/user/profile');
        else throw error(404, "Not found");
    }
}