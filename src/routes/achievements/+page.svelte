<script lang="ts">
	import { AxiosError } from 'axios';
	
	import { defaultMeta } from '$lib/meta/meta';

	import Achievements from './Achievements.svelte';

	import type { Meta } from '$lib/types/meta/meta';
	import type { AchievementResponse } from '$lib/types/achievement/achievement';

	interface Props {
			data: {
					meta: Meta;
					achievements?: AchievementResponse[];
					pageCount?: number;
					page?: number;
					err?: AxiosError;
			}
	}

	let { data }: Props = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<Achievements />