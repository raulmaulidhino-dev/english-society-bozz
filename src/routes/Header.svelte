<script>    
    import logo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import logo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import { Icon, Bars2 as ShowButton, XMark as CloseButton, User as Profile } from 'svelte-hero-icons';
    import Navigation from './Navigation.svelte';
    import { page } from '$app/stores';
    import { isLoggedIn } from '../stores/auth.js';
    import { isNavShowed, toggleNav } from '../stores/store.js';
    import { onMount } from'svelte';

    function login() {
        window.location.href = "/login";
    }

    function goToProfile() {
        toggleNav();
        window.location.href = "/user/profile";
    }

    let screenWidth = 0;

    onMount(() => {
        screenWidth = window.innerWidth;

        const handleResize = () => {
            screenWidth = window.innerWidth;
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

</script>

<header class="bg-white py-8 px-6 border-b-2 flex justify-between items-center relative z-[999]">
    <section class="logo max-w-48 flex justify-center items-center gap-4">
        <picture>
            <source type="image/webp" srcset={logo} />
            <img src={logo_fallback} alt="English Society-Bozz logo" class="h-12" />
        </picture>
        <p class="font-montserrat font-bold text-sm">ENGLISH<br /> SOCIETY-BOZZ</p>
    </section>
    <Navigation />
    {#if screenWidth < 768}
        <button on:click={toggleNav}><Icon src={
            $isNavShowed? CloseButton : ShowButton
        } size="40" /></button>
    {:else}
        {#if !$isLoggedIn}
            {#if $page.url.pathname === "/login"}
                <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block invisible" on:click={login}>LOG IN</button>
            {:else}
                <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block" on:click={login}>LOG IN</button>
            {/if}
        {:else if $page.url.pathname !== "/login"}
            <button on:click={goToProfile}>
                <div class="text-white bg-primary border-2 border-secondary rounded-[50%] p-2">
                    <Icon src={Profile} solid size="32" />
                </div>
            </button>
        {:else}
            <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block invisible" on:click={login}>LOG IN</button>
        {/if}
    {/if}
</header>