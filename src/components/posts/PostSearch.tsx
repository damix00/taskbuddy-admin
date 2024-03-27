"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../input/SearchInput";

export default function PostSearch() {
    const router = useRouter();
    const params = useSearchParams();

    return (
        <SearchInput
            handleSearch={(query) => {
                if (!query) {
                    router.push(`/dashboard/posts`);
                    return;
                }

                router.push(`/dashboard/posts?search=${query}`);
            }}
            showClear={!!params.get("search")}
            defaultValue={params.get("search") || ""}
        />
    );
}
