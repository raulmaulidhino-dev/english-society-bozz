<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let screenWidth: number = $state(0);

    interface NavItem {
        href: string;
        text: string;
    }

    let navItems: NavItem[] = [
        { href: '/', text: "Home" },
        { href: '/events', text: "Events" },
        { href: '/awards', text: "Awards"},
        { href: '/about-us', text: "About Us"},
    ];

    let isActive = $derived((href: string) => {
        if (href === '/') return $page.url.pathname === href;
        return $page.url.pathname.startsWith(href);
    });

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
{#if screenWidth >= 768}
    <nav>
        <ul class="flex p-4 justify-around items-center gap-6">
            {#each navItems as navItem}
                <li title={navItem.text} class="font-semibold">
                    <button onclick={() => goto(navItem.href)} class="nav-item hover:text-primary" class:is-active={isActive(navItem.href)}>{navItem.text}</button>
                </li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    
    .nav-item {
        display: inline-block;
        position: relative;
    }

    .nav-item.is-active {
        color: #0F286C;
    }

    .nav-item::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #EFC007;
        visibility: hidden;
        transform: scaleX(0);
        transform-origin: bottom center;
        transition: transform 0.3s ease-in-out;
    }

    .nav-item.is-active::after, .nav-item:hover::after {
        visibility: visible;
        transform: scaleX(1);
    }

</style>