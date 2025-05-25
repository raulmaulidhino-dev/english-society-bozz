<script lang="ts">
  import FormatFileCard from './FormatFileCard.svelte';

  import ESBozzLogo from '$lib/images/logos/es-bozz-logo-transparent.webp';
  import ESBozzLogo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';

  import { FileImage as PNG_Icon, FileCode as SVG_Icon, FileText as PDF_Icon } from '@lucide/svelte';
  import type { Icon as IconType } from '@lucide/svelte';

  interface DownloadFile {
    sizeInPX?: string;
    sizeLevel?: string;
    filepath: string;
  }

  interface FormatFileData {
    titleIcon?: {
      icon: typeof IconType;
      color: string;
    }
    title: string;
    subtitle?: string;
    downloads: DownloadFile[];
  }

  let formatFileData: FormatFileData[] = [
    {
      titleIcon: {
        icon: PNG_Icon,
        color: "#4CAF50",
      },
      title: "PNG",
      subtitle: "Best for web use, social media, presentations, raster-based display.",
      downloads: [
        {sizeInPX: "1080 × 1080", sizeLevel: "Original", filepath: "/assets/logos/esbozz-logo-1080px.png"},
        {sizeInPX: "1000 × 1000", sizeLevel: "Large", filepath: "/assets/logos/esbozz-logo-1000px.png"},
        {sizeInPX: "500 × 500", sizeLevel: "Medium", filepath: "/assets/logos/esbozz-logo-500px.png"},
        {sizeInPX: "300 × 300", sizeLevel: "Small", filepath: "/assets/logos/esbozz-logo-300px.png"},
      ]
    },
    {
      titleIcon: {
        icon: SVG_Icon,
        color: "#FF9800",
      },
      title: "SVG",
      subtitle: "Best for web, UI, apps, responsive design.",
      downloads: [
        {filepath: "/assets/logos/esbozz-logo.svg"},
      ]
    },
    {
      titleIcon: {
        icon: PDF_Icon,
        color: "#D32F2F",
      },
      title: "PDF",
      subtitle: "Best for print, documentation, sharing with printers.",
      downloads: [
        {filepath: "/assets/logos/esbozz-logo.pdf"},
      ]
    },
  ];

</script>

<section class="bg-slate-200 md:p-8 px-4 py-8 md:py-12 md:px-10 space-y-8">

  <div data-aos="zoom-in" class="text-center bg-white pt-16 pb-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Download Assets</h1>
    <p class="text-lg text-gray-600">Download <span translate="no">English Society-Bozz</span> logos and components in various formats ✨</p>
  </div>

  <div data-aos="zoom-in" class="text-center bg-white py-8 px-6 max-w-sm rounded-2xl mx-auto shadow-lg">
    <picture>
        <source type="image/webp" srcset={ESBozzLogo} />
        <img src={ESBozzLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-full">
    </picture>
  </div>

  {#each formatFileData as data}
    <FormatFileCard
      titleIcon={data.titleIcon}
      title={data.title}
      subtitle={data.subtitle}
      downloads={data.downloads}
    />
  {/each}
</section>