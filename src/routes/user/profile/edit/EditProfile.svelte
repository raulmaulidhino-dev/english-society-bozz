<script>
    import { onMount, afterUpdate } from 'svelte';
    import { accessToken, refreshAccessToken } from "../../../../stores/auth.js";

    import { Icon, Camera, User as Profile } from 'svelte-hero-icons';
    import LoadingSpinner from './../../../loading/LoadingSpinner.svelte';

    import axios from 'axios';

    let user = null;
    let userProfile = null;
    let error = null;
    let isLoading = true;
    let token = $accessToken;

    const fetchUser = async (refreshTokenID) => {
        error = null;

        try {
            if (token === null) {
                await refreshAccessToken(refreshTokenID);
                token = $accessToken;
            };

            const res = await axios.get("https://esbozz-api.vercel.app/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            user = res.data;
        } catch (err) {
            error = err.response?.data?.message || err;            
        }
    };

    const fetchUserProfile = async (refreshTokenID) => {
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
        }
    };

    const updateOrInsertNewProfile = async (refreshTokenID) => {
        try {
            try {
                if (token === null) {
                    await refreshAccessToken(refreshTokenID);
                    token = $accessToken;
                };

                const res = await axios.put('https://esbozz-api.vercel.app/api/user/profile', {
                        full_name: document.getElementById('name').value,
                        nickname: document.getElementById('nickname').value,
                        username: document.getElementById('username').value,
                        bio: document.getElementById('bio').value,
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                window.location.href = '/user/profile';
                
            } catch(err) {
                error = err.response?.data?.message || err;

                throw Error(
                    error
                );
            }
            
        } catch (err) {
            try {
                if (token === null) {
                    await refreshAccessToken(refreshTokenID);
                    token = $accessToken;
                }

                const res = await axios.post('https://esbozz-api.vercel.app/api/user/profile', {
                        full_name: document.getElementById('name').value,
                        nickname: document.getElementById('nickname').value,
                        username: document.getElementById('username').value,
                        bio: document.getElementById('bio').value,
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                window.location.href = '/user/profile';

            } catch(err) {
                error = err.response?.data?.message || err;
            }
        }
    };

    const logout = async () => {
        accessToken.set(null);
        localStorage.removeItem("RTID");

        window.location.href = '/';

        userProfile = null;
        error = null;
        token = null;
    };

    let inputs = [
        { label: 'Name', id: 'name', type: 'text', placeholder: 'John Doe', value: '', min: '3', max: '100' },
        { label: 'Nickname', id: 'nickname', type: 'text', placeholder: 'John', value: '', min: '2', max: '10' },
        { label: 'Username', id: 'username', type: 'text', placeholder: 'johndoe', value: '', min: '2', max: '20' },
        { label: 'Bio', id: 'bio', type: 'text', placeholder: 'Enjoys writing, volunteering, and participating in school events.', value: '', min: '0', max: '300' },
        { label: 'Email', id: 'email', type: 'email', placeholder: 'johndoe@example.com', value: '', min: '6', max: '40' },
    ];

    onMount( async () => {
        try {
            const refreshTokenID = localStorage.getItem("RTID");
            await fetchUser(refreshTokenID);
            await fetchUserProfile(refreshTokenID);

            if (user) {
                inputs[2].value = user.username;
                inputs[4].value = user.email;
            }

            if (userProfile) {
                inputs[0].value = userProfile.full_name;
                inputs[1].value = userProfile.nickname;
                inputs[3].value = userProfile.bio;
            }

            const saveProfileBtn = document.getElementById("save_profile_btn");
            const emailInput = document.getElementById("email");

            saveProfileBtn.addEventListener("click", () => {
                isLoading = true;
                updateOrInsertNewProfile(refreshTokenID);
                isLoading= false;
            });

            emailInput.disabled = true;
        } catch (err) {
            console.error(err);
        }
    });

    afterUpdate(() => {
        isLoading = false;
    });

</script>

{#if isLoading}
    <LoadingSpinner />
{:else}
    <section class="bg-slate-200 p-4 md:p-8">
        <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg pt-10 px-6 flex flex-col justify-center items-start gap-1">
            <section id="pfp_container" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
                <div id="pfp" class="text-white w-full h-full bg-primary rounded-[50%] p-2 flex justify-center items-center opacity-25">
                    <Icon src={Profile} solid size="72" />
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
            {error || "Error"}
            <button id="save_profile_btn" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full my-8 self-center
                                        hover:text-primary hover:bg-secondary">SAVE PROFILE</button>
        </section>
    </section>
{/if}
