<script lang="ts">
  import Modal from "./Modal.svelte";

  import { Icon, ExclamationCircle as InfoIcon } from "svelte-hero-icons";

  import type { MouseEventHandler } from "svelte/elements";


  interface Props {
    show: boolean;
    title: string;
    message: string;
    OK_label: string;
    OK_event: MouseEventHandler<HTMLButtonElement>;
  }

  let { show = false, title = "Info", message = "", OK_label = "OK", OK_event = () => {} }: Props = $props();

</script>

<Modal show={show}>
  {#snippet children()}
          <div class="mb-4 flex items-center gap-4">
              <div class="text-blue-500 bg-blue-200 rounded-full p-2">
                  <Icon src={InfoIcon} size="28"/>
              </div>
              <h2 class="text-xl font-semibold">{title}</h2>
          </div>
          <p class="text-sm mb-[1.5em]">{message}</p>
          <div class="flex justify-end items-stretch gap-2">
              <button onclick={OK_event} class="text-white text-xs font-bold bg-primary border-2 border-primary hover:text-primary hover:bg-secondary px-4 py-2 rounded-full">{OK_label}</button>
          </div>
  {/snippet}
</Modal>
