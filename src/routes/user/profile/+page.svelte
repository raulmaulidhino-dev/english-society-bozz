<script>
    import Profile from './Profile.svelte';
    let { data } = $props();
</script>

<Profile user={data.userProfile} />