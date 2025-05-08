<script lang="ts">
	import Hero from './Hero.svelte';
	import Insights from './Insights.svelte';
	import Numbers from './Numbers.svelte';
	import WordOfTheDay from './WordOfTheDay.svelte';
	import FunActivities from './FunActivities.svelte';
	import CapturedMoments from './CapturedMoments.svelte';

	interface Props {
		data: {
			join_now_url: string | null;
		}
	}

	let { data }: Props = $props();

</script>

<svelte:head>
	<title>English Society-Bozz</title>
	<meta name="description" content="Fluent Minds, Global Hearts! • Speak Up, Express Yourself: Join our Community!" />
</svelte:head>

<Hero join_now_url ={data.join_now_url} />
<Insights />
<Numbers />
<WordOfTheDay />
<FunActivities />
<CapturedMoments />