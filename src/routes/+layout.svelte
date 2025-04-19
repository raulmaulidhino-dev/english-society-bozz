<script>
	import Header from './Header.svelte';
	import NavigationMobile from './NavigationMobile.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';

	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { userProfile, isLoggedIn } from '$lib/stores/auth';
	
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { isLoading } from '$lib/stores/loading';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	beforeNavigate(() => {
		isLoading.set(true);
	});

	afterNavigate(() => {
		isLoading.set(false);
	});

</script>

<div class={`app ${$isLoading ? "hidden" : ""}`}>
	<Header userProfile={$userProfile} isLoggedIn={$isLoggedIn} />
	<NavigationMobile userProfile={$userProfile} isLoggedIn={$isLoggedIn} />

	<main>
		{@render children?.()}
	</main>

	<Footer />
</div>

{#if $isLoading}
	<LoadingSpinner />
{/if}
