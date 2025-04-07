function getWristTwistAngle(p1, p2, p3) {
  // Vector from elbow to wrist
  const v1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  // Vector from wrist to index finger
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

  // Cross product (2D)
  const cross = v1.x * v2.y - v1.y * v2.x;
  const dot = v1.x * v2.x + v1.y * v2.y;

  // Signed angle between the vectors
  const angle = Math.atan2(cross, dot) * (180 / Math.PI);
  return angle; // +ve or -ve depending on rotation direction
}

export const detectWristRotation = (keypoints) => {
  const leftWrist = keypoints[15];
  const rightWrist = keypoints[16];
  const leftIndex = keypoints[19];
  const rightIndex = keypoints[20];

  // Ensure z-coordinates exist
  if (
    leftWrist.z === undefined || leftIndex.z === undefined ||
    rightWrist.z === undefined || rightIndex.z === undefined
  ) {
    console.warn("Z-coordinates missing, can't detect wrist rotation.");
    return null;
  }

  const leftDeltaZ = leftIndex.z - leftWrist.z;
  const rightDeltaZ = rightIndex.z - rightWrist.z;

  // Tweak this threshold by logging real values
  const threshold = 0.05;

  const isLeftWristRotated = Math.abs(leftDeltaZ) > threshold;
  const isRightWristRotated = Math.abs(rightDeltaZ) > threshold;

  if (isLeftWristRotated || isRightWristRotated) {
    return "WristRotation";
  }

  console.log("Left ΔZ:", leftDeltaZ.toFixed(3), "Right ΔZ:", rightDeltaZ.toFixed(3));

  return null;
};

