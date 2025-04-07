import { getAngle } from "./poseUtils";

export const detectWristRotation = (keypoints) => {
  // Get relevant landmarks
  const wrist = keypoints[15]; // Left wrist
  const elbow = keypoints[13]; // Left elbow
  const shoulderLandmark = keypoints[11]; // Left shoulder
  
  // Get hand landmarks - index finger base and pinky base 
  const indexFingerBase = keypoints[19]; // Index finger MCP joint
  const pinkyBase = keypoints[17]; // Pinky MCP joint
  
  if (!wrist || !elbow || !shoulderLandmark || !indexFingerBase || !pinkyBase) {
    return null;
  }

  // Calculate wrist position relative to arm
  const forearmAngle = getAngle(
    shoulderLandmark.x, elbow.x, wrist.x,
    shoulderLandmark.y, elbow.y, wrist.y
  );
  
  // Calculate hand orientation (using index and pinky finger bases)
  const handVector = {
    x: indexFingerBase.x - pinkyBase.x,
    y: indexFingerBase.y - pinkyBase.y
  };
  
  // Calculate forearm vector
  const forearmVector = {
    x: wrist.x - elbow.x,
    y: wrist.y - elbow.y
  };
  
  // Calculate the angle between the hand axis and forearm
  // Normalize vectors
  const forearmLength = Math.sqrt(forearmVector.x * forearmVector.x + forearmVector.y * forearmVector.y);
  const handLength = Math.sqrt(handVector.x * handVector.x + handVector.y * handVector.y);
  
  const normalizedForearmVector = {
    x: forearmVector.x / forearmLength,
    y: forearmVector.y / forearmLength
  };
  
  const normalizedHandVector = {
    x: handVector.x / handLength,
    y: handVector.y / handLength
  };
  
  // Calculate dot product (gives cosine of angle when vectors are normalized)
  const dotProduct = normalizedForearmVector.x * normalizedHandVector.x + 
                      normalizedForearmVector.y * normalizedHandVector.y;
  
  // Calculate cross product to determine rotation direction
  const crossProduct = normalizedForearmVector.x * normalizedHandVector.y - 
                        normalizedForearmVector.y * normalizedHandVector.x;
  
  // Convert dot product to angle
  let rotationAngle = Math.acos(Math.max(-1, Math.min(1, dotProduct))) * (180 / Math.PI);
  
  // Adjust angle based on cross product sign (to get direction)
  if (crossProduct < 0) {
    rotationAngle = -rotationAngle;
  }
  
  // Determine rotation type based on angle
  // These thresholds can be adjusted based on testing
  if (rotationAngle > 30) {
    return "Wrist Pronation"; // Rotating inward
  } else if (rotationAngle < -30) {
    return "Wrist Supination"; // Rotating outward
  } else if (Math.abs(rotationAngle) <= 15) {
    return "Neutral Position";
  }
  
  return null;
};