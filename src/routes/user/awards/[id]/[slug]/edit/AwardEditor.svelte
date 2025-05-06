<script lang="ts">
    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import DOMPurify from 'dompurify';

    import Modal from '$lib/components/modals/Modal.svelte';
    import Notification from '$lib/components/Notification.svelte';

    import { Icon, Sparkles, PencilSquare as EditIcon, Photo, XMark as CloseIcon, ArrowUpTray as UploadIcon, Trash as DeleteIcon} from 'svelte-hero-icons';
    import { Building2 as OrganizerIcon, Link2 as URL_Icon, CalendarDays as AwardDateIcon, Crown as StudentNameIcon, FileBadge as CertificateURL_Icon } from '@lucide/svelte';

    import { Tipex } from '@friendofsvelte/tipex';
    import type { TipexEditor } from '@friendofsvelte/tipex';

    import "@friendofsvelte/tipex/styles/Tipex.css";
    import "@friendofsvelte/tipex/styles/ProseMirror.css";
    import "@friendofsvelte/tipex/styles/Controls.css";
    import "@friendofsvelte/tipex/styles/EditLink.css";
    import "@friendofsvelte/tipex/styles/CodeBlock.css";

    import type { AwardCategory, AwardLevel, AwardTitle, StudentClass } from "$lib/types/award/award";
    import type { AwardResponse } from '$lib/types/award/award';
    import type { ErrorResponse } from '$lib/types/error/error';

    // Props
    interface Props {
        award: AwardResponse;
        awardCategories: AwardCategory[];
        awardLevels: AwardLevel[];
        awardTitles: AwardTitle[];
        studentClasses: StudentClass[];
    }

    let { award, awardCategories, awardLevels, awardTitles, studentClasses }: Props = $props();

    // Request Packet
    const awardDataReq: FormData = new FormData();

    // Award Photo Management
    let fileInput: HTMLInputElement | null = $state(null);

    let originalImage: string | null = $state(null);
    let compressedBlob: Blob | null = $state(null);
    const MAX_SIZE: number = 200 * 1024;

    let photoUrl: string | null = $state(award.photo_url);

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
                    errorMsg = `Failed to compress your award photo.`;
                }
            };

            img.onerror = () => {
                errorMsg = "Failed to load your award photo."
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
                reject(new Error(`Failed to load your award photo`));
            };
        });
    }

    let showUploadPhotoModal: boolean = $state(false);
    let showPhotoPreview: boolean = $state(false);

    let awardName: string = $state(award.name);
    let awardCategoryId: string = $state(awardCategories.find(obj => obj.category === award.award_categories.category)?.id ?? "");
    let awardLevelId: string = $state(awardLevels.find(obj => obj.level === award.award_levels.level)?.id ?? "");
    let awardTitleId: string = $state(awardTitles.find(obj => obj.title === award.award_titles.title)?.id ?? "");
    let awardDate: string = $state(award.award_date);
    let organizer: string = $state(award.organizer);
    let organizerUrl: string | null = $state(award.organizer_url);
    let studentName: string = $state(award.student_name);
    let studentClassId: string = $state(studentClasses.find(obj => obj.class === award.student_classes.class)?.id ?? "");
    let certificateUrl: string | null = $state(award.certificate_url);
    
    let description: string = $state(award?.description ?? "");

    let editor: TipexEditor = $state();

    function saveDesc() {
        if (editor) description = editor.getHTML();
    }

    let errorMsg: string | null = $state(null);

    let notificationMessage: string = $state("");
    let notificationType: string = $state("");
    let showNotification: boolean = $state(false);

    const updateAward = async (token: string | null) => {

        awardDataReq.append("name", awardName);
        awardDataReq.append("award_category_id", awardCategoryId);
        awardDataReq.append("award_level_id", awardLevelId);
        awardDataReq.append("award_title_id", awardTitleId);
        awardDataReq.append("award_date", awardDate);
        awardDataReq.append("organizer", organizer);
        if (organizerUrl) awardDataReq.append("organizer_url", organizerUrl);
        awardDataReq.append("student_name", studentName);
        awardDataReq.append("student_class_id", studentClassId);
        if (certificateUrl) awardDataReq.append("certificate_url", certificateUrl);
        if (description) awardDataReq.append("description", DOMPurify.sanitize(description));
        if (photoUrl) awardDataReq.append("photo_url", photoUrl);
        
        errorMsg = null;

        try {
            const res = await axios.put(`${BACKEND_URL}/user/awards/${award.id}`,
                    awardDataReq,
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
                goto("/user/awards", { replaceState: true });
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
        
        await updateAward(token);
    };

    onMount(async () => {

        setTimeout(() => {
            if (editor) editor.commands.setContent(description);
        }, 1000);

        const uploadButton = document.getElementById("uploadBtn");
        if (uploadButton) {
            uploadButton.addEventListener("click", async () => {
                if (compressedBlob) {
                    awardDataReq.append("award-photo", compressedBlob);
                    showUploadPhotoModal = false;
                    showPhotoPreview = true;
                } else errorMsg = "There is no new image attached!";
            });
        }

        const deleteBtn = document.getElementById("deleteBtn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
                originalImage = null;
                compressedBlob = null;
                photoUrl = null;
                awardDataReq.delete("award-photo");
                showUploadPhotoModal = false;
                showPhotoPreview = false;
            });
        }
    });

    onDestroy(() => {
        if (editor) editor.destroy();
    });

</script>

<section class="max-w-2xl md:rounded-lg mx-auto mb-8">
    <article class="bg-white rounded-[inherit] md:mt-8 shadow-md flex flex-col">
        <section class="w-full rounded-t-[inherit] aspect-square relative">
            <button onclick={() => showUploadPhotoModal = true} class="w-full rounded-t-[inherit] aspect-square relative">
                {#if originalImage && showPhotoPreview}
                    <img src={originalImage} alt={awardName} class="rounded-t-[inherit] opacity-25"/>
                {:else if photoUrl}
                    <img src={photoUrl} alt={awardName} class="rounded-t-[inherit] opacity-25"/>
                {:else}
                    <div class="bg-secondary w-full aspect-square rounded-t-[inherit] flex justify-center items-center opacity-75">
                    </div>
                {/if}
                <Icon src={EditIcon} size="72" class="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </button>
            <section class="grow p-4 flex flex-col gap-6">
                <form id="award_form" onsubmit={handleSubmit}>
                    <!-- Award Name Input -->
                    <input id="award_name" name="award_name" type="text" placeholder="Award Name" bind:value={awardName} minlength="3" maxlength="255" required aria-required="true" autocomplete="off" class="text-2xl w-full border-b-[1px] pb-1 mb-[0.5em] font-semibold focus:border-primary focus:outline-none disabled:text-slate-400" />
                    <section class="award-data flex flex-col gap-4">
                        <section class="flex flex-wrap gap-4">
                            <!-- Category Input -->
                            <div class="flex items-center gap-4">
                                <label for="award_category" class="text-md">Category :</label>
                                <select bind:value={awardCategoryId} id="award_category" required aria-required="true" class="font-semibold ml-1 p-2 rounded">
                                    {#each awardCategories as c}
                                        <option value={c.id}>{c.category}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Title Input -->
                            <div class="flex items-center gap-4">
                                <label for="award_title" class="text-md">Title :</label>
                                <select bind:value={awardTitleId} id="award_title" required aria-required="true" class="font-semibold ml-1 p-2 rounded">
                                    {#each awardTitles as t}
                                        <option value={t.id}>{t.title}</option>
                                    {/each}
                                </select>
                            </div>

                            <!-- Level Input -->
                            <div class="flex items-center gap-4">
                                <label for="award_level" class="text-md">Level :</label>
                                <select bind:value={awardLevelId} id="award_level" required aria-required="true" class="font-semibold ml-1 p-2 rounded">
                                    {#each awardLevels as l}
                                        <option value={l.id}>{l.level}</option>
                                    {/each}
                                </select>
                            </div>
                        </section>

                        <!-- Organizer Input -->
                        <div class="flex items-center gap-4">
                            <OrganizerIcon class="text-slate-500 w-6 h-6" />
                            <input id="organizer" name="organizer" type="text" placeholder="Organizer" bind:value={organizer} minlength="3" maxlength="255" required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        </div>

                        <!-- Organizer URL Input -->
                        <div class="flex items-center gap-4">
                            <URL_Icon class="text-sky-500 w-6 h-6" />
                            <input id="organizer_url" name="organizer_url" type="url" pattern="https?://.*" title="Please enter a valid URL starting with http:// or https://" placeholder="Organizer URL (optional)" bind:value={organizerUrl} autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        </div>
                        
                        <!-- Award Date Input -->
                        <div class="flex items-center gap-4 self-start">
                            <AwardDateIcon class="text-blue-500 w-6 h-6" />
                            <input id="award_date" name="award_date" type="date" bind:value={awardDate} required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] rounded py-2 px-2 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        </div>
                        
                        <hr class="border-secondary mb-4"/>

                        <h2 class="text-xl text-center font-bold mb-[1em]">Trophier Data</h2>

                        <!-- Student Name Input -->
                        <div class="flex items-center gap-4">
                            <StudentNameIcon class="text-amber-500 w-6 h-6" />
                            <input id="student_name" name="student_name" type="text" placeholder="Student Name" bind:value={studentName} minlength="3" maxlength="100" required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        </div>

                        <!-- Student Class Input -->
                        <div class="flex items-center gap-4">
                            <label for="student_class" class="text-md">Student Class :</label>
                            <select bind:value={studentClassId} id="student_class" required aria-required="true" class="font-semibold ml-1 p-2 rounded">
                                {#each studentClasses as c}
                                    <option value={c.id}>{c.class}</option>
                                {/each}
                            </select>
                        </div>

                        <!-- Certificate URL Input -->
                        <div class="flex items-center gap-4">
                            <CertificateURL_Icon class="text-orange-500 w-6 h-6" />
                            <input id="certificate_url" name="certificate_url" type="url" pattern="https?://.*" title="Please enter a valid URL starting with http:// or https://" placeholder="Certificate URL (Optional)" bind:value={certificateUrl} minlength="3" maxlength="45" autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                        </div>
                    </section>
                </form>
                <hr class="border-primary mt-4"/>
                <section class="border-slate-200">
                    <h2 class="text-xl text-center font-bold mb-[1em]">Award Description</h2>
                    <Tipex bind:tipex={editor} onupdate={saveDesc} autofocus={false} controls floating focal class="border border-neutral-200 mb-4" />
                </section>
            </section>
            <section class="p-4">
                <button type="submit" form="award_form" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center
                hover:text-primary hover:bg-secondary">UPDATE AWARD</button>
            </section>
        </section>
    </article>
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}

<Modal show={showUploadPhotoModal}>
    {#snippet children()}
        <div class="mb-4 flex items-center gap-4">
            <h2 class="text-xl font-semibold">Upload a Photo</h2>
            <button onclick={() => showUploadPhotoModal = false} class="justify-end ml-auto">
                <Icon src={CloseIcon} size="27" />
            </button>
        </div>

        <button onclick={openFilePicker} class={`text-gray-300 w-full aspect-square h-auto bg-white border-2 border-gray-300 rounded-lg mx-auto flex justify-center items-center`}>
            {#if originalImage}
                <img src={originalImage} alt="Award Thumbnail" class="mx-auto w-full rounded-[6px]" />
            {:else if photoUrl}
                <img src={photoUrl} alt="Award Thumbnail" class="mx-auto w-full rounded-[6px]" />
            {:else}
                <Icon src={Photo} solid size="56" />
            {/if}
        </button>

        <input type="file" accept="image/*" bind:this={fileInput} onchange={handleFileChange} class="hidden" />
        <small class="text-sm text-slate-400 text-center mb-[1.5em]">Please choose a photo with ratio 3:2</small>
        <p class="text-sm text-primary font-semibold mb-[1.5em]">Tap the photo to add or change your award photo</p>
        <p role="alert" class={`text-red-500 mb-[1.5em] ${ errorMsg ? "" : "hidden" }`}>{errorMsg ?? ""}</p>

        <div class="flex justify-stretch items-stretch gap-2">
            <button id="uploadBtn" class="grow text-white text-xs font-bold bg-primary border-2 border-primary hover:text-primary hover:bg-secondary p-2 rounded-full flex justify-center items-center gap-2">
                <Icon src={UploadIcon} mini size="18" />
                <span>UPLOAD</span>
            </button>
            <button id="deleteBtn" class={`grow text-white text-xs font-bold bg-red-700 border-2 border-red-700 hover:bg-red-900 p-2 rounded-full flex justify-center items-center gap-2 ${ originalImage || photoUrl ? "" : "hidden" }`}>
                <Icon src={DeleteIcon} mini size="18" class="text-white" />
                <span>DELETE</span>
            </button>
        </div>
    {/snippet}
</Modal>
