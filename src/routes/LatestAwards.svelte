<script lang="ts">
    import { onMount } from 'svelte';

    import AwardCard from '$lib/components/AwardCard.svelte';
    import type { AwardResponse } from "$lib/types/award/award";

    import { ArrowRight as ArrowRightIcon } from '@lucide/svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    interface Props {
        awards: AwardResponse[];
    }

    let { awards }: Props = $props();
    
    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<section class="bg-secondary px-6 py-[4rem]">
    <h2 data-aos="fade-down" class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-center font-bold mx-auto mb-[4rem]">See Our Most Recent Awards!</h2>
    <section class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4">
        {#if awards}
            {#if awards.length > 0}
                {#each awards as award}
                    <AwardCard award={award} isEditable={false} />
                {/each}
            {:else}
                <p>It looks like there aren't any awards here yet...</p>   
            {/if}
        {:else}
            <section data-aos="zoom-in" class="bg-white pt-16 pb-8 px-4 max-w-xl rounded-2xl mx-auto shadow-lg col-span-2">
                <div class="mx-auto px-4 max-w-screen-sm text-center flex flex-col justify-center items-center">
                    <h1 class="text-8xl tracking-tight font-extrabold text-primary lg:text-9xl animate-bounce">4<span class="text-secondary">0</span>4</h1>
                    <div class="bg-slate-200 h-[2px] w-full rounded-full mb-4"></div>
                    <p class="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">Oops! No awards found here.</p>
                    <p class="mb-6 text-md font-light text-gray-500 max-w-80">Our awards failed to load. A refresh may resolve the issue 🤠</p>
                    <a href="/awards" class="text-sm text-white text-center bg-primary font-bold w-full sm:w-fit border-2 border-primary py-2 px-2 md:px-8 rounded-full hover:text-primary hover:bg-secondary inline-block">SEE OUR RECENT AWARDS</a>
                </div>
            </section>        
        {/if}
    </section>
    <section class="flex justify-center items-center">
        <a data-aos="zoom-in" href="/awards" class="text-secondary text-sm px-4 py-3 font-bold border-2 border-primary bg-primary hover:bg-secondary hover:text-primary rounded-full mt-[4rem] mx-auto flex items-center justify-center gap-2">
            <span>EXPLORE MORE!</span>
            <ArrowRightIcon size="16" class="ml-auto" />
        </a>
    </section>
</section>
