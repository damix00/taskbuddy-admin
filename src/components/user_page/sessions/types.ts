export interface UserSession {
    id: number;
    user_id: number;
    ip_address: string;
    lat?: number | null;
    lon?: number | null;
    filters?: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface SessionsData {
    sessions: UserSession[];
    pages: number;
}
