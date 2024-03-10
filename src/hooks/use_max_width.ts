"use client";

import { useEffect, useState } from "react";

export default function useMaxWidth(data?: {
    subMaxWidth?: number;
    subMaxWidthMobile?: number;
}) {
    const [maxWidthState, setMaxWidth] = useState(1e9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMaxWidth(
                    window.innerWidth -
                        (data?.subMaxWidthMobile || data?.subMaxWidth || 0)
                );
            } else {
                setMaxWidth(window.innerWidth - (data?.subMaxWidth || 0));
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return maxWidthState;
}
