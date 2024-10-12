<script>
    import { onMount } from 'svelte';
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

<section class="px-6 flex flex-wrap-reverse justify-around items-center gap-10">
    <section class="max-w-xl pb-4">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-[0.5em]">Speak Up, Express Yourself: Join our Community!</h1>
        <p class="text-[12px] sm:text-sm md:text-[16px] text-gray-600 font-medium mb-[1em]">
            Don't be shy about speaking English! - 
            Try speaking up here in one of the most active extracurriculars at SMA Negeri 1 Bobotsari, the
            <span class="text-primary font-semibold">English Society-Bozz!</span>
        </p>
        <section class="flex gap-4 mb-[1em]">
            <button class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-primary_hover rounded-full inline-block">JOIN NOW</button>
            <button class="text-primary text-sm px-4 py-2 font-bold bg-secondary hover:bg-secondary_hover rounded-full inline-block">EXPLORE</button>
        </section>
        <p class="text-[10px] md:text-[12px]">*Before joining, make sure you are an active student at SMA Negeri 1 Bobotsari</p>
    </section>
    <section id="hero_img_collage" class="hero-img-collage max-w-lg aspect-[4/3] overflow-hidden flex items-center gap-2">
        <section id="square_images" class="flex flex-col gap-2 relative">
            <img src="https://picsum.photos/500?random=42" alt="Random Pict 1"/>
            <img src="https://picsum.photos/500?random=43" alt="Random Pict 2"/>
            <img src="https://picsum.photos/500?random=44" alt="Random Pict 3"/>
            <img src="https://picsum.photos/500?random=45" alt="Random Pict 4"/>
            <img src="https://picsum.photos/500?random=46" alt="Random Pict 5"/>
        </section>
        <section id="landscape_images" class="flex flex-col gap-2 relative">
            <img src="https://picsum.photos/512/288?random=198" alt="Random Pict 6" />
            <img src="https://picsum.photos/512/288?random=199" alt="Random Pict 7" />
            <img src="https://picsum.photos/512/288?random=200" alt="Random Pict 8" />
            <img src="https://picsum.photos/512/288?random=201" alt="Random Pict 9" />
            <img src="https://picsum.photos/512/288?random=202" alt="Random Pict 10" />
            <img src="https://picsum.photos/512/288?random=203" alt="Random Pict 11" />
            <img src="https://picsum.photos/512/288?random=204" alt="Random Pict 12" />
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