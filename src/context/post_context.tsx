"use client";

import { Post } from "@/components/user_page/posts/types";
import { createContext, useContext, useEffect, useState } from "react";

export type PostContextType = {
    post?: Post | null;
    setData: (data: Post) => any;
};

export const PostContext = createContext<PostContextType | null>(null);

export function PostContextCreator({ post }: { post: Post }) {
    const context = useContext(PostContext);

    if (!context) {
        return <></>;
    }

    useEffect(() => {
        context.setData(post);
    }, [post]);

    return <></>;
}

export function PostContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [postData, setPostData] = useState<Post | null>(null);

    return (
        <PostContext.Provider
            value={{
                post: postData,
                setData: setPostData,
            }}>
            {children}
        </PostContext.Provider>
    );
}
