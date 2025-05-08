<script lang="ts">
    import { AxiosError } from 'axios';
    
    import Events from './Events.svelte';
    import { defaultMeta } from '$lib/meta/meta';

    import type { Meta } from '$lib/types/meta/meta';
    import type { EventResponse } from '$lib/types/event/event';

    interface Props {
        data: {
            meta: Meta;
            events?: EventResponse[];
            pageCount?: number;
            page?: number;
            err?: AxiosError;
            limit: number;
            search: string;
            sortBy: string;
            sortOrder: string;
        }
    }

    let { data }: Props = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<Events events={data.events} pageCount={data.pageCount} pageNum={data.page} error={data.err} limit={data.limit} search={data.search} sortBy={data.sortBy} sortOrder={data.sortOrder} />