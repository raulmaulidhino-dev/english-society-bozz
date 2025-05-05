<script lang="ts">

    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import Modal from '$lib/components/modals/Modal.svelte';
    import Notification from '$lib/components/Notification.svelte';

    import { userData } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { goto } from '$app/navigation';

    import { error } from '@sveltejs/kit';

    import { Icon, PencilSquare as EditIcon, User as Profile, Photo, XMark as CloseIcon, ArrowUpTray as UploadIcon, Trash as DeleteIcon } from 'svelte-hero-icons';

    import type { UserProfile } from '$lib/types/user/user';
    import type { ErrorResponse } from '$lib/types/error/error';

    // Props
    interface Props {
        userProfile: UserProfile;
    }

    let { userProfile }: Props = $props();

    // Request Packet
    const profileDataReq: FormData = new FormData();
    profileDataReq.append("full_name", "");
    profileDataReq.append("nickname", "");
    profileDataReq.append("username", "");
    profileDataReq.append("bio", "");

    // Profile Avatar Management
    let fileInput: HTMLInputElement | null = $state(null);
    let originalImage: string | null = $state(null);
    let compressedBlob: Blob | null = $state(null);

    let avatarUrl: string | null = $state(userProfile?.avatar_url ?? null);

    const MAX_SIZE: number = 300 * 1024;

    function openFilePicker() {
        if (fileInput) fileInput.click();
    }

    function handleFileChange(event: Event) {
        errorMsg = null;
        const target = event.target as HTMLInputElement;
        let file: File;
        if (target.files && target.files.length > 0) file = target.files[0];
        else return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            if (e.target) img.src = e.target.result as string;
            else return;

            img.onload = async () => {
                const isSquare = img.width === img.height;
                if (!isSquare) {
                    errorMsg = "Please crop your image into a square image (1:1 ratio) manually before uploading it—Internal image cropper will be added soon!";
                    return;
                }

                if (e.target) originalImage = e.target.result as string;
                else return;

                try {
                    compressedBlob = await compressImage(originalImage);
                } catch (err: unknown) {
                    errorMsg = `Failed to compress your avatar.`;
                }
            };

            img.onerror = () => {
                errorMsg = "Failed to load your avatar."
            };
        };

        reader.readAsDataURL(file);
    }

    async function compressImage(src: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_DIM = 1024;
                let width = img.width;
                let height = img.height;

                if (width > MAX_DIM || height > MAX_DIM) {
                    if (width > height) {
                        height *= MAX_DIM / width;
                        width = MAX_DIM;
                    } else {
                        width *= MAX_DIM / height;
                        height = MAX_DIM;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (ctx) ctx.drawImage(img, 0, 0, width, height);

                const tryCompress = (quality = 0.9) => {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            if (blob.size <= MAX_SIZE || quality <= 0.3) {
                                resolve(blob);
                            } else {
                                tryCompress(quality - 0.1);
                            }
                        }
                    }, 'image/jpeg', quality);
                };

                tryCompress();
            };

            img.onerror = (e) => {
                reject(new Error(`Failed to load your avatar`));
            };
        });
    }

    let showUploadAvatarModal: boolean = $state(false);
    let showAvatarPreview: boolean = $state(false);

    let errorMsg: string | null = $state(null);

    let notificationMessage = $state("");
    let notificationType = $state("");
    let showNotification = $state(false);

    const updateOrInsertNewProfile = async (token: string) => {

        errorMsg = null;

        notificationMessage = "";
        notificationType = "";
        showNotification = false;


        if (!token) {
            goto('/login', { replaceState: true });
        }

        try {
            try {

                profileDataReq.set("full_name", inputs[0].value);
                profileDataReq.set("nickname", inputs[1].value);
                profileDataReq.set("username", inputs[2].value);
                profileDataReq.set("bio", inputs[3].value);
                if (avatarUrl) profileDataReq.append("avatar_url", avatarUrl);

                const res = await axios.put(`${BACKEND_URL}/user/profile`,
                    profileDataReq,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        } 
                    }
                );

                notificationMessage = res.data.message;
                notificationType = "success";
                showNotification = true;

                const timestamp = new Date().getTime();

                setTimeout(() => {
                    goto(`/user/profile?t=${timestamp}`, { replaceState: true });
                }, 3000);

            } catch(err) {
                if (axios.isAxiosError<ErrorResponse>(err)) {
                    errorMsg = err.response?.data?.message || "Unknown error";
                    throw Error(errorMsg);
                } else {
                    notificationMessage = "Unknown error!";
                    notificationType = "error";
                    showNotification = true
                }
            }
            
        } catch (err: unknown) {
            try {

                profileDataReq.set("full_name", inputs[0].value);
                profileDataReq.set("nickname", inputs[1].value);
                profileDataReq.set("username", inputs[2].value);
                profileDataReq.set("bio", inputs[3].value);
                if (profileDataReq.has("avatar_url") && avatarUrl) profileDataReq.set("avatar_url", avatarUrl);
                else if (avatarUrl) profileDataReq.append("avatar_url", avatarUrl);

                const res = await axios.post(`${BACKEND_URL}/user/profile`,
                    profileDataReq,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        } 
                    }
                );

                notificationMessage = res.data.message;
                notificationType = "success";
                showNotification = true;

                const timestamp = new Date().getTime();

                setTimeout(() => {
                    goto(`/user/profile?t=${timestamp}`, { replaceState: true });
                }, 3000);

            } catch (err: unknown) {
                if (axios.isAxiosError<ErrorResponse>(err)) {
                    errorMsg = err.response?.data?.message || "Unknown error!";

                    notificationMessage = errorMsg;
                    notificationType = "error";
                    showNotification = true
                } else if (err instanceof Error) {
                    errorMsg = err.message;

                    notificationMessage = errorMsg;
                    notificationType = "error";
                    showNotification = true
                } else {
                    notificationMessage = "Unknown error!";
                    notificationType = "error";
                    showNotification = true
                }
            }
        }
    };

    let inputs = $state([
        { label: 'Name', id: 'name', type: 'text', placeholder: 'e.g., John D. O\'Connor', value: '', minlength: 3, maxlength: 100, pattern: "^[A-Za-z.,' ]+(?<!'')$", title: "Only letters, spaces, dots (.), commas (,), and single quote (') allowed. Double single-quotes are not allowed.", required: true },
        { label: 'Nickname', id: 'nickname', type: 'text', placeholder: 'e.g., Jojo or O\'Neil', value: '', minlength: 2, maxlength: 10, pattern: "^[A-Za-z.,' ]+(?<!'')$", title: "Only letters, spaces, dots (.), commas (,), and single quote (') allowed. Double single-quotes are not allowed.", required: true },
        { label: 'Username', id: 'username', type: 'text', placeholder: 'e.g., user123 (Just example)', value: '', minlength: 3, maxlength: 20, pattern: "^[a-z0-9._]{3,20}$", title: "Only lowercase letters, numbers, dots (.), and underscores (_).", required: true },
        { label: 'Bio', id: 'bio', type: 'text', placeholder: 'e.g., Enjoys writing, volunteering, and participating in school events.', value: '', minlength: 0, maxlength: 300, required: false },
        { label: 'Email', id: 'email', type: 'email', placeholder: 'you@example.com', value: '', minlength: 6, maxlength: 40, required: true },
    ]);

    if (userProfile) {
        inputs[0].value = userProfile?.full_name ?? "";
        inputs[1].value = userProfile?.nickname ?? "";
        inputs[2].value = userProfile?.username ?? "";
        inputs[3].value = userProfile?.bio ?? "";
    }

    const user = get(userData);
    if (user) inputs[4].value = user.email ?? "";

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        const {
            data: { session }
        } = await db.auth.getSession();
        const token: string | undefined = session?.access_token;

        if (!token) {
            throw error(404, "Not found");
        }

        await updateOrInsertNewProfile(token);
    };

    onMount(async () => {
        const emailInput = document.getElementById("email") as HTMLInputElement | null ;
        if (emailInput) emailInput.disabled = true;

        const uploadButton = document.getElementById("uploadBtn");
        if (uploadButton) {
            uploadButton.addEventListener("click", async () => {
                if (compressedBlob) {
                    profileDataReq.append("avatar", compressedBlob);
                    showUploadAvatarModal = false;
                    showAvatarPreview = true;
                } else errorMsg = "There is no new image attached!";
            });
        }

        const deleteBtn = document.getElementById("deleteBtn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                originalImage = null;
                compressedBlob = null;
                avatarUrl = null;
                profileDataReq.delete("avatar");
                showUploadAvatarModal = false;
                showAvatarPreview = false;
            });
        }
    });

</script>

<section class="bg-slate-200 p-4 md:p-8">
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg pt-10 px-6 flex flex-col justify-center items-start gap-1">
        <section id="pfp_container" role="button" onclick={() => showUploadAvatarModal = true} onkeydown={(e) => { if (e.key === 'u' || e.key === 'U') showUploadAvatarModal = true }} tabindex="0" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
            <div id="pfp" class={`text-white w-full h-full bg-primary rounded-[50%] ${ avatarUrl || originalImage ? "" : "p-4" } flex justify-center items-center opacity-25`}>
                {#if originalImage && showAvatarPreview}
                    <img src={originalImage} alt={`${userProfile?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
                {:else if avatarUrl}
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
                        <input id={input.id} name={input.id} type={input.type} placeholder={input.placeholder} bind:value={input.value} minlength={input.minlength} maxlength={input.maxlength} pattern={input.pattern || undefined} title={input.title || undefined} required={input.required} aria-required={input.required} autocomplete="off" class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
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
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}

<Modal show={showUploadAvatarModal}>
    {#snippet children()}
        <div class="mb-4 flex items-center gap-4">
            <h2 class="text-xl font-semibold">Upload an Image</h2>
            <button onclick={() => showUploadAvatarModal = false} class="justify-end ml-auto">
                <Icon src={CloseIcon} size="27" />
            </button>
        </div>

        <button onclick={openFilePicker} class={`text-gray-300 w-full aspect-square h-auto bg-white border-2 border-gray-300 rounded-lg mx-auto flex justify-center items-center`}>
            {#if originalImage}
                <img src={originalImage} alt={`${userProfile?.nickname || "User"}'s Avatar`} class="mx-auto w-full rounded-[6px]" />
            {:else if avatarUrl}
                <img src={avatarUrl} alt={`${userProfile?.nickname || "User"}'s Avatar`} class="mx-auto w-full rounded-[6px]" />
            {:else}
                <Icon src={Photo} solid size="56" />
            {/if}
        </button>
                    
        <input type="file" accept="image/*" bind:this={fileInput} onchange={handleFileChange} class="hidden" />
        <small class="text-xs text-slate-400 text-center mb-[1.5em]">Please choose an image with ratio 1:1</small>
        <p class="text-sm text-primary font-semibold mb-[1.5em]">Tap the image to add or change your avatar</p>
        <p role="alert" class={`text-red-500 mb-[1.5em] ${ errorMsg ? "" : "hidden" }`}>{errorMsg ?? ""}</p>

        <div class="flex justify-stretch items-stretch gap-2">
            <button id="uploadBtn" class="grow text-white text-xs font-bold bg-primary border-2 border-primary hover:text-primary hover:bg-secondary p-2 rounded-full flex justify-center items-center gap-2">
                <Icon src={UploadIcon} mini size="18" />
                <span>UPLOAD</span>
            </button>
            <button id="deleteBtn" class={`grow text-white text-xs font-bold bg-red-700 border-2 border-red-700 hover:bg-red-900 p-2 rounded-full flex justify-center items-center gap-2 ${ originalImage || avatarUrl ? "" : "hidden" }`}>
                <Icon src={DeleteIcon} mini size="18" class="text-white" />
                <span>DELETE</span>
            </button>
        </div>
    {/snippet}
</Modal>
