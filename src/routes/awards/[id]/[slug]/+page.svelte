<script lang="ts">

    import DOMPurify from "dompurify";

    import { awardLevelLabelColorMap, awardTitleLabelColorMap, awardCategoryLabelColorMap } from '$lib/styles/colorMaps.js';
    import { awardLevelLabelIconMap, awardTitleLabelIconMap, awardCategoryLabelIconMap } from '$lib/styles/iconMaps.js';

    import { Trophy as TrophyIcon, Building2 as OrganizerIcon, CalendarDays as DateIcon, Crown as TrophierIcon, ExternalLink as ExternalLinkIcon, FileBadge as CertificateURL_Icon, UserPen as WriterIcon } from '@lucide/svelte';
    
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

    let level = $state(data.award.award_levels.level);
    let title = $state(data.award.award_titles.title);
    let award = $state(data.award.award_categories.category);
    let type = $state(data.award.award_categories.category);
    let date = $state(new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(data.award.award_date)));

    let safeDesc: string = $state("");
    if (browser) safeDesc = DOMPurify.sanitize(data.award?.description ?? "");

    const levelLabelColor = awardLevelLabelColorMap[level.toLowerCase().replace(" ", "-") as AwardLevelColorKey] ?? "text-gray-700 bg-gray-300";
    const titleLabelColor = awardTitleLabelColorMap[title.toLowerCase().replace(" ", "-") as AwardTitleColorKey] ?? "text-gray-700 bg-gray-300";
    const categoryLabelColor = awardCategoryLabelColorMap[award.toLowerCase().replace(" ", "-") as AwardCategoryColorKey] ?? "text-gray-700 bg-gray-300";

    const TitleIcon = awardTitleLabelIconMap[title.toLowerCase().replace(" ", "-") as AwardTitleIconKey] ?? awardTitleLabelIconMap["other"];
    const LevelIcon = awardLevelLabelIconMap[level.toLowerCase().replace(" ", "-") as AwardLevelIconKey] ?? awardLevelLabelIconMap["other"];
    const CategoryIcon = awardCategoryLabelIconMap[award.toLowerCase().replace(" ", "-") as AwardCategoryIconKey] ?? awardCategoryLabelIconMap["other"];

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
  <meta name="theme-color" content="#EFC007" />

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={ data.meta?.title ?? defaultMeta.title } />
	<meta property="og:description" content={ data.meta?.description ?? defaultMeta.description } />
	<meta property="og:image" content={ data.meta?.ogImage ?? defaultMeta.ogImage } />
	<meta property="og:url" content={ data.meta?.url ?? defaultMeta.url } />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="english-society-bozz.vercel.app" />
	<meta property="twitter:url" content={ data.meta?.url ?? defaultMeta.url } />
	<meta property="twitter:title" content={ data.meta?.title ?? defaultMeta.title } />
	<meta property="twitter:description" content={ data.meta?.description ?? defaultMeta.description } />
	<meta property="twitter:image" content={ data.meta?.ogImage ?? defaultMeta.ogImage } />
</svelte:head>

<article class="bg-white max-w-2xl mx-auto mb-8 flex flex-col">
    <section class="w-full md:mt-8 aspect-square relative">
        {#if data?.award?.photo_url}
            <img src={data.award.photo_url} alt={data.award.name} class="w-full md:rounded-lg aspect-square" />
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
              {#if data.award.organizer_url}
                <a href={data.award.organizer_url} target="_blank" class="flex items-center gap-1">
                  <span class="text-blue-500">
                    {data.award.organizer}
                  </span>
                  <ExternalLinkIcon size="11" class="hover:text-blue-500" />
                </a>
              {:else}
                <p>{data.award.organizer}</p>
              {/if}
            </div>
            <div class="text-xs mb-[1em] flex items-center gap-2">
              <DateIcon size="16" class="text-blue-500" />
              <p>{date}</p>
            </div>

            <hr class="mb-4"/>

            <div class="text-xs mb-[1em] flex items-center gap-2">
              <TrophierIcon size="16" class="text-yellow-500" />
              <p class="font-semibold">{data.award.student_name} <span class="text-secondary">•</span> {data.award.student_classes.class}</p>
            </div>
            {#if data.award.certificate_url}
              <div class="text-xs mb-[1em] flex items-center gap-2">
                <CertificateURL_Icon size="16" class="text-orange-500" />
                  <a href={data.award.certificate_url} target="_blank" class="flex items-center gap-1">
                    <span class="font-semibold text-blue-500">
                      Certificate
                    </span>
                    <ExternalLinkIcon size="11" class="hover:text-blue-500" />
                  </a>
              </div>
            {/if}

            <hr class="mb-4"/>

            <div class="text-xs mb-[1em] flex items-center gap-2">
              <WriterIcon size="16" class="text-orange-800" />
              <p class="font-medium">
                <a href={`/user/${data.award.profiles.username}`} class="text-primary">
                  {data.award.profiles.full_name}
                </a>
              </p>
            </div>
            
            <section id="description" class="text-sm pt-4">
              {#if browser}
                  <section>{@html safeDesc}</section>
              {:else}
                  <section>Loading description...</section>
              {/if}
            </section>

            <section class="flex flex-wrap gap-2 my-8">
              <div class={` ${ categoryLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><CategoryIcon size="16" /><span>{type}</span></div>
              <div class={` ${ levelLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><LevelIcon size="16"/><span>{level}</span></div>
              <div class={` ${ titleLabelColor } text-xs font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2`}><TitleIcon size="16"/><span>{title}</span></div>
            </section>      
        </section>
    </section>
  </article>
  