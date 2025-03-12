<script>
    export let message = "";
    export let type = "success";
    export let duration = 5000;

    let visible = true;

    const hideNotification = () => {
        visible = false;
    };

    setTimeout(hideNotification, duration);
</script>

{#if visible}
    <div class="fixed top-5 r-5 flex items-center justify-between p-4 rounded-lg shadow-lg text-white w-full max-w-80 transition-opacity duration-500 ease-in-out cursor-pointer { type === "error" ? 'bg-red-500' : 'bg-green-500' }">
        <p>{ message }</p>
        <button on:click={hideNotification} class="font-extrabold">x</button>
    </div>
{/if}