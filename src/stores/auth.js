import { writable, derived } from "svelte/store";
import axios from "axios";

export const accessToken = writable(null);

const getStoredToken = () => {
    if (typeof localStorage !== 'undefined') return localStorage.getItem("RTID") || null;
    return null;
}

export const refreshTokenID = writable(getStoredToken());

refreshTokenID.subscribe(value => {
    if (typeof localStorage !== 'undefined') {
        if (value) localStorage.setItem("RTID", value);
        else localStorage.removeItem("RTID");
    }
});

export const isLoggedIn = derived(refreshTokenID, $refreshTokenID => !!$refreshTokenID);

export async function refreshAccessToken(refreshTokenID) {
    try {
        const res = await axios.post("https://esbozz-api.vercel.app/api/refresh", {
            refreshTokenID
        });
    
        accessToken.set(res.data.newAccessToken);
    } catch (err) {
        console.error(err);
        accessToken.set(null);

        localStorage.removeItem("RTID");
        window.location.href = '/';
    }
}