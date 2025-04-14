<script>

  import { Icon, ChevronLeft as Left, ChevronRight as Right, ChevronDoubleLeft as DoubleLeft, ChevronDoubleRight as DoubleRight } from 'svelte-hero-icons';
  /**
   * @typedef {Object} Props
   * @property {number} [currentPage]
   * @property {number} [totalPages]
   * @property {number} [delta]
   */

  /** @type {Props} */
  let { currentPage = 1, totalPages = 1, delta = 2 } = $props();

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    window.location.href = `/events?page=${page}`;
  };

  function getPageNumbers(current, total, delta = 2) {
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  }
</script>

<!-- Mobile Compact View -->
<div class="flex justify-center items-center gap-2 sm:hidden mt-4 text-sm">
  <button
    onclick={() => goToPage(currentPage - 1)}
    class="text-white bg-primary p-1 border-2 border-primary rounded-xl hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentPage === 1}
  >
    <Icon mini src={Left} size="20" />
  </button>

  <span class="px-2">Page <span class="text-primary font-bold">{currentPage}</span> of <span class="font-bold">{totalPages}</span></span>

  <button
    onclick={() => goToPage(currentPage + 1)}
    class="text-white bg-primary p-1 border-2 border-primary rounded-xl hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentPage === totalPages}
  >
  <Icon mini src={Right} size="20" />
</button>
</div>

<!-- Desktop Full Pagination -->
<nav class="hidden sm:flex justify-center items-center flex-wrap gap-1 mt-4 text-sm">
  {#if currentPage > delta + 2}
    <button class="text-white bg-primary px-3 py-1 border-2 border-primary rounded hover:bg-secondary hover:text-primary" onclick={() => goToPage(1)}>
      <Icon mini src={DoubleLeft} size="20" />
    </button>
  {/if}

  <button
    onclick={() => goToPage(currentPage - 1)}
    class="text-white font-bold bg-primary px-3 py-1 border-2 border-primary rounded hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentPage === 1}
  >
    Prev
  </button>

  {#each getPageNumbers(currentPage, totalPages, delta) as page}
    {#if page === '...'}
      <span class="px-2 py-1 text-gray-500 select-none">...</span>
    {:else}
      <button
        class={`text-primary font-bold px-3 py-1 rounded border-2 border-primary hover:bg-secondary
                ${page === currentPage ? 'bg-secondary font-extrabold' : ''}`}
        onclick={() => goToPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}

  <button
    onclick={() => goToPage(currentPage + 1)}
    class="text-white font-bold bg-primary px-3 py-1 border-2 border-primary rounded hover:bg-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentPage === totalPages}
  >
    Next
  </button>

  {#if currentPage < totalPages - delta - 1}
    <button class="text-white bg-primary px-3 py-1 border-2 border-primary rounded hover:bg-secondary hover:text-primary" onclick={() => goToPage(totalPages)}>
      <Icon mini src={DoubleRight} size="18" />
    </button>
  {/if}
</nav>