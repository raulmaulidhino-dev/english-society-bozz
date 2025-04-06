export const ssr = false;

import { get } from "svelte/store"
import { redirect } from "@sveltejs/kit";

import { isLoggedIn } from '$lib/stores/auth';

export async function load() {
    const isUserLoggedIn = get(isLoggedIn);
    if (isUserLoggedIn) throw redirect(302, '/user/profile');
}