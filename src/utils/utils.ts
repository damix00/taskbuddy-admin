export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function copyText(text: string) {
    navigator.clipboard.writeText(text);
}

function addPlural(s: string, count: number) {
    return count > 1 ? s + "s" : s;
}

export function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return (
            addPlural(Math.floor(interval) + " year", Math.floor(interval)) +
            " ago"
        );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return (
            addPlural(Math.floor(interval) + " month", Math.floor(interval)) +
            " ago"
        );
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return (
            addPlural(Math.floor(interval) + " day", Math.floor(interval)) +
            " ago"
        );
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return (
            addPlural(Math.floor(interval) + " hour", Math.floor(interval)) +
            " ago"
        );
    }
    interval = seconds / 60;
    if (interval > 1) {
        return (
            addPlural(Math.floor(interval) + " minute", Math.floor(interval)) +
            " ago"
        );
    }
    return (
        addPlural(Math.floor(seconds) + " second", Math.floor(seconds)) + " ago"
    );
}

export function bigintToInt(bigint: any) {
    return parseInt(bigint.toString());
}
