"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { Search, X } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDefaultParams } from "../types";

export default function UserSearchField() {
    const router = useRouter();
    const params = useSearchParams();
    const searchValue = useRef<HTMLInputElement>(null);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        const search = searchValue.current?.value;

        router.push(
            `/dashboard/users?${
                search
                    ? getDefaultParams(params, { search })
                    : getDefaultParams(params, { search: "" })
            }`
        );
    };

    return (
        <form
            className="flex flex-row gap-2 items-center"
            onSubmit={handleSearch}>
            <Input
                ref={searchValue}
                className="w-full md:w-56"
                placeholder="Search..."
                defaultValue={params.get("search") || ""}
            />
            {params.get("search") && (
                <Button
                    size="iconSm"
                    variant="ghost"
                    onClick={(e) => {
                        e.preventDefault();
                        searchValue.current!.value = "";
                        router.push(
                            `/dashboard/users?${getDefaultParams(params, {
                                search: "",
                            })}`
                        );
                    }}>
                    <X className="w-4 h-4" />
                </Button>
            )}
            <Button size="icon" type="submit">
                <Search className="w-4 h-4" />
            </Button>
        </form>
    );
}
