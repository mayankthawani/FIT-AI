import { getAngle } from "./poseUtils";

export const detectPushup = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const lefthip = keypoints[23];
    const righthip = keypoints[24];
    const leftankle = keypoints[27];
    const rightankle = keypoints[28];

    const avgshoulder = {
        x: (leftshoulder.x + rightshoulder.x) / 2,
        y: (leftshoulder.y + rightshoulder.y) / 2
    };
    const avghip = {
        x: (lefthip.x + righthip.x) / 2,
        y: (lefthip.y + righthip.y) / 2
    };
    const avgankle = {
        x: (leftankle.x + rightankle.x) / 2,
        y: (leftankle.y + rightankle.y) / 2
    };

    const angle = getAngle(avgshoulder, avghip, avgankle);
    return (angle < 45) ? "pushup" : null;
};