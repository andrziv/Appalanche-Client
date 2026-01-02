export function getInterestColor(level: number): string {
    const clampedLevel = Math.max(1, Math.min(10, Math.round(level)));

    const hue = ((clampedLevel - 1) / 9) * 120;
    return `hsl(${Math.round(hue)}, 65%, 45%)`;
}