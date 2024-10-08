<script>
    import logo from '$lib/images/logos/esbozz-logo.webp';
    import logo_fallback from '$lib/images/logos/esbozz-logo.png';
    import Navigation from './Navigation.svelte';
</script>

<header class="py-8 px-6 border-b-2 flex justify-between items-center">
    <section class="logo max-w-48 flex justify-center items-center">
        <picture>
            <source type="image/webp" srcset={logo} />
            <img src={logo_fallback} alt="English Society-Bozz logo" class="h-16" />
        </picture>
        <p class="font-montserrat font-bold text-sm">ENGLISH<br /> SOCIETY-BOZZ</p>
    </section>
    <Navigation />
</header>