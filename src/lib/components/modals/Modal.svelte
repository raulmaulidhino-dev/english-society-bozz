<script lang="ts">
  const { children, show = false } = $props();
</script>

{#if children}
  <div class={`fixed inset-0 bg-black/50 flex items-center justify-center z-[999] ${ show ? "" : "hidden" }`}>
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
      {@render  children()}
    </div>
  </div>
{/if}