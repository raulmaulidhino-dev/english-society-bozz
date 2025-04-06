<script>
	import Header from './Header.svelte';
	import NavigationMobile from './NavigationMobile.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';

	import { afterNavigate, beforeNavigate } from '$app/navigation';
	
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { isLoading } from '$lib/stores/loading.js';

	beforeNavigate(() => {
		isLoading.set(true);
	});

	afterNavigate(() => {
		isLoading.set(false);
	});

</script>

<div class={`app ${$isLoading ? "hidden" : ""}`}>
	<Header />
	<NavigationMobile />

	<main>
		<slot />
	</main>

	<Footer />
</div>

{#if $isLoading}
	<LoadingSpinner />
{/if}
