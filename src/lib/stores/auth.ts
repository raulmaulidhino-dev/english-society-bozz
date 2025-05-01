export const ssr = false;

import { writable } from 'svelte/store';
import { db } from '$lib/supabase';
import { BACKEND_URL } from '$lib/config/config';

import axios from 'axios';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '$lib/types/user/user';
import type { ErrorResponse } from '$lib/types/error/error';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';

export const isLoggedIn = writable(false);
export const userData = writable<User | null>(null);
export const userProfile = writable<UserProfile | null>(null);

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

        } catch (err: unknown) {
            userProfile.set(null);

            if (axios.isAxiosError<ErrorResponse>(err)) {
                if (err.response?.status === 404) {
                    userProfile.set(null);
                }

                if (err.response?.status === 401) {
                    
                    db.auth.signOut();
    
                    isLoggedIn.set(false);
                    userData.set(null);
                    userProfile.set(null); 
                }
            } else if (isRedirect(err) || isHttpError(err)) {
                throw err;
            } else {
                throw error(500, "Unexpected error");
            }
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
