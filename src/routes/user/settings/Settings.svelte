<script lang="ts">
    import { db } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import type { Setting } from "$lib/types/settings/settings";

    import {
        Icon,
        // Helper Icons
        ChevronRight as RightIcon,
        ChevronDown as DownIcon,
        // User Management Icons
        UserCircle as UserIcon,
        PencilSquare as EditProfileIcon,
        // Security Management Icons
        ShieldCheck as SecurityIcon,
        Key as ChangePasswordIcon
    } from "svelte-hero-icons";

    import Notification from '$lib/components/Notification.svelte';

    let settings: Setting[] = $state([
        {
            title: "User",
            icon: UserIcon,
            content: [
                { title: "Edit Profile", icon: EditProfileIcon, href: "/user/profile/edit" },
            ],
            isActive: false,
        },
        
        {
            title: "Security",
            icon: SecurityIcon,
            content: [
                { title: "Change Password", icon: ChangePasswordIcon, href: "/user/settings/change-password" },
            ],
            isActive: false,
        },
    ]);

    let notificationMessage: string = $state("");
    let notificationType: string = $state("");
    let showNotification: boolean = $state(false);

    const logout = async () => {
        notificationMessage = "";
        notificationType = "success";
        showNotification = false;

        const { error } = await db.auth.signOut();

        if (error) {
            notificationMessage = "Failed to log you out!";
            notificationType = "error";
            showNotification = true;
        } else {
            notificationMessage = "You have been logged out successfully!";
            notificationType = "info";
            showNotification = true;

            setTimeout(() => {
                goto('/')
            }, 3000);
        };
    }

</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white pt-8 pb-6 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
        <h1 class="text-3xl text-center sm:text-4xl font-bold px-8 md:px-8 pt-6 mb-[1em]">Settings</h1>
        <article class="max-w-80 mx-auto flex flex-col gap-4">
                {#each settings as setting}
                <section class="bg-slate-100 w-full rounded-md p-2">
                    <button onclick={() => setting.isActive = !setting.isActive} class="w-full flex items-center gap-3">
                        <Icon src={setting.icon} size="32" class="text-primary" />
                        <span class="font-semibold">{setting.title}</span>
                        <Icon src={setting.isActive ? DownIcon : RightIcon} solid size="25" class="ml-auto" />
                    </button>
                    <section class={`${setting.isActive ? "" : "hidden"} bg-white rounded-sm mt-2`}>
                        {#each setting.content as content}
                            <button onclick={() => goto(content.href)} class="p-2 ml-8 flex items-center gap-2">
                                <Icon src={content.icon} size="19" class="text-secondary" />
                                <span class="text-sm font-medium">{content.title}</span>
                            </button>
                        {/each}
                    </section>
                </section>
                {/each}
        </article>
        <article class="bg-red-100 rounded-md p-6 mt-4 flex flex-col gap-2">
            <h2 class="text-xl text-center font-bold mb-[0.75em]">DANGER ZONE</h2>
            <button class="text-sm text-white bg-red-600 font-semibold w-full md:max-w-40 border-2 border-primary py-2 px-8 rounded-full mx-auto"
                    onclick={logout}>
                    LOG OUT
            </button>
        </article>    
    </section>
</section>

{#if showNotification}
    <Notification message={notificationMessage} type={notificationType} duration={5000} />
{/if}
