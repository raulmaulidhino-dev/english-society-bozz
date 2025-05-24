<script lang="ts">
    import { onMount } from 'svelte';

    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    import Navigation from './Navigation.svelte';
    import logo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import logo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import { Icon, Bars2 as ShowButton, XMark as CloseButton, User as ProfileIcon, Cog6Tooth as SettingsIcon } from 'svelte-hero-icons';

    import { isNavShowed, toggleNav } from '$lib/stores/store';
    
    import type { UserProfile } from '$lib/types/user/user';

    interface Props {
        userProfile: UserProfile | null;
        isLoggedIn: boolean;
    }

    let { userProfile, isLoggedIn }: Props = $props();

    function login() {
        goto("/login");
    }

    function goToProfile() {
        toggleNav();
        goto("/user/profile");
    }

    let screenWidth = $state(0);
    let profileMiniWindowRef: HTMLDivElement | undefined = $state();
    let profileButtonRef: HTMLButtonElement | undefined = $state();

    let showProfileMiniWindow: boolean = $state(false);

    const toggleShowProfileMiniWindow = () => {
        showProfileMiniWindow = !showProfileMiniWindow;
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (!profileMiniWindowRef?.contains(e.target as Node) && !profileButtonRef?.contains(e.target as Node)) {
            showProfileMiniWindow = false;
        }
    }

    onMount(() => {
        screenWidth = window.innerWidth;

        const handleResize = () => {
            screenWidth = window.innerWidth;
        }

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);

        }

    });

</script>

<header class="bg-white py-8 px-6 border-b-2 flex justify-between items-center relative z-[999]">
    <section class="logo max-w-48 flex justify-center items-center gap-4">
        <picture>
            <source type="image/webp" srcset={logo} />
            <img src={logo_fallback} alt="English Society-Bozz logo" class="h-12" loading="lazy" />
        </picture>
        <p class="font-montserrat font-bold text-sm" translate="no">ENGLISH<br /> SOCIETY-BOZZ</p>
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
            <button bind:this={profileButtonRef} onclick={toggleShowProfileMiniWindow} class="relative">
                <div class={`text-white bg-primary border-2 border-secondary rounded-[50%] aspect-square ${ userProfile?.avatar_url ? "" : "p-2" }`}>
                    {#if userProfile?.avatar_url}
                        <img src={userProfile.avatar_url} alt={`${userProfile?.nickname ?? "User"}'s avatar'`} class="w-12 aspect-square rounded-[inherit]" loading="lazy" />
                    {:else}
                        <Icon src={ProfileIcon} solid size="32" />
                    {/if}
                </div>
            </button>
            {#if showProfileMiniWindow}
                <div class="bg-white border-2 rounded-lg p-6 right-4 shadow-lg absolute top-[94px] flex flex-col gap-4">
                    <section class="w-full h-fit flex items-center gap-3">
                        <button onclick={goToProfile} class={`text-white bg-primary border-2 border-secondary rounded-[50%] ${ userProfile?.avatar_url ? "" : "p-2" }`}>
                            {#if userProfile?.avatar_url}
                                <img src={userProfile.avatar_url} alt={`${userProfile?.nickname ?? "User"}'s avatar`} class="w-8 aspect-square rounded-[inherit]" loading="lazy" />
                            {:else}
                                <Icon src={ProfileIcon} solid size="32" />
                            {/if}
                        </button>
                        <button onclick={goToProfile} class="font-bold text-sm flex items-center justify-center hover:text-primary hover:underline hover:decoration-secondary">{ userProfile?.nickname ?? "Me" }</button>
                    </section>
                    <hr />
                    <div bind:this={profileMiniWindowRef} class="font-semibold text-sm hover:text-primary hover:font flex items-center gap-2">
                        <Icon src={SettingsIcon} size="18" />
                        <button onclick={() => goto("/user/settings")}>Settings</button>
                    </div>
                </div>
            {/if}
        {:else}
            <button class="text-white hover:text-primary text-sm border-2 border-primary px-4 py-2 font-bold bg-primary hover:bg-secondary rounded-full inline-block invisible" onclick={login}>LOG IN</button>
        {/if}
    {/if}
</header>