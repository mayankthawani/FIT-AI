export const detectStanding = (keypoints) => {
    const leftHip = keypoints[23];
    const rightHip = keypoints[24];
    const leftKnee = keypoints[25];
    const rightKnee = keypoints[26];
  
    // ✅ Get average Y position of hips and knees
    const avgHipY = (leftHip.y + rightHip.y) / 2;
    const avgKneeY = (leftKnee.y + rightKnee.y) / 2;
  
    // ✅ If knees are **higher** than hips, person is NOT standing
    return avgKneeY < avgHipY * 1.1 ? "Standing" : null;
  };