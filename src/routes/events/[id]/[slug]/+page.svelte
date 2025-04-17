<script>

    import DOMPurify from "dompurify";
    
    import {Icon, MapPin, CalendarDays, Sparkles, Photo as EventThumb} from 'svelte-hero-icons';
    import { browser } from "$app/environment";

    let { data } = $props();

    let safeDesc = $state();
    if (browser) safeDesc = DOMPurify.sanitize(data?.event?.description ?? "");

    const event_date = new Date(data.event.date);

</script>

<article class="bg-white shadow-md max-w-xl mx-auto">
    <section class="w-full aspect-[3/2] relative">
        {#if data.event.image_url}
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img src={data.event.image_url} alt={data.event.title}
            class="rounded-t-[inherit]"/>
        {:else}
            <div class="bg-primary w-full aspect-[3/2] flex justify-center items-center">
                <Icon src={EventThumb} size="72" class="text-secondary" />
            </div>
        {/if}
        <div class="w-fit h-fit text-center bg-white p-2 rounded-md absolute top-2 left-2 aspect-square shadow-xl flex flex-col justify-center items-center"><span class="text-xl font-bold">{event_date.toLocaleString('en-US', { day: "2-digit" })}</span><span class="text-sm text-primary font-semibold">{event_date.toLocaleString('en-US', { month: "short" }).toUpperCase()}</span></div>
    </section>
    <section class="p-4 flex flex-col gap-4">
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
                            {#if data.event.event_maker_username && !data.event.is_anonymous}
                                <a href={`/user/${data.event.event_maker_username}`} class="font-bold text-primary">{data.event.event_maker_name}</a>
                            {:else}
                                <span class="font-bold">Anonymous</span>
                            {/if}
                        </p>
                    </div>
                    {#if safeDesc}
                        <section id="description" class="text-sm border-t-2 border-t-slate-200 pt-4">
                            {#if browser}
                                <section>{@html safeDesc}</section>
                            {:else}
                                <section>Loading description...</section>
                            {/if}
                        </section>
                    {/if}
            </section>
        </section>
    </section>
</article>
