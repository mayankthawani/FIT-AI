import { getAngle } from "./poseUtils";

export const detectPushup = (keypoints) => {
    const leftshoulder = keypoints[11];
    const rightshoulder = keypoints[12];
    const leftelbow = keypoints[13];
    const rightelbow = keypoints[14];
    const leftwrist = keypoints[15];
    const rightwrist = keypoints[16];
  
    
  
    const angle = getAngle(leftshoulder, leftelbow, leftwrist);
    const angle2 = getAngle(rightshoulder, rightelbow, rightwrist);
    return (angle < 90) ? "pushup" : null;
  };