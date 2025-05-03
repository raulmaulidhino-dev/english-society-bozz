<script lang="ts">
  import Pagination from "$lib/components/Pagination.svelte";
  import Notification from '$lib/components/Notification.svelte';

  import type { AchievementResponse } from "$lib/types/achievement/achievement";
  import type { AxiosError } from "axios";

  interface Props {
      achievements?: AchievementResponse[],
      pageCount?: number;
      pageNum?: number;
      error?: AxiosError;
  }

  let { achievements, pageCount, pageNum, error }: Props = $props();

  let notificationMessage = $state("");
  let notificationType = $state("");
  let showNotification = $state(false);

</script>

<section>
  <h1 class="text-3xl sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Our Recent Achievements</h1>
  <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
    {#if achievements}
      <span></span>
    {:else}
        <section class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg col-span-4">
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No achiev's found here.</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Looks like you have reached <span class="font-bold">"The End"</span> of the page!</p>
                <a href="/achievements" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-2 md:px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">SEE OUR RECENT ACHIEV'S</a>
            </div>
        </section>        
    {/if}
  </section>
  <Pagination currentPage={pageNum ?? 1} totalPages={pageCount ?? 1} delta={2} goToPageURL={"/achievements"} />
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}