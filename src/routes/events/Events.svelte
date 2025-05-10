<script lang="ts">

    import axios from 'axios';

    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    import EventCard from '$lib/components/EventCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Notification from '$lib/components/Notification.svelte';

    import { Search as SearchIcon } from '@lucide/svelte';

    import type { EventResponse } from '$lib/types/event/event';
    import type { ErrorResponse } from '$lib/types/error/error';
    import type { AxiosError } from 'axios';

    interface Props {
        events?: EventResponse[];
        pageCount?: number;
        pageNum?: number;
        error?: AxiosError;
        showPagination: boolean;
        search: string;
        sortBy: string;
        sortOrder: string;
    }

    let { events, pageCount, pageNum, error, showPagination = true, search = '', sortBy = 'date', sortOrder = 'desc' }: Props = $props();

    let notificationMessage = $state("");
    let notificationType = $state("");
    let showNotification = $state(false);

    if (axios.isAxiosError<ErrorResponse>(error)) {
        notificationMessage = error?.response?.data?.message || "Unknown Error";
        notificationType = "error";
        showNotification = true;
    }

    async function submitSearch() {
        const params = new URLSearchParams();

        if (search.trim()) params.set('search', search);
        if (sortBy.trim()) params.set('sortBy', sortBy);
        if (sortOrder.trim()) params.set('sortOrder', sortOrder);

        window.location.search = params.toString();
    }

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<section>
    <h1 data-aos="fade-right" class="text-3xl sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Latest Events</h1>
    <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        <section class="relative bg-white w-full max-w-lg mb-6 rounded-full shadow-lg col-span-full mx-auto flex px-9">
            <SearchIcon size="24" strokeWidth="4" class="text-primary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
                type="input"
                bind:value={search}
                placeholder="Search events..."
                onkeydown={(e) => e.key === 'Enter' && submitSearch()}
                class="h-full p-4 rounded-[inherit] font-semibold focus:outline-none grow"
            />
        </section>
        {#if events}
            {#if events.length > 0}
                {#each events as event}
                    <EventCard event={event}/>
                {/each}
            {:else}
                <p>It looks like there aren't any events here yet...</p>
            {/if}
        {:else}
            <section data-aos="zoom-in" class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg col-span-full">
                <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                    <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                    <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                    <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No events found here.</p>
                    <p class="mb-6 text-md font-light text-gray-500 max-w-80">Looks like you have reached <span class="font-bold">"The End"</span> of the page or got lost!</p>
                    <a href="/events" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-4 md:px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">SEE THE LATEST EVENTS</a>
                </div>
            </section>        
        {/if}
    </section>
    {#if showPagination}
        <Pagination currentPage={pageNum ?? 1} totalPages={pageCount ?? 1} delta={2} goToPageURL={"/events"} />
    {/if}
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}