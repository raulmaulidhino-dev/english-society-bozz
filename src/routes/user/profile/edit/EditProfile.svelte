<script>

    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import Notification from '$lib/components/Notification.svelte';

    import { userData } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation'

    import { Icon, PencilSquare as EditIcon, User as Profile } from 'svelte-hero-icons';
    let { userProfile } = $props();

    let avatarUrl = $state();
    if (userProfile.new_avatar_url) avatarUrl = userProfile.new_avatar_url;
    else if (userProfile.avatar_url) avatarUrl = userProfile.avatar_url;
    else avatarUrl = null;

    let errorMsg = null;

    let notificationMessage = $state("");
    let notificationType = $state("");
    let showNotification = $state(false);

    const updateOrInsertNewProfile = async (token) => {

        errorMsg = null;

        notificationMessage = "";
        notificationType = "";
        showNotification = false;


        if (!token) {
            goto('/login', { replaceState: true });
        }

        try {
            try {

                const res = await axios.put(`${BACKEND_URL}/user/profile`, {
                        full_name: document.getElementById('name').value,
                        nickname: document.getElementById('nickname').value,
                        username: document.getElementById('username').value,
                        bio: document.getElementById('bio').value,
                        avatar_url: avatarUrl,
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                notificationMessage = res.data.message;
                notificationType = "success";
                showNotification = true;

                setTimeout(() => {
                    goto("/user/profile", { replaceState: true });
                }, 3000);

            } catch(err) {
                errorMsg = err.response?.data?.message || err;

                throw Error(
                    errorMsg
                );
            }
            
        } catch (err) {
            try {

                const res = await axios.post(`${BACKEND_URL}/user/profile`, {
                        full_name: document.getElementById('name').value,
                        nickname: document.getElementById('nickname').value,
                        username: document.getElementById('username').value,
                        bio: document.getElementById('bio').value,
                        avatar_url: avatarUrl,
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                notificationMessage = res.data.message;
                notificationType = "success";
                showNotification = true;

                setTimeout(() => {
                    goto("/user/profile", { replaceState: true });
                }, 3000);

            } catch(err) {
                errorMsg = err.response?.data?.message || "Unknown Error";

                notificationMessage = errorMsg;
                notificationType = "error";
                showNotification = true;

            }
        }
    };

    let inputs = $state([
        { label: 'Name', id: 'name', type: 'text', placeholder: 'e.g., John D. O\'Connor', value: '', minlength: '3', maxlength: '100', pattern: "^[A-Za-z.,' ]+(?<!'')$", title: "Only letters, spaces, dots (.), commas (,), and single quote (') allowed. Double single-quotes are not allowed.", required: true },
        { label: 'Nickname', id: 'nickname', type: 'text', placeholder: 'e.g., Jojo or O\'Neil', value: '', minlength: '2', maxlength: '10', pattern: "^[A-Za-z.,' ]+(?<!'')$", title: "Only letters, spaces, dots (.), commas (,), and single quote (') allowed. Double single-quotes are not allowed.", required: true },
        { label: 'Username', id: 'username', type: 'text', placeholder: 'e.g., user123 (Just example)', value: '', minlength: '3', maxlength: '20', pattern: "^[a-z0-9._]{3,20}$", title: "Only lowercase letters, numbers, dots (.), and underscores (_).", required: true },
        { label: 'Bio', id: 'bio', type: 'text', placeholder: 'e.g., Enjoys writing, volunteering, and participating in school events.', value: '', minlength: '0', maxlength: '300', required: false },
        { label: 'Email', id: 'email', type: 'email', placeholder: 'you@example.com', value: '', minlength: '6', maxlength: '40', required: true },
    ]);

    if (userProfile) {
        inputs[0].value = userProfile?.full_name ?? "";
        inputs[1].value = userProfile?.nickname ?? "";
        inputs[2].value = userProfile?.username ?? "";
        inputs[3].value = userProfile?.bio ?? "";
    }

    const user = get(userData);
    if (user) inputs[4].value = user.email ?? "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            data: { session }
        } = await db.auth.getSession();
        const token = session?.access_token;
        
        await updateOrInsertNewProfile(token);
    };

    const goToEditAvatar = () => goto(`/user/profile/edit/edit-avatar${ userProfile?.avatar_url ? `?avatarUrl=${encodeURIComponent(userProfile.avatar_url)}` : "" }`);

    onMount( async () => {
        const emailInput = document.getElementById("email");
        emailInput.disabled = true;
    });

</script>

<section class="bg-slate-200 p-4 md:p-8">
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg pt-10 px-6 flex flex-col justify-center items-start gap-1">
        <section id="pfp_container" role="button" onclick={goToEditAvatar} onkeydown={(e) => (e.key === 'u' || e.key === 'U') && goToEditAvatar()} tabindex="0" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
            <div id="pfp" class={`text-white w-full h-full bg-primary rounded-[50%] ${ avatarUrl ? "" : "p-4" } flex justify-center items-center opacity-25`}>
                {#if avatarUrl}
                    <img src={avatarUrl} alt={`${userProfile?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
                {:else}
                    <Icon src={Profile} solid size="72" />
                {/if}
            </div>
            <div id="cam_icon"><Icon src={EditIcon} size="36" class="text-secondary absolute inset-0 m-auto" /></div>
        </section>
        <form onsubmit={handleSubmit} class="w-full max-w-lg mx-auto flex flex-col gap-6">
            {#each inputs as input}
                <section class="w-full">
                    <label for={input.id} class="text-[12px] font-semibold text-primary block mb-2">{input.label} <span class="text-slate-400">({input.minlength}&ndash;{input.maxlength} characters)<span class="text-red-500">{ input.required ? "*" : "" }</span></span></label>
                    {#if input.id === "bio"}
                        <textarea id={input.id} name={input.id} placeholder={input.placeholder} rows="4" cols="50" bind:value={input.value} maxlength={input.maxlength} required={input.required} aria-required={input.required} autocomplete="off" class="text-md w-full border-[1px] rounded-lg p-4 focus:border-primary focus:outline-none disabled:text-slate-400 resize-none"></textarea>
                        <div aria-live="polite" aria-atomic="true" class="text-sm bg-slate-200 w-fit rounded-full py-1 px-3 ml-auto"><span class={`${ input.value.length > input.maxlength ? "text-red-500" : input.value.length === input.maxlength ? "text-primary" : "" }`}>{input.value.length}</span> / {input.maxlength}</div>
                    {:else}
                        <input id={input.id} name={input.id} type={input.type} placeholder={input.placeholder} value={input.value} minlength={input.minlength} maxlength={input.maxlength} pattern={input.pattern || undefined} title={input.title || undefined} required={input.required} aria-required={input.required} autocomplete="off" class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        <small class={`${input.title ? "text-[9px] text-slate-400" : "hidden"}`}>{input.title ?? ""}</small>
                    {/if}
                </section>
            {/each}
                <button id="save_profile_btn" type="submit" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full my-8 self-center
                hover:text-primary hover:bg-secondary">SAVE PROFILE</button>
        </form>
    </section>
</section>

{#if showNotification}
    <Notification bind:message={notificationMessage} bind:type={notificationType} duration={5000} />
{/if}