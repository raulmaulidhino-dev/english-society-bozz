<script>
    export let event;
    
    import { goto } from '$app/navigation';

    import {Icon, MapPin, CalendarDays, Sparkles, Photo as EventThumb} from 'svelte-hero-icons';

    const event_date = new Date(event.date);

    // let tags = ["Tag 1", "Tag 2", "Tag 3"];

</script>

<article class="bg-white rounded-lg shadow-md flex flex-col">
    <section class="w-full aspect-[3/2] rounded-t-[inherit] relative">
        {#if event.image_url}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={event.image_url} alt={event.title}
            class="rounded-t-[inherit]"/>
        {:else}
            <div class="bg-primary w-full aspect-[3/2] rounded-t-[inherit] flex justify-center items-center">
                <Icon src={EventThumb} size="72" class="text-secondary" />
            </div>
        {/if}
        <div class="w-1/5 text-center bg-white p-2 rounded-md absolute top-2 left-2 aspect-square shadow-xl flex flex-col justify-center items-center"><span class="text-xl font-bold">{event_date.toLocaleString('en-US', { day: "2-digit" })}</span><span class="text-sm text-primary font-semibold">{event_date.toLocaleString('en-US', { month: "short" }).toUpperCase()}</span></div>
    </section>
    <section class="grow p-4 flex flex-col gap-4">
        <!-- <section class="tags flex flex-wrap gap-2">
            {#each tags as tag}
                <div>{tag}</div>
            {/each}
        </section> -->
        <section>
            <h2 class="text-2xl font-semibold mb-[0.5em]">{event.title}</h2>
            <section class="event-data flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <Icon solid class="text-red-500 w-4 h-4" src={MapPin} />
                        <p class="text-sm">{event.location}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon solid class="text-secondary w-4 h-4" src={CalendarDays} />
                        <p class="text-sm">{event_date.toLocaleString()}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon solid class="text-purple-600 w-4 h-4" src={Sparkles} />
                        <p class="text-sm">By 
                            {#if event.event_maker_username}
                                <a href={`/user/${event.event_maker_username}`} class="font-bold text-primary">{event.event_maker_name}</a>
                            {:else}
                                <span class="font-bold">Anonymous</span>
                            {/if}
                        </p>
                    </div>
            </section>
        </section>
        <button on:click={() => goto(`/events/${event.id}/${event.slug}`)} class="text-sm text-white bg-primary font-semibold w-full border-2 border-primary mt-auto hover:bg-secondary hover:text-primary py-2 px-8 rounded-lg self-end">VIEW DETAILS</button>
    </section>
</article>

<style>
    /* .tags > * {
        background-color: #f0f0f0;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 4px;
        transition: background-color 0.2s ease;
    } */
</style>