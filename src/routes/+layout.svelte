<script>
	import Header from './Header.svelte';
	import NavigationMobile from './NavigationMobile.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />
	<NavigationMobile />

	<main>
		<slot />
	</main>

	<Footer />
</div>