<script lang="ts">
    import Book from '$lib/images/logo_elements/yellow-book-icon.png';
    import World from '$lib/images/logo_elements/yellow-world-icon.png';
    import Shield from '$lib/images/logo_elements/yellow-es-bozz-shield-icon.png';

    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    interface Insight {
        icon: string;
        alt: string;
        title: string;
        description: string;
    }
    
    let insights: Insight[] = [
        {icon: Book, alt: 'Book Icon', title: 'Educative', description: 'Sharpen your language skills through fun activities, workshops, and discussions.'},
        {icon: World, alt: 'World Icon',  title: 'International', description: 'Connect with like-minded students and explore English from a global perspective.'},
        {icon: Shield, alt: 'English Society-Bozz Shield Icon',  title: 'Supportive', description: 'Be part of a friendly community that helps you grow in confidence and communication!'},
    ];

    onMount(() =>{
        AOS.init({
            duration: 1200
        });
    });

</script>

<section id="insights" class="text-white bg-primary px-6 py-[6rem]">
    <h2 data-aos="fade-down" class="text-2xl sm:text-3xl md:text-4xl text-center font-semibold max-w-md mx-auto mb-[2em]">Why Choose<br /> <span class="text-secondary font-bold">English Society-Bozz</span>?</h2>
    <section class="flex flex-wrap gap-16 md:px-10 justify-around items-center">
        {#each insights as insight}
            <div class="basis-[75%] md:basis-1/4 shrink-0 flex flex-col items-center justify-center">
                <img data-aos="zoom-in" src={insight.icon} alt={insight.alt} class="h-[8rem]" loading="lazy" />
                <h3 data-aos="zoom-in" class="text-2xl md:text-3xl font-semibold mb-6">{insight.title}</h3>
                <p data-aos="fade-up" class="text-center md:text-lg">{insight.description}</p>
            </div>
        {/each}
    </section>
</section>