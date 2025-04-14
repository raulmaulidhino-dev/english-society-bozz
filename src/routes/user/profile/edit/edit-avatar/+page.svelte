<script>

    import EditAvatar from "./EditAvatar.svelte";
    let { data } = $props();
</script>

<EditAvatar avatarUrl={data.avatarUrl} />