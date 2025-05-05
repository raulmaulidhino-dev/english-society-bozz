<script lang="ts">

    import DOMPurify from "dompurify";

    import { awardLevelLabelColorMap, awardTitleLabelColorMap, awardCategoryLabelColorMap } from '$lib/styles/colorMaps.js';
    import { awardLevelLabelIconMap, awardTitleLabelIconMap, awardCategoryLabelIconMap } from '$lib/styles/iconMaps.js';

    import { Trophy as TrophyIcon, Building2 as OrganizerIcon, CalendarDays as DateIcon, Crown as TrophierIcon } from '@lucide/svelte';
    
    import { browser } from "$app/environment";

    import { defaultMeta } from "$lib/meta/meta.js";

    import type { AwardResponse } from '$lib/types/award/award.js';
    import type { AwardLevelColorKey, AwardTitleColorKey, AwardCategoryColorKey } from '$lib/styles/colorMaps.js';
    import type { AwardLevelIconKey, AwardTitleIconKey, AwardCategoryIconKey } from '$lib/styles/iconMaps.js';
    import type { Meta } from "$lib/types/meta/meta";

    interface Props {
        data: {
            award: AwardResponse;
            meta: Meta;
        }
    }

    let { data }: Props = $props();

    let safeDesc: string = $state("");
    if (browser) safeDesc = DOMPurify.sanitize(data.award?.description ?? "");

    let level = $state(data.award.award_levels.level);
    let title = $state(data.award.award_titles.title);
    let award = $state(data.award.award_categories.category);
    let type = $state(data.award.award_categories.category);
    let date = $state(new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(data.award.award_date)));

    const levelLabelColor = awardLevelLabelColorMap[level.toLowerCase() as AwardLevelColorKey] ?? "text-gray-700 bg-gray-300";
    const titleLabelColor = awardTitleLabelColorMap[title.toLowerCase().replace(" ", "-") as AwardTitleColorKey] ?? "text-gray-700 bg-gray-300";
    const categoryLabelColor = awardCategoryLabelColorMap[award.toLowerCase().replace(" ", "-") as AwardCategoryColorKey] ?? "text-gray-700 bg-gray-300";

    const TitleIcon = awardTitleLabelIconMap[title.toLowerCase().replace(" ", "-") as AwardTitleIconKey] ?? awardTitleLabelIconMap["other"];
    const LevelIcon = awardLevelLabelIconMap[level.toLowerCase() as AwardLevelIconKey] ?? awardLevelLabelIconMap["other"];
    const CategoryIcon = awardCategoryLabelIconMap[award.toLowerCase() as AwardCategoryIconKey] ?? awardCategoryLabelIconMap["other"];

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<article class="bg-white max-w-2xl mx-auto mb-8 flex flex-col">
    <section class="w-full md:mt-8 aspect-square relative">
        {#if data?.award?.photo_url}
        <img src={data.award.photo_url} alt={data.award.name} class="w-full md:rounded-lg aspect-[3/2]" />
        {:else}
            <div class="bg-secondary w-full aspect-square md:rounded-lg flex justify-center items-center">
              <TrophyIcon size="72" class="text-primary" />
            </div>
        {/if}
        <div class="text-center bg-white rounded-md absolute top-2 left-2 shadow-xl flex justify-center items-stretch">
          <span class={`${ titleLabelColor } rounded-l-[inherit] py-2 px-4 flex justify-center items-center`}><TitleIcon size="20" /></span>
          <span class="text-sm font-medium py-2 px-4">{title}</span>
        </div>
    </section>
    <section class="grow p-4 flex flex-col gap-4">
        <section>
            <h2 class="text-xl text-primary font-bold mb-[0.75em]">{data.award.name}</h2>
            <div class="text-xs mb-[1em] flex items-center gap-2">
              <OrganizerIcon size="16" class="text-slate-500" />
              <p>{data.award.organizer}</p>
            </div>
            <div class="text-xs mb-[1em] flex items-center gap-2">
              <DateIcon size="16" class="text-blue-500" />
              <p>{date}</p>
            </div>
            <div class="text-xs mb-[1em] flex items-center gap-2">
              <TrophierIcon size="16" class="text-yellow-500" />
              <p class="font-semibold">{data.award.student_name} <span class="text-secondary">•</span> {data.award.student_classes.class}</p>
            </div>
            <hr class="mb-4"/>
            <section class="flex flex-wrap gap-2 my-8">
              <div class={` ${ categoryLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><CategoryIcon size="16" /><span>{type}</span></div>
              <div class={` ${ levelLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><LevelIcon size="16"/><span>{level}</span></div>
              <div class={` ${ titleLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><TitleIcon size="16"/><span>{title}</span></div>
            </section>      
        </section>
    </section>
  </article>
  