import { writable } from 'svelte/store';
import { db } from '$lib/supabase';

export const isLoggedIn = writable(false);
export const user = writable(null);

async function checkAuth() {
    const {
        data: { session }
    } = await db.auth.getSession();

    if (session?.user) {
        isLoggedIn.set(true);
        user.set(session.user);
    } else {
        isLoggedIn.set(false);
        user.set(null);
    }
}

checkAuth();

db.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        isLoggedIn.set(true);
        user.set(session.user);
    } else {
        isLoggedIn.set(false);
        user.set(null);
    }
});