<script lang="ts">
    import ChangePassword from './ChangePassword.svelte';

    import { defaultMeta } from '$lib/meta/meta';
    
    import type { Meta } from '$lib/types/meta/meta';

    interface Props {
        data: {
            meta: Meta;
        }
    }

    let { data }: Props = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<ChangePassword />