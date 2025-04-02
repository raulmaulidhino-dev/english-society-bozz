<script>
	import {beforeUpdate, afterUpdate, onMount} from 'svelte';

	import Hero from './Hero.svelte';
	import Insights from './Insights.svelte';
	import Numbers from './Numbers.svelte';
	import FunActivities from './FunActivities.svelte';
	import CapturedMoments from './CapturedMoments.svelte';

	import LoadingSpinner from './loading/LoadingSpinner.svelte';

	let isLoading = true;

	onMount(() => {
        isLoading = false;
    });
</script>

<svelte:head>
	<title>ES-Bozz - Home</title>
	<meta name="description" content="English Society-Bozz Homepage" />
</svelte:head>

{#if isLoading}
	<LoadingSpinner />
{:else}
	<Hero />
	<Insights />
	<Numbers />
	<FunActivities />
	<CapturedMoments />
{/if}