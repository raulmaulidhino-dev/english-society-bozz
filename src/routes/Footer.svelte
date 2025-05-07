<script lang="ts">
    import { onMount } from 'svelte';

    import ESBozzLogo from '$lib/images/logos/es-bozz-logo-transparent.webp';
    import ESBozzLogo_fallback from '$lib/images/logos/es-bozz-logo-transparent.png';
    import SmansaLogo from '$lib/images/logos/sman1bobotsari-logo.webp';
    import SmansaLogo_fallback from '$lib/images/logos/sman1bobotsari-logo.png';

    import { Envelope as Email, Instagram, Youtube, Tiktok } from 'svelte-bootstrap-icons';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    let icons = [
        { icon: Email, link: 'mailto:englishsocietysmansabozz@gmail.com', title: 'Email Account', primaryColor: 'hover:bg-[#0072C6] hover:border-[#0072C6]'},
        { icon: Instagram, link: 'https://www.instagram.com/englishsocietybozz/', title: 'Instagram Official Account', primaryColor: 'hover:bg-[#E1306C] hover:border-[#E1306C]' },
        { icon: Youtube, link: 'https://www.youtube.com/@ENGLISHSOCIETYBOZZ', title: 'YouTube Official Account', primaryColor: 'hover:bg-[#FF0000] hover:border-[#FF0000]'},
        { icon: Tiktok, link: 'https://www.tiktok.com/@englishsocietybozz', title: 'TikTok Official Account', primaryColor: 'hover:bg-[#010101] hover:border-[#010101]'},
    ];

    const year: number = new Date().getFullYear();

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<footer class="py-12 px-10 mb-36 flex flex-wrap justify-between items-center gap-8">
    <div class="mx-auto sm:mx-0 flex items-center content-center gap-8">
        <a data-aos="zoom-in" href="/">
            <picture>
                <source type="image/webp" srcset={ESBozzLogo} />
                <img src={ESBozzLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-24">
            </picture>
        </a>
        <a data-aos="zoom-in" href="http://sman1bobotsari.sch.id" target="_blank">
            <picture>
                <source type="image/webp" srcset={SmansaLogo} />
                <img src={SmansaLogo_fallback} alt="SMA Negeri 1 Bobotsari logo" loading="lazy" class="w-24"/>
            </picture>
        </a>
    </div>
    <div class="mx-auto sm:mx-0 flex flex-col gap-4">
        <div>
            <ul class="flex justify-center items-center gap-2 sm:justify-start">
                {#each icons as icon}
                    <li data-aos="zoom-in" title={icon.title} class={`text-primary active:text-white hover:text-white p-2 border-2 border-primary rounded-[50%] ${icon.primaryColor}`}>
                        <a href={icon.link} target="_blank" rel="noopener noreferrer">
                            <icon.icon width={20} height={20} />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <p data-aos="zoom-in" class="text-gray-600 text-sm text-center sm:text-left">Copyright © 2024&mdash;{year} English Society-Bozz.<br /> All rights reserved.</p>
    </div>
</footer>