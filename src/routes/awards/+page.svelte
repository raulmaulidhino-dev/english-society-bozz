<script lang="ts">
	import { AxiosError } from 'axios';
	
	import { defaultMeta } from '$lib/meta/meta';

	import Awards from './Awards.svelte';

	import type { Meta } from '$lib/types/meta/meta';
	import type { AwardResponse } from '$lib/types/award/award';

	interface Props {
			data: {
					meta: Meta;
					awards?: AwardResponse[];
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
</svelte:head>

<Awards awards={data.awards} pageCount={data.pageCount} pageNum={data.page} error={data.err} showPagination={data.showPagination} search={data.search} sortBy={data.sortBy} sortOrder={data.sortOrder} />