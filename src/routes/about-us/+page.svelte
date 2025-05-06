<script lang="ts">
	import AboutUs from "./AboutUs.svelte";
	import type { ESBozzData } from "$lib/types/esbozz/data/esbozz";
	import type { ESBozzOfficers } from "$lib/types/esbozz/officer/officers";

	interface Props {
		data: {
			esbozzData: ESBozzData;
			esbozzOfficers: ESBozzOfficers;
		}
	}

	let { data }: Props = $props();
	
</script>

<svelte:head>
	<title>About Us | English Society-Bozz</title>
	<meta name="description" content="About English Society-Bozz" />
</svelte:head>

<AboutUs esbozzData={data.esbozzData} esbozzOfficers={data.esbozzOfficers} />