<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { isLoggedIn } from '../stores/auth.js';
    import { isNavShowed } from '../stores/store.js';
    import defaultPFP from '$lib/images/defaults/default_pfp.svg';

    function login() {
        window.location.href = "\login";
    }

    import { Icon, Home, CalendarDays as Events, Trophy as Achievements, InformationCircle as AboutUs, User as Profile } from 'svelte-hero-icons';

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

    let navItems = [
        { href: '/', icon: Home, text: "Home" },
        { href: '/events', icon: Events, text: "Events" },
        { href: '/', icon: Achievements, text: "Achievements"},
        { href: '/', icon: AboutUs, text: "About Us"},
    ];

    const profileNavItem = { href: '/user/profile', icon: Profile, text: "Profile"};

    if ($isLoggedIn) navItems = [...navItems, profileNavItem];
    else navItems = navItems.filter(navItem => JSON.stringify(navItem) !== JSON.stringify(profileNavItem));

    $: isActive = (href) => {
        if (href === '/') return $page.url.pathname === href;
        return $page.url.pathname.startsWith(href);
    };

</script>

{#if screenWidth < 768}
    <nav class={`bg-white shadow-lg sticky top-0 overflow-hidden transition-all duration-500 ease-in-out ${ $isNavShowed ? 'z-[99] max-h-full' : 'z-[-1] max-h-0 -translate-y-full'}`}>
        <ul class="p-4 flex justify-center gap-2">
            {#each navItems as navItem}
                <li title={navItem.text}
                    class="text-primary bg-secondary border-2 border-primary rounded-[50%] p-2"
                    class:is-active={isActive(navItem.href)}
                >
                    <a href={navItem.href}><Icon src={navItem.icon} size="32" /></a>
                </li>
            {/each}
        </ul>
        {#if !$isLoggedIn }
            {#if $page.url.pathname === "/login"}
                <div></div>
            {:else}
                <button class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-primary_hover w-full rounded-b-[inherit]" on:click={login}>LOGIN</button>
            {/if }
        {:else if $page.url.pathname !== "/login"}
            <div>
                <a href="/user/profile" class="w-full flex gap-4 border-t-2 p-4">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img src={defaultPFP} alt="Default Profile Photo" class="max-h-12 border-2 border-transparent rounded-[50%]"/>
                    <div class="font-bold max-h-12 flex items-center justify-center">ME</div>
                </a>
            </div>
        {/if }
    </nav>
{/if}

<style>
    .is-active {
        @apply text-secondary bg-primary border-2 border-secondary;
    }
</style>