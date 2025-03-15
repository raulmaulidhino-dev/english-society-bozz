<script>
    import defaultPFP from '$lib/images/defaults/default_pfp.svg';

    import axios from "axios";
    import { onMount } from "svelte";
    import { accessToken, refreshAccessToken } from "../../../stores/auth.js";

    let userProfile = null;
    let error = null;
    let isLoading = true;

    let showSection = false;

    let token = $accessToken;

    const fetchUserProfile = async () => {
        const refreshTokenID = localStorage.getItem("RTID");

        isLoading = true;
        error = null;

        try {
            if (token === null) {
                await refreshAccessToken(refreshTokenID);
                token = $accessToken;
            };

            const res = await axios.get("https://esbozz-api.vercel.app/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            userProfile = res.data;
        } catch (err) {
            error = err.response?.data?.message || err;

            if (err.response?.status === 404 && err.response?.data.redirect) {
                window.location.href = err.response.data.redirect;
            } else window.location.href = '/login';
            
        }
    }

    onMount( async () => {
        await fetchUserProfile();
        if (userProfile) isLoading = false;
    });

    const logout = async () => {
        showSection = false;

        let refreshTokenID = localStorage.getItem("RTID");

        try {

            const res = await axios.post("https://esbozz-api.vercel.app/api/auth/logout", {
                refreshTokenID
            });

        } finally {

            accessToken.set(null);
            localStorage.removeItem("RTID");

            window.location.href = '/';

            userProfile = null;
            error = null;
            token = null;

        }
    }
</script>

{#if !isLoading}
    <section>
        <section class="py-10 px-6 flex flex-col justify-center items-center gap-1">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={defaultPFP} 
                alt="User Photo Profile"
                class="h-24 rounded-full my-6"
            />
            <h2 class="text-3xl text-primary font-bold">{userProfile?.full_name || "Full Name"}</h2>
            <p class="text-sm text-slate-500">{userProfile?.users.username || "username"}</p>
            <p class="text-sm text-center my-2 mx-4">{userProfile?.bio || "No bio yet."}</p>
            <a href="/user/profile/edit" class="text-sm text-primary font-semibold border-2 border-primary py-2 px-8 rounded-full my-4
                                        hover:bg-secondary">EDIT PROFILE</a>
            <button class="text-sm text-white bg-red-500 font-semibold border-2 border-primary py-2 px-8 rounded-full my-4"
                                        on:click={logout}>LOGOUT</button>
        </section>
    </section>
{/if}