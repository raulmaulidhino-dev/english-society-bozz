<script>
    import { db } from '$lib/supabase';
    import { goto } from '$app/navigation';

    import { isLoading } from '$lib/stores/loading';

    import Notification from '../Notification.svelte';
    import {Icon, Eye, EyeSlash} from 'svelte-hero-icons';

    let email = $state("");
    let password = $state("");
    let errorMsg = $state(null);
    
    let passwordInput = $state();
    let showPassword = $state(false);

    let showNotification = $state(false);
    let notificationMessage = $state("");
    let notificationType = $state("success");

    function togglePassword() {
        showPassword = !showPassword;
        passwordInput.type = showPassword? "text" : "password";
    }

    function validate() {
        if (email === "" || password === "") {
            errorMsg = "Please enter your email and password to continue.";
            return false;
        }

        if (password.length < 8) {
            errorMsg = "Password must be at least 8 characters long.";
            return false;
        }

        errorMsg = "";
        return true;
    }

    async function login(event) {

        event.preventDefault();
        event.stopPropagation();

        if (!validate()) return;

        const { data, error } = await db.auth.signInWithPassword({
            email: email,
            password
        });

        if (error) {
            if (error.code === "invalid_credentials") errorMsg = "Invalid credentials. Please double check your email and password.";
            else errorMsg = "Something went wrong.";

            notificationMessage = "Login failed!";
            notificationType = "error";
            showNotification = true;
            return;
        }

        notificationMessage = "Login successful!";
        notificationType = "success";
        showNotification = true;

        goto('/user/profile', { replaceState: true });

    }
    
</script>

<section class="bg-secondary bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] px-6 py-[3rem] flex flex-col justify-center items-center">
    <section class="p-4">
        <form onsubmit={login} class="bg-white max-w-80 p-8 rounded-[32px] shadow-xl">
            <h2 class="text-2xl md:text-3xl text-center font-bold mb-[1em]">Welcome Back!</h2>
            <label for="email">Email :</label>
            <input id="email" name="email" type="email" bind:value={email} placeholder="you@example.com" autocomplete="email" required aria-required="true" />
            
            <br />
            
            <label for="password">Password :</label>
            <div class="flex gap-2">
                <input type="password" id="password" bind:this={passwordInput} bind:value={password} placeholder="•••••••• (no peeking)" autocomplete="current-password" required aria-required="true" />
                <button type="button" class="text-sm text-primary p-[0.625rem] mb-4 border-secondary border-[1px] rounded-2xl" onclick={togglePassword}><Icon src={showPassword ? Eye : EyeSlash} size=18></Icon></button>
            </div>
            
            <br />
            {#if errorMsg}
                <p role="alert" class="text-red-600 mb-3 text-sm">{errorMsg}</p>
            {/if}
            
            <button type="submit" disabled={false} class="text-white font-extrabold bg-primary w-full p-[0.625rem] rounded-full">
                {#if $isLoading}
                    <svg class="w-5 h-5 mr-1 animate-spin text-secondary inline" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white"></circle>
                        <path class="opacity-75" d="M4 12a8 8 0 019-8" stroke="currentColor"></path>                    
                    </svg>
                    Loading...
                {:else}
                    LOG IN
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
        @apply text-sm w-full p-[0.625rem] mb-4 border-[#ccc] border-[1px] rounded-2xl;
    }

    form input:focus {
        @apply outline-primary bg-slate-50;
    }

    form label {
        @apply text-sm;
    }
</style>