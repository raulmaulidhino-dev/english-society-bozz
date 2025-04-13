<script>
    export let data;

    import Events from './Events.svelte';
</script>

<Events events={data.events} pageCount={data.pageCount} pageNum={data.page} />