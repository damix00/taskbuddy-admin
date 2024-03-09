export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function copyText(text: string) {
    navigator.clipboard.writeText(text);
}
