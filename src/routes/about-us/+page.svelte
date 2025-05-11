<script lang="ts">
	import AboutUs from "./AboutUs.svelte";
	import type { ESBozzData } from "$lib/types/esbozz/data/esbozz";
	import type { ESBozzOfficers } from "$lib/types/esbozz/officer/officers";

	interface Props {
		data: {
			esbozzData: ESBozzData;
			esbozzOfficers: ESBozzOfficers;
			roles: string[];
		}
	}

	let { data }: Props = $props();
	
</script>

<svelte:head>
	<title>About Us | English Society-Bozz</title>
	<meta name="description" content="About English Society-Bozz" />
	
	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="English Society-Bozz" />
	<meta property="og:description" content="About English Society-Bozz" />
	<meta property="og:image" content="https://english-society-bozz.vercel.app/assets/logos/esbozz-logo-og.jpg" />
	<meta property="og:url" content="https://english-society-bozz.vercel.app/about-us" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="english-society-bozz.vercel.app" />
	<meta property="twitter:url" content="https://english-society-bozz.vercel.app/about-us" />
	<meta property="twitter:title" content="English Society-Bozz" />
	<meta property="twitter:description" content="About English Society-Bozz" />
	<meta property="twitter:image" content="https://english-society-bozz.vercel.app/assets/logos/esbozz-logo-og.jpg" />
</svelte:head>

<AboutUs esbozzData={data.esbozzData} esbozzOfficers={data.esbozzOfficers} roles={data.roles} />