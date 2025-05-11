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
					awardCategories: { category: string }[];
					awardLevels: { level: string }[];
					awardTitles: { title: string }[];
					search: string;
					sortBy: string;
					sortOrder: string;
					category: string | null;
					level: string	| null;
					title: string	| null;
			}
	}

	let { data }: Props = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
  <meta name="theme-color" content="#EFC007" />

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

<Awards awards={data.awards} pageCount={data.pageCount} pageNum={data.page} error={data.err} showPagination={data.showPagination} awardCategories={data.awardCategories} awardLevels={data.awardLevels} awardTitles={data.awardTitles} search={data.search} sortBy={data.sortBy} sortOrder={data.sortOrder} category={data.category} level={data.level} title={data.title} />