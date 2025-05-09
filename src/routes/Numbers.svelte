<script lang="ts">
    import OurPartners from "./OurPartners.svelte";

    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    interface Number {
        count: string;
        title: string;
    }

    interface Doodle {
        srcWebp: string;
        srcJpg: string;
        alt: string;
    }

    let numbers: Number[] = [
        {count: "50", title: 'Active Learners'},
        {count: "100", title: 'Fun Activities'},
        {count: "10", title: 'Events'},
        {count: "5+", title: 'Partners'},
    ];

    let doodles: Doodle[] = [
        {srcWebp: '/pictures/square/In-School-Activity-1.webp', srcJpg: '/pictures/square/In-School-Activity-1.jpg', alt: "In-school Activity 1"},
        {srcWebp: '/pictures/square/Outdoor-Activity-1.webp', srcJpg: '/pictures/square/Outdoor-Activity-1.jpg', alt: "Outdoor Activity 1"},
        {srcWebp: '/pictures/square/Outdoor-Activity-2.webp', srcJpg: '/pictures/square/Outdoor-Activity-2.jpg', alt: "Outdoor Activity 2"},
        {srcWebp: '/pictures/square/In-School-Activity-2.webp', srcJpg: '/pictures/square/In-School-Activity-2.jpg', alt: "In-school Activity 2"},
    ];

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<section class="px-6 py-[6rem] flex flex-wrap justify-evenly gap-8">
    <section class="flex flex-wrap max-w-lg gap-4">
        {#each numbers as number, i}
            <div data-aos="zoom-in" class={`${(i+1) % 4 == 2 || (i+1) % 4 == 3 ? "bg-primary text-secondary" : "bg-secondary text-primary" } rounded-2xl p-4 aspect-square basis-[calc(50%-8px)] flex flex-col justify-center items-center gap-2`}>
                <div class="text-4xl md:text-5xl font-extrabold mx-auto">{number.count}+</div>
                <div class="text-sm md:text-base font-semibold mx-auto">{number.title}</div>
            </div>
        {/each}
    </section>
    <section class="max-w-xl">
        <div class="flex flex-wrap justify-center items-center content-center gap-4">
            {#each doodles as doodle, i}
                <picture data-aos="zoom-in">
                    <source srcSet="{doodle.srcWebp}" type="image/webp">
                    <img class={`border-4 ${i % 2 == 0 ? "border-primary" : "border-secondary"} object-cover w-32 rounded-full`} src={doodle.srcJpg} alt={doodle.alt} loading="lazy" />
                </picture>
            {/each}
        </div>
        <h2 data-aos="fade-right" class="text-2xl sm:text-3xl md:text-4xl text-primary font-bold my-[1em]">A Vibrant and Joyful Learning Community</h2>
        <p data-aos="fade-right" class="text-sm md:text-lg font-medium text-gray-600">
            Discover our vibrant and enjoyable learning community, where everyone is welcome to learn, grow, and connect.
        </p>
    </section>
    <OurPartners />
</section>