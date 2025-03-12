<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { accessToken, refreshAccessToken } from "../../stores/auth.js";

    let user = null;
    let error = null;
    let isLoading = true;

    let token = $accessToken;

    const fetchProtectedData = async () => {
        const refreshTokenID = localStorage.getItem("RTID");

        isLoading = true;
        error = null;

        try {
            if (token === null) {
                await refreshAccessToken(refreshTokenID);
                token = $accessToken;
            };

            const res = await axios.get("https://esbozz-api.vercel.app/api/auth/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            user = res.data;
        } catch (err) {
            error = err.response?.data?.message || err;
        } finally {
            isLoading = false;
        }
    }

    onMount(fetchProtectedData);

    const logout = async () => {
        accessToken.set(null);
        localStorage.removeItem("RTID");

        window.location.href = '/';

        user = null;
        error = null;
    }
</script>

<section class="px-6 py-[3rem]">
{#if isLoading}
    <p>Loading...</p>
{:else if error}
    <p style="color: red;">{error}</p>
{:else if user}
    <h2 class="text-3xl sm:text-3xl md:text-4xl font-bold mb-[0.5em] break-words">Welcome back, <span class="text-primary font-extrabold">{user.username}</span>!</h2>
    <button class="bg-red-500 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-md" on:click={logout}>LOGOUT</button>
{/if}
</section>