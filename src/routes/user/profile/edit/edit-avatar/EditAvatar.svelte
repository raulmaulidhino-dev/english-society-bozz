<script>

    import axios from "axios";
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import Notification from '$lib/components/Notification.svelte';

    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    import { Icon, User as Profile } from 'svelte-hero-icons';
    let { avatarUrl = $bindable() } = $props();

    let fileInput = $state();
    let originalImage = $state(null);
    let compressedBlob = null;
    let publicAvatarUrl = "";
    let errorMsg = $state("");

    let notificationMessage = $state("");
    let notificationType = $state("");
    let showNotification = $state(false);

    const MAX_SIZE = 300 * 1024;

    function openFilePicker() {
        fileInput.click();
    }

    function handleFileChange(event) {
        errorMsg = "";
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = async () => {
                const isSquare = img.width === img.height;
                if (!isSquare) {
                    errorMsg = "Please crop your image into a square image (1:1 ratio) manually before uploading it—Internal image cropper will be added soon!";
                    return;
                }

                originalImage = e.target.result;

                try {
                    compressedBlob = await compressImage(originalImage);
                } catch (err) {
                    errorMsg = `Failed to compress your avatar.`;
                }
            };

            img.onerror = () => {
                errorMsg = "Failed to load your avatar."
            };
        };

        reader.readAsDataURL(file);
    }

    async function compressImage(src) {
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
                ctx.drawImage(img, 0, 0, width, height);

                const tryCompress = (quality = 0.9) => {
                    canvas.toBlob((blob) => {
                        if (blob.size <= MAX_SIZE || quality <= 0.3) {
                            resolve(blob);
                        } else {
                            tryCompress(quality - 0.1);
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

    async function uploadAvatar(token) {
        if (!compressedBlob) return;

        const formData = new FormData();
        formData.append("avatar", compressedBlob);

        try {
            const res = await axios.post(`${BACKEND_URL}/user/profile/edit-avatar`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            publicAvatarUrl = res.data.avatar_url;
            const timestamp = new Date().getTime();

            notificationMessage = res.data.message;
            notificationType = "success";
            showNotification = true;

            setTimeout(() => {
                goto(`/user/profile/edit?newAvatarUrl=${encodeURIComponent(publicAvatarUrl)}?t=${timestamp}`);
            }, 3000);

        } catch (error) {
            errorMsg = error.response?.data?.message || "Unknown error.";
        }

    }

    async function deletePublicAvatar(token) {
        try {
            const res = await axios.delete(`${BACKEND_URL}/user/profile/edit-avatar`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            notificationMessage = res.data.message;
            notificationType = "success";
            showNotification = true;
            
        } catch (error) {
            errorMsg = error.response?.data?.message || "Unknown Error.";
        }
    }   

    async function deleteAvatar() {
        const {
            data: { session }
        } = await db.auth.getSession();

        const token = session?.access_token;

        await deletePublicAvatar(token);

        originalImage = null;
        compressedBlob = null;
        avatarUrl = null;

        const timestamp = new Date().getTime();
        
        setTimeout(() => {
            goto(`/user/profile/edit?t=${timestamp}`);
        }, 3000);
    }

    onMount(async () => {
        document.getElementById("uploadBtn").addEventListener("click", async () => {
            const {
                data: { session }
            } = await db.auth.getSession();

            const token = session?.access_token;

            await uploadAvatar(token);
        });
    });

</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white pt-8 pb-4 px-4 max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col gap-4">
        <h1 class="text-2xl md:text-3xl text-center font-bold mb-[0.5em]">Edit Your Avatar</h1>
        <div class={`text-white w-[85%] max-w-48 aspect-square h-auto bg-primary border-4 border-secondary rounded-[50%] ${ originalImage || avatarUrl ? "" : "p-4" } mx-auto flex justify-center items-center`}>
            {#if originalImage || avatarUrl}
                <img src={originalImage ? originalImage : avatarUrl} alt="Avatar" class="mx-auto w-full rounded-full" />
            {:else}
                <Icon src={Profile} solid size="72" />
            {/if}
        </div>
        
        <input type="file" accept="image/*" bind:this={fileInput} onchange={handleFileChange} class="hidden" />
        <small class="text-sm text-slate-400 text-center">Please choose a square (1 : 1) image.</small>
        <p role="alert" class="text-red-500">{errorMsg}</p>
        <section class="w-full flex flex-wrap gap-2">
            <button onclick={openFilePicker} class="text-sm text-primary bg-white text-center font-semibold border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary flex-grow">CHOOSE IMAGE</button>
            {#if avatarUrl}
                <button onclick={deleteAvatar} class="text-sm text-white bg-red-600 text-center font-semibold border-2 border-primary py-2 px-8 rounded-full hover:bg-red-700 flex-grow">DELETE AVATAR</button>
            {/if}
            <button id="uploadBtn" class={`text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full ${originalImage ? "" : "hidden"} hover:text-primary hover:bg-secondary`}>UPLOAD</button>
        </section>
    </section>
</section>

{#if showNotification}
    <Notification bind:message={notificationMessage} bind:type={notificationType} duration={5000} />
{/if}