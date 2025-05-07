<script lang="ts">
  import { onMount } from 'svelte';
  import { Download as DownloadIcon } from '@lucide/svelte';
  import type { Icon as IconType } from '@lucide/svelte';

  import AOS from 'aos';
  import 'aos/dist/aos.css';

  interface DownloadFile {
    sizeInPX?: string;
    sizeLevel?: string;
    filepath: string;
  }

  interface Props {
    titleIcon?: {
      icon: typeof IconType;
      color: string;
    }
    title: string;
    subtitle?: string;
    downloads: DownloadFile[];
  }

  let { titleIcon, title, subtitle, downloads }: Props = $props();

  let selectedFile: string = $state(downloads[0].filepath);

  onMount(() => {
    AOS.init({ duration: 1200 });
  });

</script>

<article data-aos="zoom-in" class="bg-white max-w-sm pt-8 pb-6 px-6 rounded-2xl mx-auto shadow-lg">
  <div class="mb-[1em] flex items-center wrap gap-2">
    {#if titleIcon}{@const Icon = titleIcon.icon}<Icon size="30" color={titleIcon.color} />{/if}
    <h1 class="text-3xl font-semibold text-gray-800">{title}</h1>
  </div>
  {#if subtitle}<p class="text-gray-600 text-lg mb-[1em]">{subtitle}</p>{/if}
  {#if downloads.length > 1}
    <p class="text-sm font-bold mb-[1em]">Choose a size or type:</p>
    <div class="flex flex-col gap-2 mb-[1.5em]">
      {#each downloads as download}
        <label class="text-sm flex items-center py-4 px-4 rounded-lg hover:bg-sky-100" class:bg-sky-100={selectedFile === download.filepath}>
          <input type="radio" bind:group={selectedFile} value={download.filepath} class="mr-3" />
          {#if download.sizeLevel}<span class="text-primary font-semibold mr-1">{download.sizeLevel}</span>{/if}
          {#if download.sizeInPX && download.sizeLevel}<span class="font-medium"> • {download.sizeInPX}</span>{/if}
        </label>
      {/each}
    </div>
  {/if}
  <a href={selectedFile} download class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block"><DownloadIcon size="16" class="inline mr-1" /> DOWNLOAD FILE</a>
</article>