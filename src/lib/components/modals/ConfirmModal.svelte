<script lang="ts">
  import Modal from "./Modal.svelte";

  import { Icon, ExclamationTriangle as WarningIcon } from "svelte-hero-icons";

  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    show: boolean;
    title: string;
    message: string;
    cancelLabel: string;
    confirmLabel: string;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
  }

  let { show = false, title = "Warning!", message = "", cancelLabel = "CANCEL", confirmLabel = "CONFIRM", onConfirm = () => {}, onCancel = () => {} }: Props = $props();

</script>

{#if show}
	<Modal>
		{#snippet children()}
            <div class="mb-4 flex items-center gap-4">
                <div class="text-red-500 bg-red-200 rounded-full p-2">
                    <Icon src={WarningIcon} size="28"/>
                </div>
                <h2 class="text-xl font-semibold">{title}</h2>
            </div>
            <p class="text-sm mb-[1.5em]">{message}</p>
            <div class="flex justify-stretch items-stretch gap-2">
                <button onclick={onCancel} class="grow text-white text-xs font-bold bg-primary border-2 border-primary hover:text-primary hover:bg-secondary p-2 rounded-full">{cancelLabel}</button>
                <button onclick={onConfirm} class="grow text-white text-xs font-bold bg-red-700 border-2 border-red-700 hover:bg-red-900 hover:border-red-900 p-2 rounded-full">{confirmLabel}</button>
            </div>
		{/snippet}
	</Modal>
{/if}