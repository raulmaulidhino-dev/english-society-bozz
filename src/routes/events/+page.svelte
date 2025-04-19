<script>
    import Events from './Events.svelte';
    import { defaultMeta } from '$lib/meta/meta';

    let { data } = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<Events events={data.events} pageCount={data.pageCount} pageNum={data.page} error={data.error || null} />