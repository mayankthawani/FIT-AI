import { getAngle } from "./poseUtils";

export const detectBicepCurl = (keypoints) => {
    const leftshoulder = keypoints[11];
    const leftelbow = keypoints[13];
    const leftwrist = keypoints[15];
  
    

    const angle = getAngle(leftshoulder.x, leftelbow.x, leftwrist.x, leftshoulder.y, leftelbow.y, leftwrist.y);
    console.log(angle);
    return (angle < 90) ? "bicepcurl" : null;
  };