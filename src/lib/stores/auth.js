export const ssr = false;

import { writable } from 'svelte/store';
import { db } from '$lib/supabase';
import { BACKEND_URL } from '$lib/config/config';

import axios from 'axios';

export const isLoggedIn = writable(false);
export const userData = writable(null);
export const userProfile = writable(null);

async function loadUserProfile() {
    const { data } = await db.auth.getSession();
    const user = data?.session?.user;

    if (user) {
        isLoggedIn.set(true);
        userData.set(user);

        const token = data?.session?.access_token;

        try {
            const response = await axios.get(`${BACKEND_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            userProfile.set(response.data);

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            userProfile.set(null);
        }

    } else {
        isLoggedIn.set(false);
        userData.set(null);
        userProfile.set(null);
    }
}

loadUserProfile();

db.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        loadUserProfile();
    } else {
        userProfile.set(null);
        isLoggedIn.set(false);
        userData.set(null);
    }
});