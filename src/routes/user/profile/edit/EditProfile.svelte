<script>
    import defaultPFP from '$lib/images/defaults/default_pfp.svg';

    import { Icon, Camera } from 'svelte-hero-icons';
    import { onMount } from 'svelte';
    import { accessToken, refreshAccessToken } from "../../../../stores/auth.js";

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
                        username: document.getElementById('username').value
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                window.location.href = '/user/profile';
                
            } catch(error) {
                error = err.response?.data?.message || err;

                if (err.response?.status === 401) {
                    logout();
                }
            }
            
        } catch (error) {
            try {
                if (token === null) {
                    await refreshAccessToken(refreshTokenID);
                    token = $accessToken;
                };

                const res = await axios.post('https://esbozz-api.vercel.app/api/user/profile', {
                        full_name: document.getElementById('name').value,
                        nickname: document.getElementById('nickname').value,
                        username: document.getElementById('username').value
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );

                window.location.href = '/user/profile';
            } catch(error) {
                error = err.response?.data?.message || err;

                if (err.response?.status === 401) {
                    logout();
                }
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
        { label: 'Email', id: 'email', type: 'email', placeholder: 'johndoe@example.com', value: '', min: '6', max: '40' },
    ];

    onMount( async () => {
        isLoading = true;

        const refreshTokenID = localStorage.getItem("RTID");
        await fetchUser(refreshTokenID);
        await fetchUserProfile(refreshTokenID);

        if (user) {
            inputs[2].value = user.username;
            inputs[3].value = user.email;
        }

        if (userProfile) {
            inputs[0].value = userProfile.full_name;
            inputs[1].value = userProfile.nickname;
        }

        isLoading = false;

        document.getElementById("save_profile_btn").addEventListener("click", () => {
            updateOrInsertNewProfile(refreshTokenID);
        });

        document.getElementById("email").disabled = true;

        const PFPContainer = document.getElementById("pfp_container");
        const pfp = document.getElementById("pfp");
        const camIcon = document.getElementById("cam_icon");

        PFPContainer.addEventListener("mouseenter", () => {
            pfp.className = "h-full aspect-inherit rounded-inherit filter mix-blend-multiply opacity-50";
            camIcon.className = "visible";
        });

        PFPContainer.addEventListener("mouseleave", () => {
            pfp.className = "h-full aspect-inherit rounded-inherit";
            camIcon.className = "invisible";
        });
    });

</script>

<section class="{isLoading ? 'hidden' : ''} bg-slate-200 p-4 md:p-8">
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg pt-10 px-6 flex flex-col justify-center items-start gap-1">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <section id="pfp_container" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
            <img id="pfp" src={defaultPFP}
                alt="User Photo Profile"
            />
            <div id="cam_icon"><Icon src={Camera} size="36" class="text-secondary absolute inset-0 m-auto" /></div>
        </section>
        <section class="w-full max-w-lg mx-auto flex flex-col gap-6">
            {#each inputs as input}
                <section class="w-full">
                    <label for={input.id} class="text-[12px] font-semibold text-primary block mb-2">{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} id={input.id} value={input.value} min={input.min} max={input.max} class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                </section>
            {/each}
        </section>
        <button id="save_profile_btn" class="text-sm text-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full my-8 self-center
                                    hover:bg-secondary">SAVE PROFILE</button>
    </section>
</section>
