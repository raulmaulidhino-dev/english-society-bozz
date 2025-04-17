<script>

    import EventCard from '$lib/components/EventCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    let { events, pageCount, pageNum } = $props(); 

</script>

<section>
    <h1 class="text-3xl sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Latest Events</h1>
    <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {#if events}
            {#each events as event}
                <EventCard event={event}/>
            {/each}
        {:else}
            <section class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg">
                <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                    <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                    <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                    <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No events found here.</p>
                    <p class="mb-6 text-md font-light text-gray-500 max-w-80">Looks like you have reached <span class="font-bold">"The End"</span> of the page!</p>
                    <a href="/events" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">GO TO THE LATEST EVENTS</a>
                </div>
            </section>        
        {/if}
    </section>
    <Pagination currentPage={pageNum} totalPages={pageCount} goToPageURL={"/events"} />
</section>