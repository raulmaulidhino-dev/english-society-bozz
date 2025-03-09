<script>
    import defaultPFP from '$lib/images/defaults/default_pfp.svg';
</script>

<section>
    <section class="py-10 px-6 flex flex-col justify-center items-center gap-1">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src="https://picsum.photos/900?random=310" 
             alt="User Photo Profile"
             class="h-24 rounded-full my-6"
        />
        <h2 class="text-3xl text-primary font-bold">John Doe</h2>
        <p class="text-sm text-slate-500">johndoe</p>
        <p class="text-sm text-center my-2 mx-4">In a galaxy far, far away .... lorem ipsum dolor sit amet </p>
        <a href="/user/profile/edit" class="text-sm text-primary font-semibold border-2 border-primary py-2 px-8 rounded-full my-4
                                      hover:bg-secondary">EDIT PROFILE</a>
    </section>
</section>