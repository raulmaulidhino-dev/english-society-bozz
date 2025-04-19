<script>

    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    import { isNavShowed, toggleNav } from '$lib/stores/store';

    import { Icon, Home, CalendarDays as Events, Trophy as Achievements, InformationCircle as AboutUs, User as Profile, Cog6Tooth as SettingsIcon } from 'svelte-hero-icons';
    let { userProfile, isLoggedIn } = $props();

    async function login() {
        goto("/login");
    }

    async function goToProfile() {
        toggleNav();
        goto("/user/profile");
    }

    async function goToSettings() {
        toggleNav();
        goto("/user/settings");
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

    let navItems = [
        { href: '/', icon: Home, text: "Home" },
        { href: '/events', icon: Events, text: "Events" },
        { href: '/achievements', icon: Achievements, text: "Achievements"},
        { href: '/about-us', icon: AboutUs, text: "About Us"},
    ];

    let isActive = $derived((href) => {
        if (href === '/') return $page.url.pathname === href;
        return $page.url.pathname.startsWith(href);
    });

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
        {#if !isLoggedIn}
            {#if $page.url.pathname === "/login"}
                <div></div>
            {:else}
                <button class="text-white text-sm px-4 py-2 font-bold bg-primary hover:text-primary hover:bg-secondary w-full rounded-b-[inherit]" onclick={login}>LOG IN</button>
            {/if }
        {:else if $page.url.pathname !== "/login"}
            <div>
                <section class="w-full h-fit flex items-center gap-4 border-t-2 p-4">
                    <button onclick={goToProfile} class={`text-white bg-primary border-2 border-secondary rounded-[50%] ${ userProfile?.avatar_url ? "" : "p-2" }`}>
                        {#if userProfile?.avatar_url}
                            <img src={userProfile.avatar_url} alt={`${userProfile?.nickname ?? "User"}'s avatar`} class="w-12 aspect-square rounded-[inherit]" />
                        {:else}
                            <Icon src={Profile} solid size="32" />
                        {/if}
                    </button>
                    <button onclick={goToProfile} class="font-bold flex items-center justify-center">{ userProfile?.nickname ?? "Me" }</button>
                    <button onclick={goToSettings} title="Settings"
                        class="text-primary bg-secondary aspect-square border-2 border-primary rounded-[50%] p-1 ml-auto"
                        class:is-active={isActive("/user/settings")}
                    >
                        <Icon src={SettingsIcon} solid size="25"/>
                    </button>
                </section>
            </div>
        {/if}
    </nav>
{/if}

<style>
    .is-active {
        @apply text-secondary bg-primary border-2 border-secondary;
    }
</style>