<script>
    import {Icon, MapPin, CalendarDays, Sparkles} from 'svelte-hero-icons';

    let tags = ["Tag 1", "Tag 2", "Tag 3"];
    let eventDataTemplate = [
        {icon: MapPin, content: "Central Park, NY City, US"},
        {icon: CalendarDays, content: "Sunday, January 01, 2025 - 06:00 PM"},
        {icon: Sparkles, content: "By An Event Maker"}
    ];

</script>

<article class="bg-white rounded-lg shadow-md">
    <section class="w-full aspect-[3/2] rounded-t-[inherit] relative">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src="https://picsum.photos/id/20/900/600" alt="Event Photo" 
        class="rounded-t-[inherit]"/>
        <div class="w-1/5 text-center bg-white p-2 rounded-md absolute top-2 left-2 aspect-square shadow-xl flex flex-col justify-center items-center"><span class="text-xl font-bold">01</span><span class="text-sm text-primary font-semibold">JAN</span></div>
    </section>
    <section class="p-4 flex flex-col gap-4">
        <section class="tags flex flex-wrap gap-2">
            {#each tags as tag}
                <div>{tag}</div>
            {/each}
        </section>
        <section>
            <h2 class="text-2xl font-semibold mb-[0.5em]">Event Title</h2>
            <section class="event-data flex flex-col gap-1">
                {#each eventDataTemplate as eventData}
                    <div class="flex items-center gap-2">
                        <Icon class="w-4 h-4" src={eventData.icon} />
                        <p class="text-sm">{eventData.content}</p>
                    </div>
                {/each}
            </section>
        </section>
        <section>
            <button class="text-sm text-white bg-primary font-semibold w-full border-2 border-primary hover:bg-secondary hover:text-primary py-2 px-8 rounded-lg">VIEW DETAILS</button>
        </section>
    </section>
</article>

<style>
    .tags > * {
        background-color: #f0f0f0;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 4px;
        transition: background-color 0.2s ease;
    }
</style>