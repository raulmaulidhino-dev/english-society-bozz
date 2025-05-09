<script lang="ts">
  let { show = $bindable(false), avatar } = $props();

  let handleClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) show = false;
  }

</script>

<button onclick={handleClick} class={`fixed inset-0 bg-black/70 flex items-center justify-center z-[999] ${ show ? "" : "hidden" }`}>
  <div class="rounded-full shadow-xl max-w-md w-full mx-10">
    <img src={avatar} alt="My Avatar" class="w-full rounded-[inherit]" />
  </div>
</button>
