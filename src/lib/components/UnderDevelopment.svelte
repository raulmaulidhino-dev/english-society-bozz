<script>
    import { Icon, WrenchScrewdriver as UnDevIcon } from 'svelte-hero-icons';
</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg">
        <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
            <div class="text-secondary aspect-ratio border-4 border-dashed border-primary rounded-full p-6 mb-8 animate-pulse"><Icon src={UnDevIcon} size="108" /></div>
            <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
            <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Coming Soon!</p>
            <p class="mb-6 text-md font-light text-gray-500 max-w-80">This page is currently under development. Check back soon!</p>
            <a href="/" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">GO TO HOMEPAGE</a>
        </div>
    </section>
</section>
