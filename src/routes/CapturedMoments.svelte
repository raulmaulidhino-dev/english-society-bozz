<script lang="ts">

    import { onMount } from 'svelte';

    import { ArrowRight as ArrowRightIcon } from '@lucide/svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    interface Moment {
        srcWebp: string;
        srcJpg: string;
        alt: string;
        title: string;
        divClass: string;
    }

    let moments: Moment[] = [
        {srcWebp: "/pictures/captured-moments/Moment-1.webp", srcJpg: "/pictures/captured-moments/Moment-1.jpg", alt: "Moment 1", title: "Moment 1", divClass: ""},
        {srcWebp: "/pictures/captured-moments/Moment-2.webp", srcJpg: "/pictures/captured-moments/Moment-2.jpg", alt: "Moment 2", title: "Moment 2", divClass: "row-start-2"},
        {srcWebp: "/pictures/captured-moments/Moment-3.webp", srcJpg: "/pictures/captured-moments/Moment-3.jpg", alt: "Moment 3", title: "Moment 3", divClass: "row-span-2"},
        {srcWebp: "/pictures/captured-moments/Moment-4.webp", srcJpg: "/pictures/captured-moments/Moment-4.jpg", alt: "Moment 4", title: "Moment 4", divClass: "row-span-2 col-span-2"},
        {srcWebp: "/pictures/captured-moments/Moment-5.webp", srcJpg: "/pictures/captured-moments/Moment-5.jpg", alt: "Moment 5", title: "Moment 5", divClass: ""},
        {srcWebp: "/pictures/captured-moments/Moment-6.webp", srcJpg: "/pictures/captured-moments/Moment-6.jpg", alt: "Moment 6", title: "Moment 6", divClass: ""},
        {srcWebp: "/pictures/captured-moments/Moment-7.webp", srcJpg: "/pictures/captured-moments/Moment-7.jpg", alt: "Moment 7", title: "Moment 7", divClass: "col-span-2"},
    ];

    onMount(() => {
        AOS.init({ duration: 1200 });
    });
    
</script>

<section class="bg-primary px-6 py-[4rem] md:px-10">
    <h2 data-aos="fade-down" class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold mx-auto mb-[4rem]">Some Captured Moments!</h2>
    <section class="moment-collage min-w-80 w-[75%] max-w-4xl mx-auto grid grid-rows-6 grid-cols-2 lg:grid-rows-2 lg:grid-cols-6 gap-4 md:gap-6">

        {#each moments as moment}
            <div data-aos="zoom-in" class={`bg-white rounded-[1.5rem] text-center ${moment.divClass}`}>
                <picture class="rounded-[inherit]">
                    <source srcset={moment.srcWebp} type="image/webp">
                    <img src={moment.srcJpg} alt={moment.alt} title={moment.title} loading="lazy" class="h-full w-full object-cover  rounded-[inherit] border-4 border-transparent hover:scale-[1.05] hover:border-4 hover:border-secondary transition-all duration-500 ease-in-out" />
                </picture>
            </div>
        {/each}

    </section>
    <section class="flex justify-center items-center">
        <a data-aos="zoom-in" href="https://www.instagram.com/englishsocietybozz/" class="text-primary text-sm px-4 py-2 font-bold border-2 border-secondary bg-secondary hover:bg-primary hover:text-secondary rounded-full mt-[4rem] mx-auto flex items-center justify-center gap-2">
            <span>SEE MORE!</span>
            <ArrowRightIcon size="16" class="ml-auto" />
        </a>
    </section>
</section>
