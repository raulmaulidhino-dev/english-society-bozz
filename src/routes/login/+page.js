export const ssr = false;

import { get } from "svelte/store"; 
import { isLoggedIn } from "$lib/stores/auth";

export async function load() {
    const status = get(isLoggedIn);
    if (status) window.location.replace('/user/profile');
}