<script>
    export let data;
    
    import {Icon, MapPin, CalendarDays, Sparkles} from 'svelte-hero-icons';

    const event_date = new Date(data.event.date);

    // let tags = ["Tag 1", "Tag 2", "Tag 3"];

</script>

<article class="bg-white shadow-md">
    <section class="w-full aspect-[3/2] relative">
        {#if data.event.image_url}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={data.event.image_url} alt={data.event.title}
            class="rounded-t-[inherit]"/>
        {:else}
            <div class="bg-primary w-full aspect-[3/2]">
                
            </div>
        {/if}
        <div class="w-fit h-fit text-center bg-white p-2 rounded-md absolute top-2 left-2 aspect-square shadow-xl flex flex-col justify-center items-center"><span class="text-xl font-bold">{event_date.toLocaleString('en-US', { day: "2-digit" })}</span><span class="text-sm text-primary font-semibold">{event_date.toLocaleString('en-US', { month: "short" }).toUpperCase()}</span></div>
    </section>
    <section class="p-4 flex flex-col gap-4">
        <!-- <section class="tags flex flex-wrap gap-2">
            {#each tags as tag}
                <div>{tag}</div>
            {/each}
        </section> -->
        <section>
            <h2 class="text-2xl font-semibold mb-[0.5em]">{data.event.title}</h2>
            <section class="event-data flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <Icon solid class="text-red-500 w-4 h-4" src={MapPin} />
                        <p class="text-sm">{data.event.location}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon solid class="text-secondary w-4 h-4" src={CalendarDays} />
                        <p class="text-sm">{event_date.toLocaleString()}</p>
                    </div>
                    <div class="flex items-center gap-2 pb-4">
                        <Icon solid class="text-purple-600 w-4 h-4" src={Sparkles} />
                        <p class="text-sm">By 
                            {#if data.event.event_maker_username}
                                <a href={`/user/${data.event.event_maker_username}`} class="font-bold text-primary">{data.event.event_maker_name}</a>
                            {:else}
                                <span class="font-bold">Anonymous</span>
                            {/if}
                        </p>
                    </div>
                    <section class="text-sm border-t-2 border-t-slate-200 pt-4">
                        {data.event.description}
                    </section>
            </section>
        </section>
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