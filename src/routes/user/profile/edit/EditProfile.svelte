<script>
    import { Icon, Camera } from 'svelte-hero-icons';
    import { onMount } from 'svelte';

    let inputs = [
        { label: 'Name', id: 'name', type: 'text', placeholder: 'John Doe', value: 'John Doe', min: '3', max: '100' },
        { label: 'Nickname', id: 'nickname', type: 'text', placeholder: 'John', value: 'John', min: '2', max: '10' },
        { label: 'Username', id: 'username', type: 'text', placeholder: 'johndoe', value: 'johndoe', min: '5', max: '20' },
        { label: 'Email', id: 'email', type: 'email', placeholder: 'johndoe@example.com', value: 'johndoe@example.com', min: '6', max: '40' },
    ];

    onMount(() => {
        const PFPContainer = document.getElementById("pfp_container");
        const pfp = document.getElementById("pfp");
        const camIcon = document.getElementById("cam_icon");

        PFPContainer.addEventListener("mouseenter", () => {
            pfp.className = "h-full aspect-inherit rounded-inherit filter mix-blend-multiply opacity-50";
            camIcon.className = "visible";

        });

        PFPContainer.addEventListener("mouseleave", () => {
            pfp.className = "h-full aspect-inherit rounded-inherit";
            camIcon.className = "invisible";
        });
    });

</script>

<section>
    <section class="py-10 px-6 flex flex-col justify-center items-start gap-1">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <section id="pfp_container" class="h-48 aspect-square border-4 border-l-primary border-b-primary border-r-secondary border-t-secondary rounded-full my-6 self-center bg-slate-600 relative overflow-hidden">
            <img id="pfp" src="https://picsum.photos/900?random=310" 
                 alt="User Photo Profile"
            />
            <div id="cam_icon"><Icon src={Camera} size="36" class="text-secondary absolute inset-0 m-auto" /></div>
        </section>
        <section class="w-full max-w-lg mx-auto flex flex-col gap-6">
            {#each inputs as input}
                <section class="w-full">
                    <label for={input.id} class="text-[12px] font-semibold text-primary block mb-2">{input.label}</label>
                    <input type={input.type} placeholder={input.placeholder} id={input.id} value={input.value} min={input.min} max={input.max} class="text-lg w-full border-b-[1px] pb-1 focus:border-primary focus:outline-none" />
                </section>
            {/each}
        </section>
        <a href="/user/profile/edit" class="text-sm text-primary text-center font-semibold w-full max-w-sm border-2 border-primary py-2 px-8 rounded-full my-8 self-center
                                      hover:bg-secondary">SAVE PROFILE</a>
    </section>
</section>