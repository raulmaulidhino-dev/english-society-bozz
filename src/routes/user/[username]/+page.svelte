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

<PublicUserProfile user={data.user} />