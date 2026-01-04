export function truncateMiddle(text: string | null | undefined, startLen = 6, endLen = 4): string {
    if (!text) {
        return '';
    }

    if (text.length <= startLen + endLen + 3) {
        return text;
    }

    const start = text.slice(0, startLen);
    const end = text.slice(-endLen);

    return `${start}…${end}`;
}