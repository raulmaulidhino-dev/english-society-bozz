<script>
    import axios from 'axios';
    import { db } from '$lib/supabase';
    import { BACKEND_URL } from '$lib/config/config';

    import { goto } from '$app/navigation';
    import { onMount, onDestroy } from 'svelte';
    import DOMPurify from 'dompurify';

    import { Icon, MapPin, CalendarDays, Sparkles, PencilSquare as EditIcon} from 'svelte-hero-icons';

    import { Tipex } from '@friendofsvelte/tipex';

    import "@friendofsvelte/tipex/styles/Tipex.css";
    import "@friendofsvelte/tipex/styles/ProseMirror.css";
    import "@friendofsvelte/tipex/styles/Controls.css";
    import "@friendofsvelte/tipex/styles/EditLink.css";
    import "@friendofsvelte/tipex/styles/CodeBlock.css";
    
    let { event = null } = $props();

    let title = $state(event?.title ?? "");
    let location = $state(event?.location ?? "");

    const utcDate = new Date(event?.date) ?? new Date();
    const offsetMs = utcDate.getTimezoneOffset() * 60000;
    const localDate = new Date(utcDate.getTime() - offsetMs);
    let event_date = $state(new Date(localDate).toISOString().slice(0, 16));
    
    let description = $state(event?.description ?? "");

    let isAnonymous = $state(event?.is_anonymous ?? false);

    let editor = $state();

    function saveDesc() {
        description = editor.getHTML();
    }

    let errorMsg = $state("");

    const updateEvent = async (token) => {
        try {
            const res = await axios.put(`${BACKEND_URL}/user/events/${event.id}`, {
                        title,
                        location,
                        date: new Date(event_date).toISOString(),
                        description: DOMPurify.sanitize(description) || null,
                        is_anonymous: isAnonymous,
                    },
                    {
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
            );
            goto("/user/events");

        } catch (error) {
            errorMsg = error?.response?.message || "Unknown Error";
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            data: { session }
        } = await db.auth.getSession();
        const token = session?.access_token;
        
        await updateEvent(token);
    };

    onMount(() => {
        setTimeout(() => {
            editor.commands.setContent(description);
        }, 1000);
    });

    onDestroy(() => {
        if (editor) editor.destroy();
    });

</script>

<section>
    <article class="bg-white rounded-lg shadow-md flex flex-col">
        <section>
            <section class="w-full aspect-[3/2] relative">
                {#if event.image_url}
                    <img src={event.image_url} alt={event.title}
                    class="rounded-t-[inherit] opacity-25"/>
                {:else}
                    <div class="bg-primary w-full aspect-[3/2] rounded-t-[inherit] flex justify-center items-center opacity-75">
                    </div>
                {/if}
                <Icon src={EditIcon} size="72" class="text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </section>
            <section class="grow p-4 flex flex-col gap-4">
                <section>
                    <input id="eventTitle" name="eventTitle" type="text" placeholder="Event Title" bind:value={title} minlength="3" maxlength="50" title="" required aria-required="true" autocomplete="off" class="text-2xl w-full border-b-[1px] pb-1 mb-[0.5em] font-semibold focus:border-primary focus:outline-none disabled:text-slate-400" />
                    <section class="event-data flex flex-col gap-4">
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-red-500 w-6 h-6" src={MapPin} />
                                <input id="event_location" name="event_location" type="text" placeholder="Location" bind:value={location} minlength="3" maxlength="50" required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none disabled:text-slate-400" />
                            </div>
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-secondary w-6 h-6" src={CalendarDays} />
                                <input id="event_date" name="event_date" type="datetime-local" bind:value={event_date} required aria-required="true" autocomplete="off" class="text-md w-full border-b-[1px] rounded py-2 px-2 focus:border-primary focus:outline-none disabled:text-slate-400" />
                            </div>
                            <div class="flex items-center gap-4">
                                <Icon solid class="text-purple-600 w-6 h-6" src={Sparkles} />
                                <p class="text-md">By 
                                    <select bind:value={isAnonymous} id="event_maker_name" class="text-primary font-bold ml-1 p-2 rounded">
                                        {#if event.event_maker_name}
                                            <option value={false}>{event.event_maker_name}</option>
                                        {/if}
                                        <option value={true}>Anonymous</option>
                                    </select>
                                </p>
                            </div>
                            <section class="border-t-2 border-slate-200 pt-4">
                                <h2 class="text-xl text-center font-bold mb-[1em]">Event Description</h2>
                                <Tipex bind:tipex={editor} onupdate={saveDesc} autofocus={false} controls floating focal class="border border-neutral-200 mb-4" />
                            </section>
                    </section>
                </section>
            </section>
            <section class="p-4">
                <button  onclick={handleSubmit} class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center
                hover:text-primary hover:bg-secondary">UPDATE EVENT</button>
            </section>
        </section>
    </article>
</section>