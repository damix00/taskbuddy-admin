"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({
    handleSearch,
    showClear,
    defaultValue,
}: {
    handleSearch: (query: string) => void;
    showClear: boolean;
    defaultValue?: string;
}) {
    const searchValue = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-row gap-2 items-center">
            <Input
                ref={searchValue}
                className="w-full md:w-56"
                placeholder="Search..."
                defaultValue={defaultValue}
            />
            {showClear && (
                <Button
                    size="iconSm"
                    variant="ghost"
                    onClick={(e) => {
                        e.preventDefault();
                        searchValue.current!.value = "";
                        handleSearch("");
                    }}>
                    <X className="w-4 h-4" />
                </Button>
            )}
            <Button
                size="icon"
                type="submit"
                onClick={() => {
                    handleSearch(searchValue.current!.value);
                }}>
                <Search className="w-4 h-4" />
            </Button>
        </div>
    );
}
