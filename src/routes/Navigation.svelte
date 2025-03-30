<script>
    import { onMount } from 'svelte';

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
        { href: '/', text: "Events" },
        { href: '/', text: "Achievements"},
        { href: '/', text: "About Us"},
    ];

</script>
{#if screenWidth >= 768}
    <nav>
        <ul class="flex p-4 justify-around items-center gap-6">
            {#each navItems as navItem}
                <li title={navItem.text} class="font-semibold"><a href={navItem.href} >{navItem.text}</a></li>
            {/each}
        </ul>
    </nav>
{/if}