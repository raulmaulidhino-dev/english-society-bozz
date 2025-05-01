export interface EventResponse {
    id: string;
    title: string;
    location: string;
    date: string;
    description: string;
    image_url?: string;
    slug: string;
    event_maker_name: string;
    event_maker_username: string;
    is_anonymous: boolean;
    created_at: string;
    updated_at: string;
}

export interface EventsResponse {
    data: EventResponse[];
    count: number;
}