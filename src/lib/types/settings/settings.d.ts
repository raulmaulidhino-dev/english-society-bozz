import type { IconSource } from "svelte-hero-icons";

export interface Setting {
    title: string;
    icon: IconSource;
    content: [
        { 
            title: string;
            icon: IconSource;
            href: string;
        }
    ];
    isActive: boolean;
}