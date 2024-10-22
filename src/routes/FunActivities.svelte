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

<section class="px-6 py-[6rem]">
    <h2 class="text-2xl sm:text-3xl md:text-4xl text-primary font-bold my-[1em]">Look Up Our Fun Activities Here!</h2>
    <section class="flex gap-4 overflow-auto">
        {#each activities as activity}
            <section class={`text-white text-lg font-bold ${activity.bg} bg-cover min-w-72 aspect-[3/4] rounded-xl p-6 flex flex-col justify-end`}>{activity.title}</section>
        {/each}
    </section>
</section>