<script>
    import axios from "axios";
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let fileInput, avatarUrl = "";
    let errorMsg = "";

    async function uploadAvatar(token) {
        if (fileInput.files.length === 0) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("avatar", fileInput.files[0]);

        try {
            const res = await axios.post(`${BACKEND_URL}/user/profile/upload-avatar`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            avatarUrl = res.data.avatar_url;
            goto(`/user/profile/edit?newAvatarUrl=${encodeURIComponent(avatarUrl)}`);

        } catch (error) {
            errorMsg = error.response?.data?.message || error;
            alert("Failed to upload avatar.");
        }

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
    <section class="bg-white pt-16 pb-4 px-4 max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col gap-4">
        {#if avatarUrl}
            <img src={avatarUrl} alt="Avatar" class="mt-4 mx-auto w-full rounded-full" />
        {/if}
        <input type="file" bind:this={fileInput} class="mt-2 w-full p-2 border rounded" />
        <p class="text-red-500">{errorMsg}</p>
        <button id="uploadBtn" class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center hover:text-primary hover:bg-secondary">UPLOAD</button>
    </section>
</section>