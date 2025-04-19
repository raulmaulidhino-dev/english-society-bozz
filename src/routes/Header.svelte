<script>

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    import Navigation from './Navigation.svelte';
    import logo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import logo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import { Icon, Bars2 as ShowButton, XMark as CloseButton, User as Profile } from 'svelte-hero-icons';

    import { isNavShowed, toggleNav } from '$lib/stores/store';
    import { onMount } from'svelte';
    let { userProfile, isLoggedIn } = $props();

    function login() {
        goto("/login");
    }

    function goToProfile() {
        toggleNav();
        goto("/user/profile");
    }

    let screenWidth = $state(0);

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
        <button onclick={toggleNav}><Icon src={
            $isNavShowed? CloseButton : ShowButton
        } size="40" /></button>
    {:else}
        {#if !isLoggedIn}
            {#if $page.url.pathname === "/login"}
                <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block invisible" onclick={login}>LOG IN</button>
            {:else}
                <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block" onclick={login}>LOG IN</button>
            {/if}
        {:else if $page.url.pathname !== "/login"}
            <button onclick={goToProfile}>
                <div class={`text-white bg-primary border-2 border-secondary rounded-[50%] aspect-square ${ userProfile?.avatar_url ? "" : "p-2" }`}>
                    {#if userProfile?.avatar_url}
                        <img src={userProfile.avatar_url} alt={`${userProfile?.nickname ?? "User"}'s avatar'`} class="w-12 aspect-square rounded-[inherit]" />
                    {:else}
                        <Icon src={Profile} solid size="32" />
                    {/if}
                </div>
            </button>
        {:else}
            <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block invisible" onclick={login}>LOG IN</button>
        {/if}
    {/if}
</header>