<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let user = null;
    let error = null;
    let isLoading = true;

    onMount(async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) throw new Error("Token not found, please login first.");

            const response = await axios.get("https://esbozz-api.vercel.app/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            user = response.data;
            
        } catch (err) {
            error = err.response?.data?.message || "Failed to fetch data.";
        } finally {
            isLoading = false;
        }
    });

    const logout = async () => {
        localStorage.removeItem("token");

        await goto("/login");

        user = null;
        error = null;
    }
</script>

<section class="px-6 py-[3rem]">
{#if isLoading}
    <p>Loading...</p>
{:else if error}
    <p style="color: red;">Error: {error}</p>
{:else if user}
    <h2 class="text-3xl sm:text-3xl md:text-4xl font-bold mb-[0.5em] break-words">Welcome back, <span class="text-primary font-extrabold">{user.email}</span>!</h2>
    <button class="bg-red-500 hover:bg-red-700 text-white font-extrabold py-2 px-4 rounded-md" on:click={logout}>LOGOUT</button>
{/if}
</section>