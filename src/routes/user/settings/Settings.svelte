<script>
    import { goto } from "$app/navigation";

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

    let settings = $state([
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

</script>

<section class="bp:h-[max(calc(100vh-114px),500px)] max-h-[1080px] bg-slate-200 p-4 md:p-8">
    <section class="bg-white py-8 px-6 max-w-xl rounded-2xl mx-auto shadow-lg">
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
    </section>
</section>