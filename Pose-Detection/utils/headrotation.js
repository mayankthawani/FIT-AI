import { getAngle } from "./poseUtils";

export const detectHeadRotation = (keypoints) => {
    const nose = keypoints[0];
    const leftear = keypoints[7];
    const rightear = keypoints[8];

    const headRotationAngle = getAngle(nose, leftear, rightear);
    return (headRotationAngle > 45) ? "head rotation" : null;
};