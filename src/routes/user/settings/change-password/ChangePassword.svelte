<script lang="ts">
    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';
    import { goto } from '$app/navigation';

    import { error, isHttpError, isRedirect } from '@sveltejs/kit';

    import Notification from '$lib/components/Notification.svelte';
    import {Icon, Eye, EyeSlash} from 'svelte-hero-icons';

    import type { ErrorResponse } from '$lib/types/error/error';

    interface PasswordObj {
        inputRef: HTMLInputElement | null;
        content: string;
        isShowed: boolean;
    }

    let oldPasswordObj: PasswordObj = $state({
        inputRef: null,
        content: "",
        isShowed: false
    });

    let newPasswordObj: PasswordObj = $state({
        inputRef: null,
        content: "",
        isShowed: false
    });

    function togglePassword(passwordObj: PasswordObj) {
        if (passwordObj.inputRef) {
            passwordObj.isShowed = !passwordObj.isShowed;
            passwordObj.inputRef.type = passwordObj.isShowed ? "text" : "password";
        }
    }

    let errorMsg: string | null = $state(null);

    let notificationMessage: string = $state("");
    let notificationType: string = $state("");
    let showNotification: boolean = $state(false);

    const handleChangePassword = async () => {
        
        errorMsg = null;

        notificationMessage = "";
        notificationType = "";
        showNotification = false;

        const {
            data: { session }
        } = await db.auth.getSession();

        const token = session?.access_token;

        try {
            const res = await axios.post(`${BACKEND_URL}/auth/change-password`, {
                oldPassword: oldPasswordObj.content,
                newPassword: newPasswordObj.content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(res);

            const { data, error } = await db.auth.signInWithPassword({
                email: session?.user?.email ?? "",
                password: newPasswordObj.content
            });

            notificationMessage = res?.data?.message;
            notificationType = "success";
            showNotification = true;

            setTimeout(() => {
                goto("/user/profile", { replaceState: true });
            }, 3000);

        } catch (err: unknown) {
            if (axios.isAxiosError<ErrorResponse>(err)) {

                errorMsg = err?.response?.data?.message || "Unknown Error";

                notificationMessage = errorMsg;
                notificationType = "error";
                showNotification = true;
            } else if (isRedirect(err) || isHttpError(err)) {
                throw err;
            } else {
                throw error(500, "Unexpected error");
            }
        }

    }

</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white p-4 max-w-xl rounded-2xl mx-auto shadow-lg">
        <h1 class="text-3xl text-center sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Change Your Password</h1>
        <form onsubmit={handleChangePassword} class="p-4">
            <label for="old_password">Old Password :</label>
            <div class="flex gap-2">
                <input type="password" id="old_password" name="old_password" bind:this={oldPasswordObj.inputRef} bind:value={oldPasswordObj.content} placeholder="•••••••• (old password)" autocomplete="off" required aria-required="true" />
                <button type="button" class="text-sm text-primary p-[0.625rem] mb-4 border-secondary border-[1px] rounded-2xl" onclick={() => togglePassword(oldPasswordObj)}><Icon src={oldPasswordObj.isShowed ? Eye : EyeSlash} size=18></Icon></button>
            </div>
            <label for="new_password">New Password :</label>
            <div class="flex gap-2">
                <input type="password" id="new_password" name="new_password" bind:this={newPasswordObj.inputRef} bind:value={newPasswordObj.content} placeholder="•••••••• (new password)" autocomplete="off" required aria-required="true" />
                <button type="button" class="text-sm text-primary p-[0.625rem] mb-4 border-secondary border-[1px] rounded-2xl" onclick={() => togglePassword(newPasswordObj)}><Icon src={newPasswordObj.isShowed ? Eye : EyeSlash} size=18></Icon></button>
            </div>
            {#if errorMsg}
                <p class="text-red-500 mb-4">{errorMsg}</p>
            {/if}
            <button type="submit" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">CHANGE PASSWORD</button>
        </form>
    </section>
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}

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