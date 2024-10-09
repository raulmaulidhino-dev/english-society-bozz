<script>
    import ESBozzLogo from '$lib/images/logos/es-bozz-logo-circle.webp';
    import ESBozzLogo_fallback from '$lib/images/logos/es-bozz-logo-circle.png';
    import SmansaLogo from '$lib/images/logos/sman1bobotsari-logo.webp';
    import SmansaLogo_fallback from '$lib/images/logos/sman1bobotsari-logo.png';

    import { Envelope as Email, Instagram, Youtube, Tiktok } from 'svelte-bootstrap-icons';

    let icons = [
        { icon: Email, link: 'mailto:englishsocietysmansabozz@gmail.com', title: 'Email Account', primaryColor: 'hover:bg-[#0072C6] hover:border-[#0072C6]'},
        { icon: Instagram, link: 'https://www.instagram.com/englishsocietybozz/', title: 'Instagram Official Account', primaryColor: 'hover:bg-[#E1306C] hover:border-[#E1306C]' },
        { icon: Youtube, link: 'https://www.youtube.com/@ENGLISHSOCIETYBOZZ', title: 'YouTube Official Account', primaryColor: 'hover:bg-[#FF0000] hover:border-[#FF0000]'},
        { icon: Tiktok, link: 'https://www.tiktok.com/@englishsocietybozz', title: 'TikTok Official Account', primaryColor: 'hover:bg-[#010101] hover:border-[#010101]'},
    ];
</script>

<footer class="py-4 px-8 flex flex-wrap justify-between items-center gap-y-8">
    <div class="flex items-center gap-4">
        <picture>
            <source type="image/webp" srcset={ESBozzLogo} />
            <img src={ESBozzLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-32">
        </picture>
        <picture>
            <source type="image/webp" srcset={SmansaLogo} />
            <img src={SmansaLogo_fallback} alt="English Society-Bozz logo" loading="lazy" class="w-24"/>
        </picture>
    </div>
    <div class="flex flex-col gap-4">
        <div>
            <ul class="flex items-center gap-2">
                {#each icons as icon}
                    <li class={`p-2 border-2 border-primary rounded-[50%] ${icon.primaryColor}`}>
                        <a href={icon.link} target="_blank" title={icon.title} rel="noopener noreferrer" class="text-primary active:text-white hover:text-white">
                            <svelte:component this={icon.icon} width={20} height={20} />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <p class="text-gray-600 text-sm text-center">Copyright © 2024 English Society-Bozz.<br /> All rights reserved.</p>
    </div>
</footer>

<style>

    
</style>