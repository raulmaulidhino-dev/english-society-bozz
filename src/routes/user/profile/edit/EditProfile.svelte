<script>
    export let userProfile;

    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import { userData } from '$lib/stores/auth';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'

    import { Icon, Camera, User as Profile } from 'svelte-hero-icons';

    let avatarUrl;
    if (userProfile.new_avatar_url) avatarUrl = userProfile.new_avatar_url;
    else avatarUrl = userProfile.avatar_url;

    let errorMsg = null;

    const updateOrInsertNewProfile = async (token) => {

        if (!token) {
            goto('/login');
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

                goto('/user/profile');
                
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

                goto('/user/profile');

            } catch(err) {
                errorMsg = err.response?.data?.message || err;
            }
        }
    };

    let inputs = [
        { label: 'Name', id: 'name', type: 'text', placeholder: 'John Doe', value: '', min: '3', max: '100' },
        { label: 'Nickname', id: 'nickname', type: 'text', placeholder: 'John', value: '', min: '2', max: '10' },
        { label: 'Username', id: 'username', type: 'text', placeholder: 'johndoe', value: '', min: '2', max: '20' },
        { label: 'Bio', id: 'bio', type: 'text', placeholder: 'Enjoys writing, volunteering, and participating in school events.', value: '', min: '0', max: '300' },
        { label: 'Email', id: 'email', type: 'email', placeholder: 'johndoe@example.com', value: '', min: '6', max: '40' },
    ];

    if (userProfile) {
        inputs[0].value = userProfile?.full_name ?? "";
        inputs[1].value = userProfile?.nickname ?? "";
        inputs[2].value = userProfile?.username ?? "";
        inputs[3].value = userProfile?.bio ?? "";
        inputs[4].value = $userData.email ?? "";
    }

    const goToUploadAvatar = () => goto('/user/profile/edit/upload-avatar');

    onMount( async () => {
        try {
            const saveProfileBtn = document.getElementById("save_profile_btn");
            const emailInput = document.getElementById("email");
            emailInput.disabled = true;

            saveProfileBtn.addEventListener("click", async () => {
                const {
                    data: { session }
                } = await db.auth.getSession();

                const token = session?.access_token;

                await updateOrInsertNewProfile(token);
            });

        } catch (err) {
            console.error(err);
        }
    });

</script>

<section class="bg-slate-200 p-4 md:p-8">
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg pt-10 px-6 flex flex-col justify-center items-start gap-1">
        <section id="pfp_container" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
            <div id="pfp" role="button" on:click={goToUploadAvatar} on:keydown={(e) => (e.key === 'u' || e.key === 'U') && goToUploadAvatar()} tabindex="0" class={`text-white w-full h-full bg-primary rounded-[50%] ${ avatarUrl ? "" : "p-4" } flex justify-center items-center opacity-25`}>
                {#if avatarUrl}
                    <img src={avatarUrl} alt={`${userProfile?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
                {:else}
                    <Icon src={Profile} solid size="72" />
                {/if}
            </div>
            <div id="cam_icon"><Icon src={Camera} solid size="36" class="text-secondary absolute inset-0 m-auto" /></div>
        </section>
        <section class="w-full max-w-lg mx-auto flex flex-col gap-6">
            {#each inputs as input}
                <section class="w-full">
                    <label for={input.id} class="text-[12px] font-semibold text-primary block mb-2">{input.label}</label>
                    {#if input.id === "bio"}
                        <textarea id={input.id} placeholder={input.placeholder} rows="4" cols="50" value={input.value} maxlength={input.max} class="text-md w-full border-[1px] rounded-lg p-4 focus:border-primary focus:outline-none disabled:text-slate-400 resize-none"></textarea>
                    {:else}
                        <input type={input.type} placeholder={input.placeholder} id={input.id} value={input.value} min={input.min} max={input.max} class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                    {/if}
                </section>
            {/each}
        </section>
        <button id="save_profile_btn" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full my-8 self-center
                                    hover:text-primary hover:bg-secondary">SAVE PROFILE</button>
    </section>
</section>
