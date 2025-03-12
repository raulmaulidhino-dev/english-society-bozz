<script>
    import logo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import logo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';

    import axios from "axios";
    import { accessToken } from "../../stores/auth.js";

    import Notification from '../Notification.svelte';

    let emailOrUsername = "";
    let password = "";
    let error = null;
    let isLoading = false;

    let showNotification = false;
    let notificationMessage = "";
    let notificationType = "success";

    function validate() {
        if (emailOrUsername === "" || password === "") {
            error = "Please enter your email and password to continue.";
            return false;
        }

        if (password.length < 8) {
            error = "Password must be at least 8 characters long.";
            return false;
        }

        error = "";
        return true;
    }

    async function login(event) {

        event.preventDefault();
        event.stopPropagation();

        if (!validate()) return;

        isLoading = true;
        error = null;

        try {
            const res = await axios.post("https://esbozz-api.vercel.app/api/auth/login", {
                emailOrUsername,
                password
            });

            accessToken.set(res.data.accessToken);
            localStorage.setItem("RTID", res.data.refreshTokenID);

            notificationMessage = res.data.message;
            notificationType = "success";
            showNotification = true;

            window.location.href = '/dashboard';

        } catch (err) {
            error = err.response?.data?.message || err;

            notificationMessage = error;
            notificationType = "error";
            showNotification = true;

        } finally {
            isLoading = false;
        }

        setTimeout(() => {
            showNotification = false;
        }, 5000);
    }
    
</script>

<section class="bg-secondary px-6 py-[3rem] flex flex-col justify-center items-center">
    <h2 class="text-3xl sm:text-3xl md:text-4xl font-bold mb-[0.5em]">Login into <span class="font-extrabold">Your Beloved Account</span></h2>
    <section class="p-4">
        <form class="bg-white p-8 rounded-xl">
            <picture>
                <source type="image/webp" srcset={logo} />
                <img src={logo_fallback} alt="English Society-Bozz logo" class="w-1/2 max-w-xs mx-auto my-4" />
            </picture>

            <label for="email">Email/Username :</label>
            <input type="email" id="email" bind:value={emailOrUsername} placeholder="johndoe" />
            
            <br />
            
            <label for="password">Password :</label>
            <input type="password" id="password" bind:value={password} placeholder="secretPassword123" />
            
            <br />
            {#if error}
                <p class="text-red-600 mb-3">{error}</p>
            {/if}
            
            <button on:click={login} disabled={isLoading} class="text-white font-extrabold bg-primary w-full p-[0.625rem] rounded-full">
                {#if isLoading}
                    Loading...
                {:else}
                    LOGIN
                {/if}
            </button>
        </form>    
    </section>

    {#if showNotification}
        <Notification message={notificationMessage} type={notificationType} duration={5000} />
    {/if}
</section>

<style>
    form input {
        @apply w-full p-[0.625rem] mb-4 border-[#ccc] border-[1px] rounded-md;
    }

    form input:focus {
        @apply outline-primary bg-slate-50;
    }
</style>