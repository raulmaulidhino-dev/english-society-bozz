<script>
    import EditAvatar from "./EditAvatar.svelte";
    import { defaultMeta } from "$lib/meta/meta";

    let { data } = $props();
</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<EditAvatar avatarUrl={data.avatarUrl} />