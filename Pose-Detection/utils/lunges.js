import { getAngle } from "./poseUtils";

export const detectLunges = (keypoints) => {
    const leftShoulder = keypoints[11];
    const rightShoulder = keypoints[12];
    const leftHip = keypoints[23];
    const rightHip = keypoints[24];
    const leftKnee = keypoints[25];
    const rightKnee = keypoints[26];
    const leftAnkle = keypoints[27];
    const rightAnkle = keypoints[28];

    const leftLegAngle = getAngle(leftHip.x, leftKnee.x, leftAnkle.x, leftHip.y, leftKnee.y, leftAnkle.y);
    const rightLegAngle = getAngle(rightHip.x, rightKnee.x, rightAnkle.x, rightHip.y, rightKnee.y, rightAnkle.y);

    const leftTorsoAngle = getAngle(leftShoulder.x, leftHip.x, leftKnee.x, leftShoulder.y, leftHip.y, leftKnee.y);
    const rightTorsoAngle = getAngle(rightShoulder.x, rightHip.x, rightKnee.x, rightShoulder.y, rightHip.y, rightKnee.y);

    const lungeThreshold = 160;
    if (leftLegAngle < lungeThreshold && rightLegAngle > lungeThreshold && leftTorsoAngle < lungeThreshold) {
        return "left lunge";
    } else if (rightLegAngle < lungeThreshold && leftLegAngle > lungeThreshold && rightTorsoAngle < lungeThreshold) {
        return "right lunge";
    }

    return null;
};