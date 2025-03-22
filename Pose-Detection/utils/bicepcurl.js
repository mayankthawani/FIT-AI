import { getAngle } from "./poseUtils";

export const detectPushup = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const leftelbow = keypoints[13];
    const rightelbow = keypoints[14];
    const leftwrist = keypoints[15];
    const rightwrist = keypoints[16];
  
    const avgshoulder = (leftshoulder + rightshoulder) / 2;
    const avgelbow = (leftelbow + rightelbow) / 2;
    const avgwrist = (leftwrist + rightwrist) / 2;

    const angle = getAngle(avgshoulder, avgelbow, avgwrist);
    return (angle < 90) ? "bicepcurl" : null;
  };