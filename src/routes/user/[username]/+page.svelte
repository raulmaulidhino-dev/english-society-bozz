<script>

    import PublicUserProfile from './PublicUserProfile.svelte';
    let { data } = $props();

</script>

<PublicUserProfile user={data.user} />