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
            showPagination: boolean;
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

<Events events={data.events} pageCount={data.pageCount} pageNum={data.page} error={data.err} showPagination={data.showPagination} search={data.search} sortBy={data.sortBy} sortOrder={data.sortOrder} />