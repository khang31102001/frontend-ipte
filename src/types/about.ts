export interface About {
    about_id: number
    title?: string
    description?: string | null
    mission?: string | null
    vision?: string | null
    email?: string | null
    phone?: string | null
    hotline?: string | null
    website?: string | null
    address?: string | null
    facebook_url?: string | null
    zalo_url?: string | null
    created_at?: string
    updated_at?: string
    created_by?: string | null
    updated_by?: string | null
    version?: number
    category?: string | null
    map_url?: string | null
    tiktok_url?: string | null
    youtube_url?: string | null
}

export interface AboutItem {
    items: About[];
    page: number | null;
    page_size: number | null;
    total: number | null;
    total_pages: number | null;
}
