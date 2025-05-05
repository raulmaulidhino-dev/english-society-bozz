<script lang="ts">

      import { goto } from '$app/navigation';

      import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';

      import { awardLevelLabelColorMap, awardTitleLabelColorMap, awardCategoryLabelColorMap } from '$lib/styles/colorMaps.js';
      import { awardLevelLabelIconMap, awardTitleLabelIconMap, awardCategoryLabelIconMap } from '$lib/styles/iconMaps.js';

      import { Trophy as TrophyIcon, Building2 as OrganizerIcon, CalendarDays as DateIcon, Crown as TrophierIcon, ExternalLink as ExternalLinkIcon } from '@lucide/svelte';

      import type { AwardResponse } from '$lib/types/award/award.js';
      import type { AwardLevelColorKey, AwardTitleColorKey, AwardCategoryColorKey } from '$lib/styles/colorMaps.js';
      import type { AwardLevelIconKey, AwardTitleIconKey, AwardCategoryIconKey } from '$lib/styles/iconMaps.js';

      interface Props {
        award: AwardResponse;
        isEditable?: boolean;
        deleteAward?: (param: string) => void;
      }

      let { award, isEditable = false, deleteAward = () => {} }: Props = $props();

      let showConfirmModal: boolean = $state(false);

      let level = $state(award.award_levels.level);
      let title = $state(award.award_titles.title);
      let category = $state(award.award_categories.category);
      let type = $state(award.award_categories.category);
      let date = $state(new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(award.award_date)));

      const levelLabelColor = awardLevelLabelColorMap[level.toLowerCase().replace(" ", "-") as AwardLevelColorKey] ?? "text-gray-700 bg-gray-300";
      const titleLabelColor = awardTitleLabelColorMap[title.toLowerCase().replace(" ", "-") as AwardTitleColorKey] ?? "text-gray-700 bg-gray-300";
      const categoryLabelColor = awardCategoryLabelColorMap[category.toLowerCase().replace(" ", "-") as AwardCategoryColorKey] ?? "text-gray-700 bg-gray-300";

      const TitleIcon = awardTitleLabelIconMap[title.toLowerCase().replace(" ", "-") as AwardTitleIconKey] ?? awardTitleLabelIconMap["other"];
      const LevelIcon = awardLevelLabelIconMap[level.toLowerCase().replace(" ", "-") as AwardLevelIconKey] ?? awardLevelLabelIconMap["other"];
      const CategoryIcon = awardCategoryLabelIconMap[category.toLowerCase().replace(" ", "-") as AwardCategoryIconKey] ?? awardCategoryLabelIconMap["other"];

</script>

<article class="bg-white rounded-lg shadow-md flex flex-col">
  <section class="w-full aspect-square rounded-t-[inherit] relative">
      {#if award?.photo_url}
      <img src={award.photo_url} alt={award.name} class="rounded-t-[inherit]" />
      {:else}
          <div class="bg-secondary w-full aspect-square rounded-t-[inherit] flex justify-center items-center">
            <TrophyIcon size="72" class="text-primary" />
        </div>
      {/if}
      <div class="text-center bg-white rounded-md absolute top-2 left-2 shadow-xl flex justify-center items-stretch">
        <span class={`${ titleLabelColor } rounded-l-[inherit] py-2 px-4 flex justify-center items-center`}><TitleIcon size="20" /></span>
        <span class="text-sm font-medium py-2 px-4">{title}</span>
      </div>
  </section>
  <section class="grow p-4 flex flex-col gap-4">
    <section class="flex flex-wrap gap-2">
      <div class={` ${ categoryLabelColor } text-xs font-semibold rounded-full py-2 px-4 w-full flex items-center justify-center gap-2`}><CategoryIcon size="16" /><span>{type}</span></div>
      <div class={` ${ levelLabelColor } text-xs font-semibold rounded-full py-2 px-4 grow flex items-center justify-center gap-2`}><LevelIcon size="16"/><span>{level}</span></div>
      <div class={` ${ titleLabelColor } text-xs font-semibold rounded-full py-2 px-4 grow flex items-center justify-center gap-2`}><TitleIcon size="16"/><span>{title}</span></div>
    </section>
      <section>
          <h2 class="text-xl text-primary font-bold mb-[0.75em]">{award.name}</h2>
          <div class="text-xs mb-[1em] flex items-center gap-2">
            <OrganizerIcon size="16" class="text-slate-500" />
            {#if award?.organizer_url}
                <a href={award.organizer_url} target="_blank" class="flex items-center gap-1">
                  <span class="text-blue-500">
                    {award.organizer}
                  </span>
                  <ExternalLinkIcon size="11" class="hover:text-blue-500" />
                </a>
              {:else}
                <p>{award.organizer}</p>
              {/if}
          </div>
          <div class="text-xs mb-[1em] flex items-center gap-2">
            <DateIcon size="16" class="text-blue-500" />
            <p>{date}</p>
          </div>
          <hr class="mb-4"/>
          <section>
            <div class="text-xs font-medium mb-[1em]">Trophier :</div>
            <div class="text-xs mb-[1em] flex items-center gap-2">
              <TrophierIcon size="16" class="text-yellow-500" />
              <p class="font-semibold">{award.student_name} <span class="text-secondary">•</span> {award.student_classes.class}</p>
            </section>
      </section>
      <button onclick={() => goto(`/awards/${award.id}/${award.slug}`)} class="text-sm text-white bg-primary font-bold w-full border-2 border-primary mt-auto hover:bg-secondary hover:text-primary py-2 px-8 rounded-lg self-end">MORE INFO</button>
  </section>
  {#if isEditable}
      <section class="flex gap-2 bg-neutral-200 p-4 border-2 border-primary border-dashed rounded-b-[inherit]">
          <button onclick={() => {}} class="text-sm text-primary bg-white font-semibold w-full border-2 border-primary mt-auto hover:bg-secondary hover:text-primary py-2 px-8 rounded-lg grow">EDIT</button>
          <button onclick={() => showConfirmModal = true} class="text-sm text-white bg-red-600 font-semibold w-full border-2 border-primary mt-auto hover:bg-red-800 hover:text-white py-2 px-8 rounded-lg grow">DELETE</button>
      </section>
  {/if}
</article>

<ConfirmModal
    show={showConfirmModal}
    title={"Are you sure?"}
    message={"This action will delete the award. Are you sure you want to proceed?"}
    cancelLabel={"CANCEL"}
    confirmLabel={"YES, PROCEED"}
    onCancel={() => showConfirmModal = false}
    onConfirm={() => deleteAward(award.id)}
/>
