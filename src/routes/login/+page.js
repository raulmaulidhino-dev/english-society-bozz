export const ssr = false;

import { get } from "svelte/store"; 
import { isLoggedIn } from "$lib/stores/auth";

export async function load() {
    const status = get(isLoggedIn);
    if (status) window.location.replace('/user/profile');
        
    const meta = {
        title: "Login | English Society-Bozz",
        description: "Securely log in to you ES-Bozz account to manage your account, settings, data, and resources based on your role(s)"
    }

    return { meta };
}