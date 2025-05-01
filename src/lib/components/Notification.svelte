<script lang="ts">
    import { Icon, XCircle as CloseBtn } from 'svelte-hero-icons';
    let { message = "", type = "success", duration = 5000 } = $props();

    let visible: boolean = $state(true);

    const hideNotification = () => {
        visible = false;
    };

    setTimeout(hideNotification, duration);
</script>

{#if visible}
    <div class="fixed top-5 left-5 right-5 sm:left-1/2 sm:right-0 z-[999] sm:-translate-x-1/2 flex items-center justify-between p-4 rounded-lg shadow-xl text-white max-w-xl transition-opacity duration-500 ease-in-out cursor-pointer { type === "error" ? 'bg-red-500' : type === "success" ? 'bg-green-500' : 'bg-blue-500' }">
        <p>{ message }</p>
        <button onclick={hideNotification} class="ml-2"><Icon src={CloseBtn} solid size="30" /></button>
    </div>
{/if}