<script>
    import EventEditor from "./EventEditor.svelte";
    
    let { data } = $props(); 

</script>

<EventEditor userProfile={data.userProfile} />
