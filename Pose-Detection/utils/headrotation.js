import { getAngle } from "./poseUtils";

export const detectHeadRotation = (keypoints) => {
    const nose = keypoints[0];
    const leftEar = keypoints[7];
    const rightEar = keypoints[8];
    const leftEye = keypoints[2];
    const rightEye = keypoints[5];

    // Calculate distances between ears and nose
    const leftEarToNose = Math.hypot(leftEar.x - nose.x, leftEar.y - nose.y);
    const rightEarToNose = Math.hypot(rightEar.x - nose.x, rightEar.y - nose.y);
    
    // Calculate ratio between distances
    const earRatio = leftEarToNose / rightEarToNose;
    
    // Adjusted thresholds for more accurate detection
    const rotationThreshold = 1.3; // More sensitive threshold
    const centerThreshold = 0.2; // Threshold for determining center position

    // Check if head is significantly rotated
    if (earRatio > 1 + rotationThreshold) {
        return "HeadRotation Right";
    } else if (earRatio < 1 / (1 + rotationThreshold)) {
        return "HeadRotation Left";
    } else if (Math.abs(earRatio - 1) <= centerThreshold) {
        return "Center";
    }

    return null;
};