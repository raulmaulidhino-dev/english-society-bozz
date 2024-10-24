<script>
    let activities = [
        {bg: "bg-[url('https://picsum.photos/900?random=210')]", alt: "Activty 1", title: "Fun Activty 1"},
        {bg: "bg-[url('https://picsum.photos/900?random=220')]", alt: "Activty 2", title: "Fun Activty 2"},
        {bg: "bg-[url('https://picsum.photos/900?random=230')]", alt: "Activty 3", title: "Fun Activty 3"},
        {bg: "bg-[url('https://picsum.photos/900?random=240')]", alt: "Activty 4", title: "Fun Activty 4"},
        {bg: "bg-[url('https://picsum.photos/900?random=250')]", alt: "Activty 5", title: "Fun Activty 5"},
        {bg: "bg-[url('https://picsum.photos/900?random=260')]", alt: "Activty 6", title: "Fun Activty 6"},
    ];
</script>

<section class="bg-secondary px-6 py-[4rem]">
    <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-center font-bold mx-auto mb-[4rem]">Look Up Our Fun Activities Here!</h2>
    <section class="flex flex-wrap justify-center gap-4 md:flex-nowrap md:justify-start md:overflow-scroll">
        {#each activities as activity}
            <section class={`text-white text-lg font-bold ${activity.bg} bg-cover md:min-w-72 max-w-80 w-full aspect-[3/4] rounded-xl p-6 flex flex-col justify-end relative`}>
                <div class="rounded-xl absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.8)] z-10"></div>
                <span class="z-20">{activity.title}</span>
            </section>
        {/each}
    </section>
</section>