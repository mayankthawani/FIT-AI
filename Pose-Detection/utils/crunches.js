import { getAngle } from "./poseUtils";

export const detectCrunches = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const lefthip = keypoints[23];
    const righthip = keypoints[24];
    const leftknee = keypoints[25];
    const rightknee = keypoints[26];
  
    const avgshoulder = (leftshoulder + rightshoulder) / 2;
    const avghip = (lefthip + righthip) / 2;
    const avgknee = (leftknee + rightknee) / 2;

    const angle = getAngle(avgshoulder, avghip, avgknee);
    return (angle < 90) ? "crunches" : null;
  };