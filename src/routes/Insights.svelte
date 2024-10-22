<script>
    import Book from '$lib/images/logo_elements/yellow-book-icon.png';
    import World from '$lib/images/logo_elements/yellow-world-icon.png';
    import Shield from '$lib/images/logo_elements/yellow-es-bozz-shield-icon.png';
    
    let insights = [
        {icon: Book, alt: 'Book Icon', title: 'Educative', description: 'Lorem Ipsum'},
        {icon: World, alt: 'World Icon',  title: 'International', description: 'Dolor sit amet'},
        {icon: Shield, alt: 'English Society-Bozz Shield Icon',  title: 'Supportive', description: 'Consectetur adipiscing elit'},
    ];
</script>

<section id="insights" class="text-white bg-primary px-6 py-[6rem]">
    <h2 class="text-2xl sm:text-3xl md:text-4xl text-center font-semibold max-w-md mx-auto mb-[2em]">Why Choose<br /> <span class="text-secondary font-bold">English Society-Bozz</span>?</h2>
    <section class="flex flex-wrap gap-16 justify-around items-center">
        {#each insights as insight}
            <div class="basis-40 shrink-0 flex flex-col items-center justify-center">
                <img src={insight.icon} alt={insight.alt} class="h-[8rem]"/>
                <h4 class="text-lg sm:text-xl md:text-2xl font-semibold mb-6">{insight.title}</h4>
                <p class="md:text-lg">{insight.description}</p>
            </div>
        {/each}
    </section>
</section>