<script lang="ts">
    import EditAvatar from "./EditAvatar.svelte";
    import { defaultMeta } from "$lib/meta/meta";
    import type { Meta } from '$lib/types/meta/meta.js';

    interface Props {
        data: {
            avatarUrl: string | null;
            meta: Meta;
        }
    }

    let { data }: Props = $props();
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<EditAvatar avatarUrl={data.avatarUrl} />