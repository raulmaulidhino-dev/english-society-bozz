<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

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
        { href: '/', text: "Home" },
        { href: '/events', text: "Events" },
        { href: '/', text: "Achievements"},
        { href: '/', text: "About Us"},
    ];

    $: isActive = (href) => {
        if (href === '/') return $page.url.pathname === href;
        return $page.url.pathname.startsWith(href);
    };

</script>
{#if screenWidth >= 768}
    <nav>
        <ul class="flex p-4 justify-around items-center gap-6">
            {#each navItems as navItem}
                <li title={navItem.text} class="font-semibold">
                    <a href={navItem.href} class="nav-item hover:text-primary" class:is-active={isActive(navItem.href)}>{navItem.text}</a>
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

    .nav-item.is-active::after {
        visibility: visible;
        transform: scaleX(1);
    }

</style>