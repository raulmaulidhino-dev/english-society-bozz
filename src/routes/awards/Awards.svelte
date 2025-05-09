<script lang="ts">

  import axios from 'axios';

  import { onMount } from 'svelte';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  import AwardCard from "$lib/components/AwardCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import Notification from '$lib/components/Notification.svelte';

  import { Search as SearchIcon } from '@lucide/svelte';

  import type { AwardResponse } from "$lib/types/award/award";
  import type { AxiosError } from "axios";
  import type { ErrorResponse } from '$lib/types/error/error';

  interface Props {
      awards?: AwardResponse[],
      pageCount?: number;
      pageNum?: number;
      error?: AxiosError;
      limit: number;
      search: string;
      sortBy: string;
      sortOrder: string;
  }

  let { awards, pageCount, pageNum, error, limit = 12, search = '', sortBy = 'date', sortOrder = 'desc' }: Props = $props();

  let notificationMessage = $state("");
  let notificationType = $state("");
  let showNotification = $state(false);

  if (axios.isAxiosError<ErrorResponse>(error)) {
      notificationMessage = error?.response?.data?.message || "Unknown Error";
      notificationType = "error";
      showNotification = true;
  }

  async function submitSearch() {
      const params = new URLSearchParams();

      if (search.trim()) params.set('search', search);
      if (sortBy.trim()) params.set('sortBy', sortBy);
      if (sortOrder.trim()) params.set('sortOrder', sortOrder);

      window.location.search = params.toString();
  }

  onMount(() => {
    AOS.init({ duration: 1200 });
  });

</script>

<section>
  <h1 data-aos="fade-right" class="text-3xl sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Our Recent Awards</h1>
  <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
    <section class="relative bg-white w-full max-w-lg mb-6 rounded-full shadow-lg col-span-full mx-auto flex px-9">
      <SearchIcon size="24" strokeWidth="4" class="text-primary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
          type="input"
          bind:value={search}
          placeholder="Search awards..."
          onkeydown={(e) => e.key === 'Enter' && submitSearch()}
          class="h-full p-4 rounded-[inherit] font-semibold focus:outline-none grow"
      />
    </section>
    {#if awards}
      {#if awards.length > 0}
        {#each awards as award}
          <AwardCard award={award} isEditable={false} />
        {/each}
      {:else}
        <p>It looks like there aren't any awards here yet...</p>   
      {/if}
    {:else}
        <section data-aos="zoom-in" class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg col-span-2 mx-auto">
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No awards found here.</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Looks like you have reached <span class="font-bold">"The End"</span> of the page!</p>
                <a href="/awards" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-2 md:px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">SEE OUR RECENT AWARDS</a>
            </div>
        </section>        
    {/if}
  </section>
  {#if awards && awards.length > limit}
    <Pagination currentPage={pageNum ?? 1} totalPages={pageCount ?? 1} delta={2} goToPageURL={"/awards"} />
  {/if}
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}