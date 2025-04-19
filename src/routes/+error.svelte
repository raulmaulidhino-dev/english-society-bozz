<script>
    import { page } from '$app/stores';
    import { defaultMeta } from '$lib/meta/meta';
</script>

<svelte:head>
	<title>{ `${$page.status} - Something went wrong` ?? defaultMeta.title }</title>
	<meta name="description" content={ `Oops! An unexpected error occurred.` ?? defaultMeta.description } />
</svelte:head>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg">
        {#if $page.status === 404}
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl text-primary-600 animate-bounce">4<span class="text-secondary">0</span>4</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Something's missing</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                <a href="/" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">GO TO HOMEPAGE</a>
            </div>
        {:else if $page.status === 500}
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl text-primary-600 animate-bounce">5<span class="text-secondary">0</span>0</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">We're experiencing a server issue</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Something broke on our side. Our team is fixing it ASAP!.</p>
                <a href="mailto:englishsocietysmansabozz@gmail.com" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">CONTACT US</a>
            </div>
        {:else if $page.status === 401}
            <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl text-primary-600 animate-bounce">4<span class="text-secondary">0</span>1</h1>
                <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Unauthorized Access</p>
                <p class="mb-6 text-md font-light text-gray-500 max-w-80">Sorry, you are not authorized to access this page. Please log in and try again.</p>
                <a href="/login" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">LOGIN</a>
            </div>
        {/if}
    </section>
</section>