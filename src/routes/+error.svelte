<script lang="ts">
    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<svelte:head>
	<title>{ `Something went wrong` }</title>
	<meta name="description" content={ `Oops! An unexpected error occurred.` } />
</svelte:head>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section data-aos="zoom-in" class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg">
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl text-primary-600 animate-bounce">4<span class="text-secondary">0</span>4</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Something's missing</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                <a href="/" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">GO TO HOMEPAGE</a>
            </div>

    </section>
</section>
