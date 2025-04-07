export const ssr = false;

export async function load({ url }) {
    const avatarUrl = url.searchParams?.get('avatarUrl') || null;
    return { avatarUrl };
}