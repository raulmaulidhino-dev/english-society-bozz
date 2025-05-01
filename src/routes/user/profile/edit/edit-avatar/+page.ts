export const ssr = false;
import type { Meta } from '$lib/types/meta/meta.js';

export async function load({ url }) {
    const avatarUrl: string | null = url.searchParams?.get('avatarUrl') || null;

    const meta: Meta = {
        title: `Edit Avatar`,
        description: `Edit and manage my avatar`
    }

    return { avatarUrl, meta };
}