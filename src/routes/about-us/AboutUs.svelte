<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    import ESBozzLogo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import ESBozzLogo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import SmansaLogo from '$lib/images/logos/sman1bobotsari-logo.webp';
    import SmansaLogo_fallback from '$lib/images/logos/sman1bobotsari-logo.png';

    import InfoModal from '$lib/components/modals/InfoModal.svelte';

    import { Icon, PencilSquare as EditIcon } from 'svelte-hero-icons';

    import type { ESBozzData } from "$lib/types/esbozz/data/esbozz";
  	import type { ESBozzOfficers } from "$lib/types/esbozz/officer/officers";

    interface Props {
      esbozzData: ESBozzData;
      esbozzOfficers: ESBozzOfficers;
      roles: string[];
    }

    let { esbozzData, esbozzOfficers, roles }: Props = $props();

    let showModal: boolean = $state(false);

    const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    onMount(() => {
      AOS.init({ duration: 1200 });
    });

</script>

<section class="bg-slate-200 md:p-8 mx-auto px-4 py-8 md:py-12 md:px-10 space-y-8">
  <div data-aos="zoom-in" class="text-center bg-white pt-16 pb-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
    <p class="text-lg text-gray-600">
      Welcome to <strong class="font-semibold" translate="no">English Society</strong>, a passionate group of English learners dedicated to <span class="italic text-primary font-medium">{esbozzData.focus}</span>
    </p>
  </div>

  <div data-aos="zoom-in" class="text-center bg-white pt-8 pb-6 px-6 max-w-sm rounded-2xl mx-auto shadow-lg space-y-6">
    <a href="/">
      <picture>
          <source type="image/webp" srcset={ESBozzLogo} />
          <img src={ESBozzLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-full">
      </picture>
    </a>
    <a href={"/download-assets"} class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">DOWNLOAD LOGO ASSETS</a>
  </div>

  <div data-aos="zoom-in" class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
    <p class="text-gray-600 text-base">
      Our mission is to <span class="font-medium">{esbozzData.mission}</span>. We aim to foster a culture of collaboration, leadership, and meaningful growth.
    </p>
  </div>

  <div data-aos="zoom-in" class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">What We Do</h2>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      {#each esbozzData.activities as activity}
        <li>{capitalized(activity)}</li>
      {/each}
    </ul>
  </div>

  <div data-aos="zoom-in" class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Our Recent Officers</h2>
    <ul class="text-gray-600 space-y-1">
      <li><span class="font-medium">President:</span> {esbozzOfficers.president}</li>
      <li><span class="font-medium">Vice President:</span> {esbozzOfficers.vice_president}</li>
      <li><span class="font-medium">Secretary I:</span> {esbozzOfficers.secretary_1}</li>
      <li><span class="font-medium">Secretary II:</span> {esbozzOfficers.secretary_2}</li>
      <li><span class="font-medium">Treasurer I:</span> {esbozzOfficers.treasurer_1}</li>
      <li><span class="font-medium">Treasurer II:</span> {esbozzOfficers.treasurer_2}</li>
    </ul>
  </div>

  <div data-aos="zoom-in" class="text-center bg-white max-w-sm py-8 px-6 md:py-12 md:px-10 rounded-2xl mx-auto shadow-lg">
    <a href="http://sman1bobotsari.sch.id" target="_blank">
      <picture>
          <source type="image/webp" srcset={SmansaLogo} />
          <img src={SmansaLogo_fallback} alt="SMA Negeri 1 Bobotsari logo" loading="lazy" class="w-full"/>
      </picture>
    </a>
  </div>

  <div data-aos="zoom-in" class="text-center bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Get Involved</h2>
    <p class="text-gray-600 mb-4">
      We’re always excited to welcome new members. Reach out through our <a href="https://www.instagram.com/englishsocietybozz/" target="_blank" class="text-blue-600 hover:underline">Instagram</a> and connect with us on social media!
    </p>
    {#if esbozzData.join_us_url}
        <a href={esbozzData.join_us_url} target="_blank" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">JOIN US</a>
    {:else}
        <button onclick={() => showModal = true} class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">JOIN US</button>
    {/if}
  </div>
  {#if roles.includes("teacher") || roles.includes("officer")}
    <button onclick={() => goto("/about-us/edit")} title="Edit Page" class={`text-primary bg-secondary p-4 border-secondary border-2 rounded-full fixed z-[999] right-4 bottom-4 shadow-xl hover:bg-primary hover:text-secondary z- ${ true ? "" : "hidden" }`}>
      <Icon src={EditIcon} size="40" />
    </button>
  {/if}
</section>

<InfoModal
  show={showModal}
  title={"Information"}
  message={"Thank you for your interest. At this time, we're not accepting new members. Please check back at the start of the new school year for future opportunities! 💙"}
  OK_label={"OK, GOT IT!"}
  OK_event={() => showModal = false}
/>