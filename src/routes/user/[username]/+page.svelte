<script lang="ts">
    import PublicUserProfile from './PublicUserProfile.svelte';
    import { defaultMeta } from '$lib/meta/meta';
    import type { UserProfile } from '$lib/types/user/user';
    import type { Meta } from '$lib/types/meta/meta';

    interface Props {
        data: {
            user: UserProfile;
            meta: Meta;
        }
    }

    let { data }: Props = $props();

</script>

<svelte:head>
	<title>{ data.meta?.title ?? defaultMeta.title }</title>
	<meta name="description" content={ data.meta?.description ?? defaultMeta.description } />
</svelte:head>

<PublicUserProfile user={data.user} />