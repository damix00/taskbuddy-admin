import {
    post_interactions,
    post_location,
    post_removals,
    posts,
    users,
} from "@prisma/client";

export interface Post extends posts {
    user: users;
    tags: {
        tag_id: number;
        translations: Record<string, string>;
    }[];
    media: {
        type: string;
        media: string;
    }[];
    post_removals: post_removals;
    post_interactions: post_interactions;
    post_location: post_location;
}
