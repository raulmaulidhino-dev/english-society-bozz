<script lang="ts">
	import AboutUsEdit from "./AboutUsEdit.svelte";
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
	<title>About Us (Edit) | English Society-Bozz</title>
	<meta name="description" content="Edit the content of English Society-Bozz About Page" />
</svelte:head>

<AboutUsEdit esbozzData={data.esbozzData} esbozzOfficers={data.esbozzOfficers} />
