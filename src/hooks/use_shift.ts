"use client";

import { useEffect, useState } from "react";

export function useShift() {
    const [shiftHeld, setShiftHeld] = useState(false);

    useEffect(() => {
        const handleChange = (e: KeyboardEvent): void => {
            setShiftHeld(e.shiftKey);
        };

        window.addEventListener("keydown", handleChange);
        window.addEventListener("keyup", handleChange);
        return (): void => {
            window.removeEventListener("keydown", handleChange);
            window.removeEventListener("keyup", handleChange);
        };
    }, []);

    return shiftHeld;
}

export function useControl() {
    const [controlHeld, setControlHeld] = useState(false);

    useEffect(() => {
        const handleChange = (e: KeyboardEvent): void => {
            setControlHeld(e.ctrlKey);
        };

        window.addEventListener("keydown", handleChange);
        window.addEventListener("keyup", handleChange);
        return (): void => {
            window.removeEventListener("keydown", handleChange);
            window.removeEventListener("keyup", handleChange);
        };
    }, []);

    return controlHeld;
}
