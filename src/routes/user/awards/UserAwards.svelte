<script lang="ts">
    import { db } from '$lib/supabase';
    import axios from 'axios';
    import { BACKEND_URL } from '$lib/config/config';

    import AwardCard from '$lib/components/AwardCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Notification from '$lib/components/Notification.svelte';

    import { goto } from '$app/navigation';

    import { isHttpError, error, isRedirect } from '@sveltejs/kit';

    import { Icon, Sparkles as AnnounceAwardIcon } from 'svelte-hero-icons';
    
    import type { AwardResponse } from '$lib/types/award/award';
    import type { ErrorResponse } from '$lib/types/error/error';

    interface Props {
        awards: AwardResponse[];
        pageCount: number;
        pageNum: number;
    }

    let { awards, pageCount, pageNum }: Props = $props();

    let errorMsg: string | null = $state(null);

    let notificationMessage: string = $state("");
    let notificationType: string = $state("");
    let showNotification: boolean = $state(false);

    const deleteAward = async (award_id: string) => {
        
        errorMsg = null;
        
        notificationMessage = "";
        notificationType = "";
        showNotification = false;

        const {
            data: { session }
        } = await db.auth.getSession();

        const token = session?.access_token;

        if (!token) {
            throw error(404, "Not found");
        }
        
        try {
            const res = await axios.delete(`${BACKEND_URL}/user/awards/${award_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.location.replace(window.location.href);

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

<section>
    <h1 class="text-3xl sm:text-4xl text-center font-bold px-6 md:px-8 pt-6 mb-[1em]">My Award Announcements</h1>
    <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
        {#if awards.length > 0}
            {#each awards as award}
                <AwardCard award={award} isEditable={true} deleteAward={() => deleteAward(award.id)}/>
            {/each}
        {:else}
            <p>You don't have any award announcements yet...</p>   
        {/if}
    </section>
    {#if awards.length > 0}
        <Pagination currentPage={pageNum} totalPages={pageCount} delta={2} goToPageURL={"/user/events"} />
    {/if}
    <button onclick={() => goto("/user/awards/announce")} title="Announce an Award" class="text-primary bg-secondary p-4 border-secondary border-2 rounded-full fixed z-[999] right-4 bottom-4 shadow-xl hover:bg-primary hover:text-secondary">
        <Icon src={AnnounceAwardIcon} solid size="42" />
    </button>
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}