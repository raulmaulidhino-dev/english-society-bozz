<script>
    import logo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import logo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import defaultPFP from '$lib/images/defaults/default_pfp.svg';
    import Navigation from './Navigation.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { isLoggedIn } from '../stores/auth.js';

    function login() {
        window.location.href = "\login";
    }

</script>

<header class="py-8 px-6 border-b-2 flex justify-between items-center">
    <section class="logo max-w-48 flex justify-center items-center gap-4">
        <picture>
            <source type="image/webp" srcset={logo} />
            <img src={logo_fallback} alt="English Society-Bozz logo" class="h-12" />
        </picture>
        <p class="font-montserrat font-bold text-sm">ENGLISH<br /> SOCIETY-BOZZ</p>
    </section>
    <Navigation />
    {#if !$isLoggedIn }
        {#if $page.url.pathname === "/login"}
            <div></div>
        {:else}
            <button class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-primary_hover rounded-full" on:click={login}>LOGIN</button>
        {/if }
    {:else if $page.url.pathname !== "/login"}
        <div>
            <a href="/dashboard">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={defaultPFP} alt="Default Profile Photo" class="h-12"/>
            </a>
        </div>
    {/if }
</header>