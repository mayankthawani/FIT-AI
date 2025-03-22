export const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const getAngle = (A, B, C) => {
    const AB = getDistance(A, B);
    const BC = getDistance(B, C);
    const AC = getDistance(A, C);

    return Math.acos((AB ** 2 + BC ** 2 - AC ** 2) / (2 * AB * BC)) * (180 / Math.PI);
};