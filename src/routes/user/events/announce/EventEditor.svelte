<script lang="ts">
    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import DOMPurify from 'dompurify';

    import Modal from '$lib/components/modals/Modal.svelte';
    import Notification from '$lib/components/Notification.svelte';

    import { Icon, MapPin, CalendarDays, Sparkles, PencilSquare as EditIcon, Photo, XMark as CloseIcon, ArrowUpTray as UploadIcon, Trash as DeleteIcon} from 'svelte-hero-icons';

    import { Tipex } from '@friendofsvelte/tipex';
    import type { TipexEditor } from '@friendofsvelte/tipex';

    import "@friendofsvelte/tipex/styles/Tipex.css";
    import "@friendofsvelte/tipex/styles/ProseMirror.css";
    import "@friendofsvelte/tipex/styles/Controls.css";
    import "@friendofsvelte/tipex/styles/EditLink.css";
    import "@friendofsvelte/tipex/styles/CodeBlock.css";

    import type { UserProfile } from '$lib/types/user/user';
    import type { ErrorResponse } from '$lib/types/error/error';

    // Props
    interface Props {
        userProfile: UserProfile;
    }

    let { userProfile }: Props = $props();

    // Request Packet
    const eventDataReq: FormData = new FormData();

    // Event Image Management
    let fileInput: HTMLInputElement | null = $state(null);

    let originalImage: string | null = $state(null);
    let compressedBlob: Blob | null = $state(null);
    const MAX_SIZE: number = 200 * 1024;

    function openFilePicker() {
        if (fileInput) fileInput.click();
    }

    function handleFileChange(event: Event) {
        errorMsg = null;
        const target = event.target as HTMLInputElement;
        let file: File;
        if (target.files && target.files.length > 0) file = target.files[0];
        else {
            errorMsg = "Please upload an image file!";
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            if (e.target) img.src = e.target.result as string;
            else return;

            img.onload = async () => {
                const imageRatio = img.width / img.height;
                const targetRatio = 3 / 2;
                const tolerance = 0.01;

                if (!(Math.abs(imageRatio - targetRatio) < tolerance)) {
                    errorMsg = "Please crop your image into a 3:2 ratio manually before uploading it—Internal image cropper will be added soon!";
                    return;
                }

                if (e.target) originalImage = e.target.result as string;
                else return;

                try {
                    compressedBlob = await compressImage(originalImage);
                } catch (err: unknown) {
                    errorMsg = `Failed to compress your event image.`;
                }
            };

            img.onerror = () => {
                errorMsg = "Failed to load your event image."
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
                reject(new Error(`Failed to load your event image`));
            };
        });
    }

    let showUploadImageModal: boolean = $state(false);
    let showImagePreview: boolean = $state(false);

    let title = $state("");
    let location = $state("");

    const utcDate = new Date();
    const offsetMs = utcDate.getTimezoneOffset() * 60000;
    const localDate = new Date(utcDate.getTime() - offsetMs);
    let event_date = $state(new Date(localDate).toISOString().slice(0, 16));
    
    let description = $state("");

    let editor: TipexEditor = $state();

    function saveDesc() {
        if (editor) description = editor.getHTML();
    }

    let isAnonymous = $state(false);

    let errorMsg: string | null = $state(null);

    let notificationMessage: string = $state("");
    let notificationType: string = $state("");
    let showNotification: boolean = $state(false);

    const addEvent = async (token: string | null) => {

        eventDataReq.append("title", title);
        eventDataReq.append("location", location);
        eventDataReq.append("date", new Date(event_date).toISOString());
        if (description) eventDataReq.append("description", DOMPurify.sanitize(description));
        eventDataReq.append("is_anonymous", String(isAnonymous));
        
        errorMsg = null;

        try {
            const res = await axios.post(`${BACKEND_URL}/user/events`,
                    eventDataReq,
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

            setTimeout(() => {
                goto("/user/events", { replaceState: true });
            }, 3000);

        } catch (error) {
            if (axios.isAxiosError<ErrorResponse>(error)) {
                errorMsg = error?.response?.data?.message || "Unknown Error";

                notificationMessage = errorMsg;
                notificationType = "error";
                showNotification = true;
            }
        }
    };

    const handleSubmit = async (e: SubmitEvent) => {
        notificationMessage = "";
        notificationType = "";
        showNotification = false;

        e.preventDefault();

        const {
            data: { session }
        } = await db.auth.getSession();
        const token = session?.access_token ?? null;
        
        await addEvent(token);
    };

    onMount(async () => {
        const uploadButton = document.getElementById("uploadBtn");
        if (uploadButton) {
            uploadButton.addEventListener("click", async () => {
                if (compressedBlob) {
                    eventDataReq.append("event-image", compressedBlob);
                    showUploadImageModal = false;
                    showImagePreview = true;
                } else errorMsg = "There is no new image attached!";
            });
        }

        const deleteBtn = document.getElementById("deleteBtn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                originalImage = null;
                compressedBlob = null;
                eventDataReq.delete("event-image");
                showUploadImageModal = false;
                showImagePreview = false;
            });
        }
    });

    onDestroy(() => {
        if (editor) editor.destroy();
    });

</script>

<section>
    <article class="bg-white rounded-lg shadow-md flex flex-col">
        <section>
            <button onclick={() => showUploadImageModal = true} class="w-full aspect-[3/2] relative">
                {#if originalImage && showImagePreview}
                    <img src={originalImage} alt={title}
                    class="rounded-t-[inherit] opacity-25"/>
                {:else}
                    <div class="bg-primary w-full aspect-[3/2] rounded-t-[inherit] flex justify-center items-center opacity-75">
                    </div>
                {/if}
                <Icon src={EditIcon} size="72" class="text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </button>
            <section class="grow p-4 flex flex-col gap-4">
                <form id="event_form" onsubmit={handleSubmit}>
                    <input id="eventTitle" name="eventTitle" type="text" placeholder="Event Title" bind:value={title} minlength="3" maxlength="50" required aria-required="true" autocomplete="off" class="text-2xl w-full border-b-[1px] pb-1 mb-[0.5em] font-semibold focus:border-primary focus:outline-none disabled:text-slate-400" />
                    <section class="event-data flex flex-col gap-4">
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-red-500 w-6 h-6" src={MapPin} />
                                <input id="event_location" name="event_location" type="text" placeholder="Location" bind:value={location} minlength="3" maxlength="45" required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                            </div>
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-secondary w-6 h-6" src={CalendarDays} />
                                <input id="event_date" name="event_date" type="datetime-local" bind:value={event_date} required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] rounded py-2 px-2 focus:border-primary focus:outline-none disabled:text-slate-400" />
                            </div>
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-purple-600 w-6 h-6" src={Sparkles} />
                                <p class="text-md">By 
                                    <select bind:value={isAnonymous} id="event_maker_name" class="text-primary font-bold ml-1 p-2 rounded">
                                        {#if userProfile?.full_name}
                                            <option value={false}>{userProfile.full_name}</option>
                                        {/if}
                                        <option value={true}>Anonymous</option>
                                    </select>
                                </p>
                            </div>
                    </section>
                </form>
                <section class="border-t-2 border-slate-200 pt-4">
                    <h2 class="text-xl text-center font-bold mb-[1em]">Event Description</h2>
                    <Tipex bind:tipex={editor} onupdate={saveDesc} autofocus={false} controls floating focal class="border border-neutral-200 mb-4" />
                </section>
            </section>
            <section class="p-4">
                <button type="submit" form="event_form" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center
                hover:text-primary hover:bg-secondary">ANNOUNCE EVENT</button>
            </section>
        </section>
    </article>
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}

<Modal show={showUploadImageModal}>
    {#snippet children()}
        <div class="mb-4 flex items-center gap-4">
            <h2 class="text-xl font-semibold">Upload an Image</h2>
            <button onclick={() => showUploadImageModal = false} class="justify-end ml-auto">
                <Icon src={CloseIcon} size="27" />
            </button>
        </div>

        <button onclick={openFilePicker} class={`text-gray-300 w-full aspect-[3/2] h-auto bg-white border-2 border-gray-300 rounded-lg mx-auto flex justify-center items-center`}>
            {#if originalImage}
                <img src={originalImage} alt="Event Thumbnail" class="mx-auto w-full rounded-[6px]" />
            {:else}
                <Icon src={Photo} solid size="56" />
            {/if}
        </button>
                    
        <input type="file" accept="image/*" bind:this={fileInput} onchange={handleFileChange} class="hidden" />
        <small class="text-sm text-slate-400 text-center mb-[1.5em]">Please choose an image with ratio 3:2</small>
        <p class="text-sm text-primary font-semibold mb-[1.5em]">Tap the image to add or change your event image</p>
        <p role="alert" class={`text-red-500 mb-[1.5em] ${ errorMsg ? "" : "hidden" }`}>{errorMsg ?? ""}</p>

        <div class="flex justify-stretch items-stretch gap-2">
            <button id="uploadBtn" class="grow text-white text-xs font-bold bg-primary border-2 border-primary hover:text-primary hover:bg-secondary p-2 rounded-full flex justify-center items-center gap-2">
                <Icon src={UploadIcon} mini size="18" />
                <span>UPLOAD</span>
            </button>
            <button id="deleteBtn" class={`grow text-white text-xs font-bold bg-red-700 border-2 border-red-700 hover:bg-red-900 p-2 rounded-full flex justify-center items-center gap-2 ${ originalImage ? "" : "hidden" }`}>
                <Icon src={DeleteIcon} mini size="18" class="text-white" />
                <span>DELETE</span>
            </button>
        </div>
    {/snippet}
</Modal>
