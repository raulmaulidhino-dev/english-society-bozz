<script lang="ts">
    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    import InfoModal from '$lib/components/modals/InfoModal.svelte';

    interface Props {
        join_now_url: string | null;
    }

    let { join_now_url }: Props = $props();
    interface Picture {
        srcWebp: string;
        srcJpg: string;
        alt: string;
    }

    let landscapePictures: Picture[] = [
        {srcWebp: '/pictures/landscape/UNSOED-Festival-1.webp', srcJpg: '/pictures/landscape/UNSOED-Festival-1.jpg', alt: "UNSOED Festival 1"},
        {srcWebp: '/pictures/landscape/Pic-1.webp', srcJpg: '/pictures/landscape/Pic-1.jpg', alt: "Our Picture Together!"},
        {srcWebp: '/pictures/landscape/Dahuni-F-Event-1.webp', srcJpg: '/pictures/landscape/Dahuni-F-Event-1.jpg', alt: "Dahuni Foundation Event"},
        {srcWebp: '/pictures/landscape/Smansabozz-x-Gogeum.webp', srcJpg: '/pictures/landscape/Smansabozz-x-Gogeum.jpg', alt: "SMANSABOZZ AND GOGEUM"},
        {srcWebp: '/pictures/landscape/English-FEST-2024-UMP.webp', srcJpg: '/pictures/landscape/English-FEST-2024-UMP.jpg', alt: "English FEST 2024 - UMP"},
        {srcWebp: '/pictures/landscape/Cabdin-Event.webp', srcJpg: '/pictures/landscape/Cabdin-Event.jpg', alt: "Cabdin IX Event"},
        {srcWebp: '/pictures/landscape/UNSOED-Festival-2.webp', srcJpg: '/pictures/landscape/UNSOED-Festival-2.jpg', alt: "UNSOED Festival 1"},
    ];

    let squarePictures: Picture[] = [
        {srcWebp: '/pictures/square/Competition-1.webp', srcJpg: '/pictures/square/Competition-1.jpg', alt: "Competition Time!"},
        {srcWebp: '/pictures/square/English-Camp-1.webp', srcJpg: '/pictures/square/English-Camp-1.jpg', alt: "English Camp 1"},
        {srcWebp: '/pictures/square/English-Camp-2.webp', srcJpg: '/pictures/square/English-Camp-2.jpg', alt: "English Camp 2"},
        {srcWebp: '/pictures/square/English-Camp-3.webp', srcJpg: '/pictures/square/English-Camp-3.jpg', alt: "English Camp 3"},
        {srcWebp: '/pictures/square/English-Camp-4.webp', srcJpg: '/pictures/square/English-Camp-4.jpg', alt: "English Camp 4"},
    ];

    let showInfoModal: boolean = $state(false);

    onMount(() => {
        const collage: HTMLElement | null = document.getElementById('hero_img_collage');
        const squareImages: HTMLElement | null = document.getElementById('square_images');
        const landscapeImages: HTMLElement | null = document.getElementById('landscape_images');

        let scrollLengthSq: number = 0;
        let scrollDirectionSq: string = 'top';

        if (collage && squareImages) {
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
        }

        if (collage && landscapeImages) {
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
        }

        AOS.init({
            duration: 1200,
        });
     });

</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] px-6 flex flex-wrap-reverse justify-around items-center gap-10">
    <section class="max-w-xl pb-4">
        <h1 data-aos="fade-right" class="text-3xl sm:text-4xl md:text-5xl font-bold mb-[0.5em]">Speak Up, Express Yourself: Join our Community!</h1>
        <p data-aos="fade-right" class="text-[12px] sm:text-sm md:text-[16px] text-gray-600 font-medium mb-[1em]">
            Don't be shy about speaking English! - 
            Try speaking up here in one of the most active extracurriculars at SMA Negeri 1 Bobotsari, the
            <span class="text-primary font-semibold" translate="no">English Society-Bozz!</span>
        </p>
        <section class="flex gap-4 mb-[1em]">
            {#if join_now_url}
                <a data-aos="zoom-in" class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-secondary hover:text-primary rounded-full inline-block" href={join_now_url}>JOIN NOW</a>
            {:else}
                <button data-aos="zoom-in" class="text-white text-sm px-4 py-2 font-bold bg-primary hover:bg-secondary hover:text-primary rounded-full inline-block" onclick={() => showInfoModal = true}>JOIN NOW</button>
            {/if}
            <button data-aos="zoom-in" class="text-primary text-sm px-4 py-2 font-bold bg-secondary hover:bg-secondary_hover rounded-full inline-block"
            onclick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE</button>
        </section>
        <p data-aos="fade-right" class="text-[10px] md:text-[12px]">*Before joining, make sure you are an active student at SMA Negeri 1 Bobotsari</p>
    </section>
    <section data-aos="zoom-in" id="hero_img_collage" class="hero-img-collage max-w-lg aspect-[4/3] border-y-[1rem] border-t-secondary border-double border-b-primary p-2 mt-8 lg:mt-0 overflow-hidden flex items-center gap-2">
        <section id="square_images" class="flex flex-col gap-2 relative transition-all duration-1000 ease-in-out">
            {#each squarePictures as squarePicture}
                <div>
                    <picture>
                        <source srcset={squarePicture.srcWebp} type="image/webp">
                        <img src={squarePicture.srcJpg} alt={squarePicture.alt} class="aspect-square block rounded-lg object-cover object-center" loading="eager" />
                    </picture>
                </div>
            {/each}
        </section>
        <section id="landscape_images" class="flex flex-col gap-2 relative transition-all duration-1000 ease-in-out">
            {#each landscapePictures as landscapePicture}
                <div>
                    <picture>
                        <source srcSet={landscapePicture.srcWebp} type="image/webp">
                        <img src={landscapePicture.srcJpg} alt={landscapePicture.alt} class="aspect-video block rounded-lg object-cover object-center" loading="lazy" />
                    </picture>
                </div>
            {/each}
        </section>
    </section>
</section>

<InfoModal
  show={showInfoModal}
  title={"Information"}
  message={"Thank you for your interest. At this time, we're not accepting new members. Please check back at the start of the new school year for future opportunities! 💙"}
  OK_label={"OK, GOT IT!"}
  OK_event={() => showInfoModal = false}
/>
