<script>
    export let user;

    import { db } from "$lib/supabase";

    import { goto } from '$app/navigation';

    import {Icon, User as Profile} from 'svelte-hero-icons';

    function goToProfileEdit() {
        goto('/user/profile/edit');
    }

    const logout = async () => {
        const { error } = db.auth.signOut();
        if (error) console.error(error.message);
        else goto('/');
    }

</script>

<section class={`bg-slate-200 p-4 md:p-8`}>
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col justify-center">
        <section class="bg-secondary w-full h-40 rounded-t-[inherit]">
        </section>
        <section class="rounded-b-[inherit] relative">
            <section class="pb-10 px-6 profile-data">
                <div class={`text-white bg-primary h-24 w-24 border-2 border-white rounded-full ${ user.avatar_url ? "" : "p-2" } absolute top-[-48px] left-8 flex justify-center items-center`}>
                    {#if user.avatar_url}
                        <img src={user.avatar_url} alt={`${user?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
                    {:else}
                        <Icon src={Profile} solid size="52" />
                    {/if}
                </div>
                <h2 class="text-2xl text-primary font-bold capitalize mt-14 break-words">{user?.full_name || "Full Name"}</h2>
                <p class="text-sm text-slate-500 break-words">{user?.username || "username"}</p>
                <p class="text-sm break-words">{user?.bio || "No bio yet."}</p>
            </section>
            <section class="border-t-2 border-slate-200 py-4 px-4 flex flex-col gap-2">
                <button on:click={goToProfileEdit} class="text-sm text-primary text-center font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full
                                        hover:bg-secondary sm:absolute sm:top-4 sm:right-4 inline-block">EDIT PROFILE</button>
                <button class="text-sm text-white bg-red-600 font-semibold w-full sm:w-fit border-2 border-primary py-2 px-8 rounded-full"
                                        on:click={logout}>LOG OUT</button>
            </section>
        </section>
    </section>
</section>

<style>
    
    .profile-data > *:not(h2) {
        @apply mb-[1em];
    }

</style>