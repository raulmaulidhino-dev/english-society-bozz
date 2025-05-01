<script lang="ts">
    
    interface Moment {
        src: string;
        alt: string;
        title: string;
    }

    let moments: Moment[] = [
        {src: "https://picsum.photos/900?random=320", alt: "Moment 1", title: "Moment 1"},
        {src: "https://picsum.photos/900?random=321", alt: "Moment 2", title: "Moment 2"},
        {src: "https://picsum.photos/900?random=322", alt: "Moment 3", title: "Moment 3"},
        {src: "https://picsum.photos/900?random=323", alt: "Moment 4", title: "Moment 4"},
        {src: "https://picsum.photos/900?random=324", alt: "Moment 5", title: "Moment 5"},
        {src: "https://picsum.photos/900?random=325", alt: "Moment 6", title: "Moment 6"},
        {src: "https://picsum.photos/1800/900?random=326", alt: "Moment 7", title: "Moment 7"},
    ];
    
</script>

<section class="bg-primary px-6 py-[4rem] md:px-10">
    <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold mx-auto mb-[4rem]">Some Captured Moments!</h2>
    <section class="moment-collage min-w-80 w-[75%] max-w-4xl mx-auto grid grid-rows-6 grid-cols-2 lg:grid-rows-2 lg:grid-cols-6 gap-3">
        <div class="aspect-square"><img src={moments[0].src} alt={moments[0].alt} title={moments[0].title} /></div>
        <div class="aspect-square row-start-2"><img src={moments[1].src} alt={moments[1].alt} title={moments[1].title} /></div>
        <div class="row-span-2"><img src={moments[2].src} alt={moments[2].alt} title={moments[2].title} /></div>
        <div class="row-span-2 col-span-2"><img src={moments[3].src} alt={moments[3].alt} title={moments[3].title} /></div>
        <div><img src={moments[4].src} alt={moments[4].alt} title={moments[4].title} /></div>
        <div><img src={moments[5].src} alt={moments[5].alt} title={moments[5].title} /></div>
        <div class="col-span-2"><img src={moments[6].src} alt={moments[6].alt} title={moments[6].title} /></div>
    </section>
    <section class="flex justify-center items-center">
        <button class="text-primary text-sm px-4 py-2 font-bold bg-secondary hover:bg-secondary_hover rounded-full mt-[4rem] mx-auto">SEE MORE!</button>
    </section>
</section>

<style>
    .moment-collage > div {
        @apply bg-white rounded-[1.5rem] text-center overflow-hidden;
    }

    .moment-collage > div > img {
        border-radius: inherit;
        @apply h-full w-full object-cover;
    }
</style>