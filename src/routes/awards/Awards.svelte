<script lang="ts">

  import axios from 'axios';

  import { onMount } from 'svelte';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  import AwardCard from "$lib/components/AwardCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import Notification from '$lib/components/Notification.svelte';

  import { Search as SearchIcon, SlidersHorizontal as FilterAndSortIcon, CircleX as CloseIcon } from '@lucide/svelte';

  import type { AwardResponse } from "$lib/types/award/award";
  import type { AxiosError } from "axios";
  import type { ErrorResponse } from '$lib/types/error/error';

  interface Props {
      awards?: AwardResponse[],
      pageCount?: number;
      pageNum?: number;
      error?: AxiosError;
      showPagination: boolean;
      awardCategories: { category: string }[];
      awardLevels: { level: string }[];
      awardTitles: { title: string }[];
      search: string;
      sortBy: string;
      sortOrder: string;
      category: string | null;
      level: string | null;
      title: string | null;
  }

  let { awards, pageCount, pageNum, error, awardCategories, awardLevels, awardTitles, showPagination = true, search = '', sortBy = 'date', sortOrder = 'desc', category = null, level = null, title = null }: Props = $props();

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
      if (category?.trim()) params.set('category', category);
      if (level?.trim()) params.set('level', level);
      if (title?.trim()) params.set('title', title);

      window.location.search = params.toString();
  }

  let showFilterPopup: boolean = $state(false);

  async function openFilterPopup(e: Event) {
    e.stopPropagation();
    showFilterPopup = !showFilterPopup;
  }

  async function applyFilter() {
    const params = new URLSearchParams();

    if (sortOrder.trim()) params.set('sortOrder', sortOrder);
    if (category?.trim()) params.set('category', category);
    if (level?.trim()) params.set('level', level);
    if (title?.trim()) params.set('title', title);

    window.location.search = params.toString();
  }

  async function clearFilter() {
    const params = new URLSearchParams();

    if (sortOrder.trim()) params.set('sortOrder', 'desc');
    params.delete('category');
    params.delete('level');
    params.delete('title');

    window.location.search = params.toString();
  }

  onMount(() => {
    AOS.init({ duration: 1200 });
  });

</script>

<section>
  <h1 data-aos="fade-right" class="text-3xl sm:text-4xl font-bold px-6 md:px-8 pt-6 mb-[1em]">Our Recent Awards</h1>
  <section class="bg-slate-200 px-6 md:px-8 py-6 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
    <section class="relative bg-white w-full max-w-lg mb-6 rounded-full shadow-lg col-span-full mx-auto flex pl-9 pr-12">
      <SearchIcon size="24" strokeWidth="4" class="text-primary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <button onclick={openFilterPopup} class="text-white bg-primary rounded-full absolute right-2 top-1/2 -translate-y-1/2 p-2" title="Open Filter and Sort Popup">
        {#if showFilterPopup}
          <CloseIcon size="22" strokeWidth="2" />
        {:else}
          <FilterAndSortIcon size="22" strokeWidth="2" />
        {/if}
      </button>
      <input
          type="input"
          bind:value={search}
          placeholder="Search awards..."
          onkeydown={(e) => e.key === 'Enter' && submitSearch()}
          class="h-full w-full p-4 rounded-[inherit] font-semibold focus:outline-none"
      />
      <div class="absolute z-[99] inset-x-0 top-[110%] bg-white border-2 rounded-xl p-4 md:p-6 shadow-xl" class:hidden={!showFilterPopup}>
        <h3 class="text-xl sm:text-2xl text-center font-semibold">Filter Awards</h3>
        <hr class="border-1 rounded-full my-4" />
        <div class="flex flex-col gap-1 grow">
          <label for="award_category" class="text-sm">Sort By :</label>
          <select bind:value={sortOrder} id="sort_by" required aria-required="true" class="text-sm font-semibold ml-1 p-2 rounded">
                  <option value="desc">Newest</option>
                  <option value="asc">Oldest</option>
          </select>
        </div>
        <section class="flex flex-wrap justify-center gap-4 my-6">
          <!-- Category Filter Input -->
          <div class="flex flex-col gap-1 grow">
              <label for="award_category" class="text-sm">Category :</label>
              <select bind:value={category} id="award_category" required aria-required="true" class="text-sm font-semibold ml-1 p-2 rounded">
                <option value={null} selected>All</option>
                  {#each awardCategories as c}
                      <option value={c.category}>{c.category}</option>
                  {/each}
              </select>
          </div>

          <!-- Title Filter Input -->
          <div class="flex flex-col gap-2 grow">
              <label for="award_title" class="text-sm">Title :</label>
              <select bind:value={title} id="award_title" required aria-required="true" class="text-sm font-semibold ml-1 p-2 rounded">
                <option value={null} selected>All</option>
                  {#each awardTitles as t}
                      <option value={t.title}>{t.title}</option>
                  {/each}
              </select>
          </div>

          <!-- Level Filter Input -->
          <div class="flex flex-col gap-2 grow">
              <label for="award_level" class="text-sm">Level :</label>
              <select bind:value={level} id="award_level" required aria-required="true" class="text-sm font-semibold ml-1 p-2 rounded">
                <option value={null} selected>All</option>
                  {#each awardLevels as l}
                      <option value={l.level}>{l.level}</option>
                  {/each}
              </select>
          </div>
        </section>
        <section class="flex gap-3">
          <button onclick={applyFilter} class="text-sm text-white bg-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center hover:text-primary hover:bg-secondary grow">APPLY</button>
          <button onclick={clearFilter} class="text-sm text-white bg-red-500 text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full self-center hover:text-white hover:bg-red-700 grow">CLEAR</button>
        </section>
      </div>
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
        <section data-aos="zoom-in" class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg col-span-full">
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No awards found here.</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Looks like you have reached <span class="font-bold">"The End"</span> of the page or got lost!</p>
                <a href="/awards" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-2 md:px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">SEE OUR RECENT AWARDS</a>
            </div>
        </section>        
    {/if}
  </section>
  {#if showPagination}
    <Pagination currentPage={pageNum ?? 1} totalPages={pageCount ?? 1} delta={2} goToPageURL={"/awards"} />
  {/if}
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}