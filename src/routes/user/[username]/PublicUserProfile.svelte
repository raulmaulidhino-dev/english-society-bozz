<script lang="ts">
    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    import AvatarViewModal from '$lib/components/modals/AvatarViewModal.svelte';

    import {Icon, User as Profile} from 'svelte-hero-icons';
    import type { UserProfile } from '$lib/types/user/user';
    
    interface Props {
        user: UserProfile;
    }

    let { user }: Props = $props();

    let showAvatarViewModal = $state(false);

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<section class={`bg-slate-200 p-4 md:p-8`}>
    <section data-aos="zoom-in" class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col justify-center">
        <section class="bg-secondary w-full h-40 rounded-t-[inherit]">
        </section>
        <section class="rounded-b-[inherit] relative">
            <section class="pb-10 px-6 profile-data">
                <div class={`text-white bg-primary h-24 w-24 border-2 border-white rounded-full ${ user?.avatar_url ? "" : "p-2" } absolute top-[-48px] left-8 flex justify-center items-center`}>
                    {#if user?.avatar_url}
                    <button onclick={() => showAvatarViewModal = !showAvatarViewModal} class="w-full rounded-[inherit]">
                        <img src={user.avatar_url} alt={`${user?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
                    </button>
                {:else}
                        <Icon src={Profile} solid size="52" />
                    {/if}
                </div>
                <h2 class="text-2xl text-primary font-bold capitalize mt-14 break-words">{user?.full_name || "Full Name"}</h2>
                <p class="text-sm text-slate-500 break-words">{user?.username || "username" }</p>
                <p class="text-sm break-words whitespace-pre-wrap">{user?.bio || "No bio yet."}</p>
            </section>
        </section>
    </section>
</section>

{#if user.avatar_url}
    <AvatarViewModal
        bind:show={showAvatarViewModal}
        avatar={user.avatar_url}
    />
{/if}
