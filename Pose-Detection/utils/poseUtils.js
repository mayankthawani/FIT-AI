export const getDistance = (p1x, p2x, p1y, p2y) => {
    return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
};

export const getAngle = (A, B, C, D, E, F) => {
    const AB = getDistance(A, B, D, E);
    const BC = getDistance(B, C, E, F);
    const AC = getDistance(A, C, D, F);

    return Math.acos((AB ** 2 + BC ** 2 - AC ** 2) / (2 * AB * BC)) * (180 / Math.PI);
};