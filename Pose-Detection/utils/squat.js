export const detectSquat = (keypoints) => {
    const leftHip = keypoints[23];
    const rightHip = keypoints[24];
    const leftKnee = keypoints[25];
    const rightKnee = keypoints[26];
  
    const avgHipY = (leftHip.y + rightHip.y) / 2;
    const avgKneeY = (leftKnee.y + rightKnee.y) / 2;
  
    // ✅ If knees are significantly lower than hips, it's a squat
    return avgKneeY >= avgHipY *1.1 ? "Squat" : null;
  };