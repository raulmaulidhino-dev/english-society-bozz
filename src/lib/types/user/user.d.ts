export interface UserProfile {
    full_name: string;
    nickname: string;
    username: string;
    bio: string;
    avatar_url: string;
    new_avatar_url: string | null;
    roles?: string[];
}