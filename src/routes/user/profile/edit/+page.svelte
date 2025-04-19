<script>
    import EditProfile from './EditProfile.svelte';
    import { defaultMeta } from '$lib/meta/meta';

    let { data } = $props();
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<EditProfile userProfile={data.userProfile} />