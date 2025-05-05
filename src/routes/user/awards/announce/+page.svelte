<script lang="ts">
    import AwardEditor from "./AwardEditor.svelte";
    import { defaultMeta } from "$lib/meta/meta";
    import type { AwardCategory, AwardLevel, AwardTitle, StudentClass } from "$lib/types/award/award";
    import type { UserProfile } from "$lib/types/user/user";
    import type { Meta } from "$lib/types/meta/meta";

    interface Props {
        data: {
            userProfile: UserProfile;
            awardCategories: AwardCategory[];
            awardLevels: AwardLevel[];
            awardTitles: AwardTitle[];
            studentClasses: StudentClass[];
            meta: Meta;
        }
    }

    let { data }: Props = $props(); 

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<AwardEditor 
    userProfile={data.userProfile}
    awardCategories={data.awardCategories}
    awardLevels={data.awardLevels}
    awardTitles={data.awardTitles}
    studentClasses={data.studentClasses}
/>
