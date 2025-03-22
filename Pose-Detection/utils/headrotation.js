import { getAngle } from "./poseUtils";

export const detectHeadRotation = (keypoints) => {
    const nose = keypoints[0];
    const leftear = keypoints[3];
    const rightear = keypoints[4];

    const headRotationAngle = getAngle(nose, leftear, rightear);
    return (headRotationAngle > 45) ? "head rotation" : null;
};