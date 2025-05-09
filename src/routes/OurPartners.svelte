<script lang="ts">
    import SMAN1BOBOTSARI_png from '$lib/images/partner_logos/SMAN-1-BOBOTSARI_logo.png';
    import SMAN1BOBOTSARI_webp from '$lib/images/partner_logos/SMAN-1-BOBOTSARI_logo.webp';
    import OSIS_SMAN1BOBOTSARI_png from '$lib/images/partner_logos/OSIS_logo.png';
    import OSIS_SMAN1BOBOTSARI_webp from '$lib/images/partner_logos/OSIS_logo.webp';
    import DahuniFoundation_png from '$lib/images/partner_logos/Dahuni-Foundation_logo.png';
    import DahuniFoundation_webp from '$lib/images/partner_logos/Dahuni-Foundation_logo.webp';
    import GangjinHS_png from '$lib/images/partner_logos/Gangjin-High-School_logo.png';
    import GangjinHS_webp from '$lib/images/partner_logos/Gangjin-High-School_logo.webp';
    import SDN1KALAPACUNG_png from '$lib/images/partner_logos/SDN-1-KALAPACUNG.png';
    import SDN1KALAPACUNG_webp from '$lib/images/partner_logos/SDN-1-KALAPACUNG.webp';

    import { onMount } from 'svelte';

    import AOS from 'aos';
    import 'aos/dist/aos.css';

    interface Partner {
        title: string;
        logo_png: string;
        logo_webp: string;
        websiteUrl: string;
    }

    let partners: Partner[] = [
        {title: "SMA Negeri 1 Bobotsari", logo_png: SMAN1BOBOTSARI_png, logo_webp: SMAN1BOBOTSARI_webp, websiteUrl: "http://sman1bobotsari.sch.id/"},
        {title: "OSIS SMA Negeri 1 Bobotsari", logo_png: OSIS_SMAN1BOBOTSARI_png, logo_webp: OSIS_SMAN1BOBOTSARI_webp, websiteUrl: "https://www.instagram.com/osis.sman1bbs"},
        {title: "Dahuni FOundation", logo_png: DahuniFoundation_png, logo_webp: DahuniFoundation_webp, websiteUrl: "https://www.dahunifoundation.com/"},
        {title: "Gangjin High School (강진고등학교)", logo_png: GangjinHS_png, logo_webp: GangjinHS_webp, websiteUrl: "https://gangjin.hs.jne.kr/"},
        {title: "SD Negeri 1 Kalapacung", logo_png: SDN1KALAPACUNG_png, logo_webp: SDN1KALAPACUNG_webp, websiteUrl: "https://dapo.dikdasmen.go.id/sekolah/1FFBC2870A0C15754506"},
    ];

    onMount(() => {
        AOS.init({ duration: 1200 });
    });

</script>

<section class="max-w-xl">
    <h3 data-aos="fade-right" class="text-xl text-primary font-bold">Our Partners :</h3>
    <section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {#each partners as partner}
            <a data-aos="zoom-in" href={partner.websiteUrl} title={partner.title} target="_blank" class="flex items-center justify-center w-30 h-30 p-2 bg-white rounded">
                <picture>
                    <source srcSet={partner.logo_webp} type="image/webp">
                    <img src={partner.logo_png} alt={partner.title} class="object-contain h-full w-full drop-shadow" loading="lazy" />
                </picture>
            </a>
        {/each}
    </section>
</section>