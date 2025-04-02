<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { accessToken, refreshAccessToken } from "../../../stores/auth.js";

    import LoadingSpinner from './../../loading/LoadingSpinner.svelte';
    import {Icon, User as Profile} from 'svelte-hero-icons';

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

    function goToProfileEdit() {
        window.location.href = '/user/profile/edit';
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
{#if isLoading}
    <LoadingSpinner />
{:else}
    <section class="bg-slate-200 p-4 md:p-8">
        <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col justify-center">
            <section class="bg-secondary w-full h-40 rounded-t-[inherit]">
            </section>
            <section class="rounded-b-[inherit] relative">
                <section class="pb-10 px-6 profile-data">
                    <div class="text-white bg-primary h-24 w-24 border-2 border-white rounded-[50%] p-2 absolute top-[-48px] left-8 flex justify-center items-center">
                        <Icon src={Profile} solid size="52" />
                    </div>
                    <h2 class="text-2xl text-primary font-bold capitalize mt-14 break-words">{userProfile?.full_name || "Full Name"}</h2>
                    <p class="text-sm text-slate-500 break-words">{userProfile?.users.username || "username"}</p>
                    <p class="text-sm break-words">{userProfile?.bio || "No bio yet."}</p>
                </section>
                <section class="border-t-2 border-slate-200 py-4 px-4 flex flex-col gap-2">
                    <button on:click={goToProfileEdit} class="text-sm text-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full
                                            hover:bg-secondary sm:absolute sm:top-4 sm:right-4 inline-block">EDIT PROFILE</button>
                    <button class="text-sm text-white bg-red-600 font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full"
                                            on:click={logout}>LOG OUT</button>
                </section>
            </section>
        </section>
    </section>
{/if}

<style>
    .profile-data > *:not(h2) {
        @apply mb-[1em];
    }
</style>