export const ssr = false;

export async function load({ url }) {
    const avatarUrl = url.searchParams?.get('avatarUrl') || null;

    const meta = {
        title: `Edit Avatar`,
        description: `Edit and manage my avatar`
    }

    return { avatarUrl, meta };
}