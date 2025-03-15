<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { isLoggedIn } from '../stores/auth.js';


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
        { href: '/', icon: Events, text: "Events" },
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
    <nav class="bg-primary border-t-2 fixed bottom-0 right-0 left-0 z-50">
        <ul class="flex p-3 justify-around items-center">
            {#each navItems as navItem}
                <li title={navItem.text} 
                    class="text-primary bg-secondary border-2 border-primary rounded-[50%] p-2 -translate-y-8"
                    class:is-active={isActive(navItem.href)}
                >
                    <a href={navItem.href}><Icon src={navItem.icon} size="32" /></a>
                </li>
            {/each}
        </ul>
    </nav>
{:else}
    <nav>
        <ul class="flex p-4 justify-around items-center gap-6">
            {#each navItems as navItem}
                <li title={navItem.text} class="font-semibold"><a href={navItem.href} >{navItem.text}</a></li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    .is-active {
        @apply text-secondary bg-primary border-2 border-secondary;
    }
</style>