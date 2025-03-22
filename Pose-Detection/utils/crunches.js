import { getAngle } from "./poseUtils";

export const detectCrunches = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const lefthip = keypoints[23];
    const righthip = keypoints[24];
    const leftknee = keypoints[25];
    const rightknee = keypoints[26];
  
    const avgshoulder = {
        x: (leftshoulder.x + rightshoulder.x) / 2,
        y: (leftshoulder.y + rightshoulder.y) / 2
    };
    const avghip = {
        x: (lefthip.x + righthip.x) / 2,
        y: (lefthip.y + righthip.y) / 2
    };
    const avgknee = {
        x: (leftknee.x + rightknee.x) / 2,
        y: (leftknee.y + rightknee.y) / 2
    };

    const angle = getAngle(avgshoulder, avghip, avgknee);
    return (angle < 90) ? "crunches" : null;
};