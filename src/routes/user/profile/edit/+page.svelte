<script>
    import EditProfile from './EditProfile.svelte';
    let { data } = $props();
</script>

<EditProfile userProfile={data.userProfile} />