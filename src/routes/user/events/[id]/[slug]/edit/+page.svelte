<script lang="ts">
    import EventEditor from "./EventEditor.svelte";
    import { defaultMeta } from "$lib/meta/meta";
    import type { EventResponse } from "$lib/types/event/event";
    import type { Meta } from "$lib/types/meta/meta";

    interface Props {
        data: {
            event: EventResponse;
            meta: Meta;
        }
    }

    let { data }: Props = $props(); 

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<EventEditor event={data.event} />
