<script lang="ts">

    import DOMPurify from "dompurify";
    
    import {Icon, MapPin, CalendarDays, Sparkles, Photo as EventThumb} from 'svelte-hero-icons';
    import { browser } from "$app/environment";

    import { defaultMeta } from "$lib/meta/meta.js";

    import type { EventResponse } from "$lib/types/event/event.js";
    import type { Meta } from "$lib/types/meta/meta";

    interface Props {
        data: {
            event: EventResponse;
            meta: Meta;
        }
    }

    let { data }: Props = $props();

    let safeDesc: string = $state("");
    if (browser) safeDesc = DOMPurify.sanitize(data.event?.description ?? "");

    const event_date: Date = new Date(data.event.date);

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />

    <!-- Facebook Meta Tags -->
	<meta property="og:title" content={ data.meta?.title ?? defaultMeta.title } />
	<meta property="og:description" content={ data.meta?.description ?? defaultMeta.description } />
	<meta property="og:image" content={ data.meta?.ogImage ?? defaultMeta.ogImage } />
	<meta property="og:url" content={ data.meta?.url ?? defaultMeta.url } />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="english-society-bozz.vercel.app" />
	<meta property="twitter:url" content={ data.meta?.url ?? defaultMeta.url } />
	<meta property="twitter:title" content={ data.meta?.title ?? defaultMeta.title } />
	<meta property="twitter:description" content={ data.meta?.description ?? defaultMeta.description } />
	<meta property="twitter:image" content={ data.meta?.ogImage ?? defaultMeta.ogImage } />
</svelte:head>

<article class="bg-white md:rounded-lg max-w-2xl mx-auto mb-8">
    <section class="w-full md:mt-8 aspect-[3/2] relative">
        {#if data.event.image_url}
            <img src={data.event.image_url} alt={data.event.title} class="w-full md:rounded-lg aspect-[3/2]"/>
        {:else}
            <div class="bg-primary w-full md:rounded-lg aspect-[3/2] flex justify-center items-center">
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
