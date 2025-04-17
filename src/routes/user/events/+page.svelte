<script>
    import UserEvents from './UserEvents.svelte';
    let { data } = $props();
</script>

<UserEvents events={data.events} pageCount={data.pageCount} pageNum={data.page} />