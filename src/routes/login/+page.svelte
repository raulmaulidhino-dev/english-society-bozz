<script>
    import Login from './Login.svelte';
    import { defaultMeta } from '$lib/meta/meta';
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<Login />