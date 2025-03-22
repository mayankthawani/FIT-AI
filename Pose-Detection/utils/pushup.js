import { getAngle } from "./poseUtils";

export const detectPushup = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const leftelbow = keypoints[13];
    const rightelbow = keypoints[14];
    const leftwrist = keypoints[15];
    const rightwrist = keypoints[16];

    const avgshoulder = {
        x: (leftshoulder.x + rightshoulder.x) / 2,
        y: (leftshoulder.y + rightshoulder.y) / 2
    };
    const avgelbow = {
        x: (leftelbow.x + rightelbow.x) / 2,
        y: (leftelbow.y + rightelbow.y) / 2
    };
    const avgwrist = {
        x: (leftwrist.x + rightwrist.x) / 2,
        y: (leftwrist.y + rightwrist.y) / 2
    };

    const angle = getAngle(avgshoulder.x, avgelbow.x, avgwrist.x, avgshoulder.y, avgelbow.y, avgwrist.y);
    return (angle < 45) ? "pushup" : null;
};