<script>

    let numbers = [
        {count: 50, title: 'Active Learners'},
        {count: 100, title: 'Fun Activities'},
        {count: 10, title: 'Events'},
        {count: '5+', title: 'Partners'},
    ];

    let doodles = [
        {src:"https://picsum.photos/500?random=100", alt:"Doodle 1"},
        {src:"https://picsum.photos/500?random=101", alt:"Doodle 2"},
        {src:"https://picsum.photos/500?random=102", alt:"Doodle 3"},
        {src:"https://picsum.photos/500?random=103", alt:"Doodle 4"},
    ];

</script>

<section class="px-6 py-[6rem] flex flex-wrap justify-evenly gap-8">
    <section class="flex flex-wrap max-w-lg gap-4">
        {#each numbers as number, i}
            <div class={`${(i+1) % 4 == 2 || (i+1) % 4 == 3 ? "bg-primary text-secondary" : "bg-secondary text-primary" } rounded-2xl p-4 aspect-square max-w-44 flex flex-col justify-center items-center gap-2`}>
                <div class="text-5xl font-extrabold mx-auto">{number.count}+</div>
                <div class="font-semibold mx-auto">{number.title}</div>
            </div>
        {/each}
    </section>
    <section class="max-w-xl">
        <div class="flex justify-between items-center gap-4">
            {#each doodles as doodle, i}
                <img class={`border-4 ${i % 2 == 0 ? "border-primary" : "border-secondary"} object-cover w-32 rounded-full`} src={doodle.src} alt={doodle.alt} />
            {/each}
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl text-primary font-bold my-[1em]">A Vibrant and Joyful Learning Community</h2>
        <p class="text-sm md:text-lg font-medium text-gray-600">
            Discover our vibrant and enjoyable learning community, where everyone is welcome to learn, grow, and connect.
        </p>
    </section>
</section>