"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getDefaultParams } from "../types";
import SearchInput from "@/components/input/SearchInput";

export default function UserSearchField() {
    const router = useRouter();
    const params = useSearchParams();

    return (
        <SearchInput
            handleSearch={(query) => {
                router.push(
                    `/dashboard/users?${getDefaultParams(params, {
                        search: query,
                    })}`
                );
            }}
            showClear={!!params.get("search")}
            defaultValue={params.get("search") || ""}
        />
    );
}
