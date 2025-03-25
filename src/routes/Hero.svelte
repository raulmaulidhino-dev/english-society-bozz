<script>
    import { onMount } from 'svelte';

    let landscapePictures = [
        {srcWebp: '/pictures/landscape/UNSOED-Festival-1.webp', srcJpg: '/pictures/landscape/UNSOED-Festival-1.jpg', alt: "UNSOED Festival 1"},
        {srcWebp: '/pictures/landscape/Pic-1.webp', srcJpg: '/pictures/landscape/Pic-1.jpg', alt: "Our Picture Together!"},
        {srcWebp: '/pictures/landscape/Dahuni-F-Event-1.webp', srcJpg: '/pictures/landscape/Dahuni-F-Event-1.jpg', alt: "Dahuni Foundation Event"},
        {srcWebp: '/pictures/landscape/Smansabozz-x-Gogeum.webp', srcJpg: '/pictures/landscape/Smansabozz-x-Gogeum.jpg', alt: "SMANSABOZZ AND GOGEUM"},
        {srcWebp: '/pictures/landscape/English-FEST-2024-UMP.webp', srcJpg: '/pictures/landscape/English-FEST-2024-UMP.jpg', alt: "English FEST 2024 - UMP"},
        {srcWebp: '/pictures/landscape/Cabdin-Event.webp', srcJpg: '/pictures/landscape/Cabdin-Event.jpg', alt: "Cabdin IX Event"},
        {srcWebp: '/pictures/landscape/UNSOED-Festival-2.webp', srcJpg: '/pictures/landscape/UNSOED-Festival-2.jpg', alt: "UNSOED Festival 1"},
    ];

    let squarePictures = [
        {srcWebp: '/pictures/square/Competition-1.webp', srcJpg: '/pictures/square/Competition-1.jpg', alt: "Competition Time!"},
        {srcWebp: '/pictures/square/English-Camp-1.webp', srcJpg: '/pictures/square/English-Camp-1.jpg', alt: "English Camp 1"},
        {srcWebp: '/pictures/square/English-Camp-2.webp', srcJpg: '/pictures/square/English-Camp-2.jpg', alt: "English Camp 2"},
        {srcWebp: '/pictures/square/English-Camp-3.webp', srcJpg: '/pictures/square/English-Camp-3.jpg', alt: "English Camp 3"},
        {srcWebp: '/pictures/square/English-Camp-4.webp', srcJpg: '/pictures/square/English-Camp-4.jpg', alt: "English Camp 4"},
    ];

    function login() {
        window.location.href = "\login";
    }

    onMount(() => {
        const collage = document.getElementById('hero_img_collage');
        const squareImages = document.getElementById('square_images');
        const landscapeImages = document.getElementById('landscape_images');

        let scrollLengthSq = 0;
        let scrollDirectionSq = 'top';
        const scrollSquareImages = setInterval(() => {
            let collageDistanceFromTop = collage.getBoundingClientRect().top;
            let squareImagesDistanceFromTop = squareImages.getBoundingClientRect().top;

            if ((collageDistanceFromTop + collage.offsetHeight) >= (squareImagesDistanceFromTop + squareImages.offsetHeight - collage.offsetHeight)) {
                scrollDirectionSq = 'bottom';
            } else if (collageDistanceFromTop <= (squareImagesDistanceFromTop + collage.offsetHeight)) {
                scrollDirectionSq = 'top';
            }

            if (scrollDirectionSq == 'top') {
                scrollLengthSq += collage.offsetHeight;
                squareImages.style.bottom = scrollLengthSq + 'px';
            } else {
                scrollLengthSq -= collage.offsetHeight;
                squareImages.style.bottom = scrollLengthSq + 'px';
            }
         }, 2000);

        let scrollLengthLs = 0;
        let scrollDirectionLs = 'bottom';
        const scrollLandscapeImages = setInterval(() => {
            let collageDistanceFromTop = collage.getBoundingClientRect().top;
            let landscapeImagesDistanceFromTop = landscapeImages.getBoundingClientRect().top;

            if ((collageDistanceFromTop + collage.offsetHeight) >= (landscapeImagesDistanceFromTop + landscapeImages.offsetHeight)) {
                scrollDirectionLs = 'bottom';
            } else if (collageDistanceFromTop <= (landscapeImagesDistanceFromTop)) {
                scrollDirectionLs = 'top';
            }

            if (scrollDirectionLs == 'top') {
                scrollLengthLs += collage.offsetHeight;
                landscapeImages.style.bottom = scrollLengthLs + 'px';
            } else {
                scrollLengthLs -= collage.offsetHeight;
                landscapeImages.style.bottom = scrollLengthLs + 'px';
            }
         }, 2000);
     })
</script>

<section class="lg:h-[max(calc(100vh-114px),500px)] px-6 flex flex-wrap-reverse justify-around items-center gap-10">
    <section class="max-w-xl pb-4">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-[0.5em]">Speak Up, Express Yourself: Join our Community!</h1>
        <p class="text-[12px] sm:text-sm md:text-[16px] text-gray-600 font-medium mb-[1em]">
            Don't be shy about speaking English! - 
            Try speaking up here in one of the most active extracurriculars at SMA Negeri 1 Bobotsari, the
            <span class="text-primary font-semibold">English Society-Bozz!</span>
        </p>
        <section class="flex gap-4 mb-[1em]">
            <button class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-primary_hover rounded-full inline-block" on:click={login}>JOIN NOW</button>
            <button class="text-primary text-sm px-4 py-2 font-bold bg-secondary hover:bg-secondary_hover rounded-full inline-block"
            on:click={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE</button>
        </section>
        <p class="text-[10px] md:text-[12px]">*Before joining, make sure you are an active student at SMA Negeri 1 Bobotsari</p>
    </section>
    <section id="hero_img_collage" class="hero-img-collage max-w-lg aspect-[4/3] border-y-[1rem] border-t-secondary border-double border-b-primary p-2 mt-8 lg:mt-0 overflow-hidden flex items-center gap-2">
        <section id="square_images" class="flex flex-col gap-2 relative">
            {#each squarePictures as squarePicture}
                <picture>
                    <source srcset="{squarePicture.srcWebp}" type="image/webp">
                    <img src="{squarePicture.srcJpg}" alt="{squarePicture.alt}" class="aspect-square block object-cover object-center" />
                </picture>
            {/each}
        </section>
        <section id="landscape_images" class="flex flex-col gap-2 relative">
            {#each landscapePictures as landscapePicture}
                <picture>
                    <source srcSet="{landscapePicture.srcWebp}" type="image/webp">
                    <img src="{landscapePicture.srcJpg}" alt="{landscapePicture.alt}" class="aspect-video block object-cover object-center" />
                </picture>
            {/each}
        </section>
    </section>
</section>

<style>
    .hero-img-collage > section{
        @apply transition-all duration-1000 ease-in-out;
    }

    .hero-img-collage img {
        @apply rounded-lg;
    }
    
</style>