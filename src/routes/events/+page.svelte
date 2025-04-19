<script>
    import Events from './Events.svelte';
    let { data } = $props();

</script>

<Events events={data.events} pageCount={data.pageCount} pageNum={data.page} error={data.error || null} />