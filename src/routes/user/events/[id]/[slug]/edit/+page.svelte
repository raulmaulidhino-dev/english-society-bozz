<script>
    import EventEditor from "./EventEditor.svelte";
    
    let { data } = $props(); 

</script>

<EventEditor event={data.event} />
