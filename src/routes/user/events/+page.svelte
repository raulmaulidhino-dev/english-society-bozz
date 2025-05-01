<script lang="ts">
    import UserEvents from './UserEvents.svelte';
    import { defaultMeta } from '$lib/meta/meta';
    import type { EventResponse } from '$lib/types/event/event';
    import type { Meta } from '$lib/types/meta/meta';

    interface Props {
        data: {
            meta: Meta;
            events: EventResponse[];
            pageCount: number;
            page: number;
        }
    }

    let { data }: Props = $props();
    
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<UserEvents events={data.events} pageCount={data.pageCount} pageNum={data.page} />