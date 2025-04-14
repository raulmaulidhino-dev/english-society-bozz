<script>

    import {Icon, User as Profile} from 'svelte-hero-icons';
    /**
     * @typedef {Object} Props
     * @property {any} [user]
     */

    /** @type {Props} */
    let { user = null } = $props();

</script>

<section class={`bg-slate-200 p-4 md:p-8`}>
    <section class="bg-white max-w-xl rounded-2xl mx-auto shadow-lg flex flex-col justify-center">
        <section class="bg-secondary w-full h-40 rounded-t-[inherit]">
        </section>
        <section class="rounded-b-[inherit] relative">
            <section class="pb-10 px-6 profile-data">
                <div class={`text-white bg-primary h-24 w-24 border-2 border-white rounded-full ${ user?.avatar_url ? "" : "p-2" } absolute top-[-48px] left-8 flex justify-center items-center`}>
                    {#if user?.avatar_url}
                        <img src={user.avatar_url} alt={`${user?.nickname || "User"}'s Avatar`} class="w-full rounded-[inherit]" />
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
