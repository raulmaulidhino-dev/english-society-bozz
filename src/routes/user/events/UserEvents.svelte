<script>
    import { db } from '$lib/supabase';
    import axios from 'axios';
    import { BACKEND_URL } from '$lib/config/config';

    import EventCard from '$lib/components/EventCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { goto } from '$app/navigation';

    import { Icon, BellAlert as AnnounceEventIcon } from 'svelte-hero-icons';

    let { events, pageCount, pageNum } = $props();
    let errorMsg = $state("");

    const deleteEvent = async (event_id) => {
        if (!window.confirm("This action will delete the event. Are you sure you want to proceed?")) return;
        
        const {
            data: { session }
        } = await db.auth.getSession();

        const token = session?.access_token;
        
        try {
            const res = await axios.delete(`${BACKEND_URL}/user/events/${event_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.alert(res.data.message);
            window.location.replace(window.location.href);

        } catch (err) {
            errorMsg = err?.response?.message || "Unknown Error"
        }

    }

</script>

<section>
    <h1 class="text-3xl sm:text-4xl text-center font-bold px-6 md:px-8 pt-6 mb-[1em]">My Events</h1>
    <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {#if events}
            {#each events as event}
                <EventCard event={event} isEditable={true} deleteEvent={() => deleteEvent(event.id)}/>
            {/each}
        {:else}
            <p>Nothing to see here...</p>        
        {/if}
    </section>
    <Pagination currentPage={pageNum} totalPages={pageCount} goToPageURL={"/user/events"} />
    <button onclick={() => goto("/user/events/announce")} title="Announce an Event" class="text-primary bg-secondary p-4 border-secondary border-2 rounded-full fixed right-4 bottom-4 shadow-xl hover:bg-primary hover:text-secondary">
        <Icon src={AnnounceEventIcon} solid size="42" />
    </button>
</section>