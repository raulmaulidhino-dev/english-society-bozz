<script lang="ts">
    import UserAwards from './UserAwards.svelte';
    import { defaultMeta } from '$lib/meta/meta';
    import type { AwardResponse } from '$lib/types/award/award';
    import type { Meta } from '$lib/types/meta/meta';

    interface Props {
        data: {
            meta: Meta;
            awards: AwardResponse[];
            pageCount: number;
            page: number;
            showPagination: boolean;
        }
    }

    let { data }: Props = $props();
    
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<UserAwards awards={data.awards} pageCount={data.pageCount} pageNum={data.page} showPagination={data.showPagination} />