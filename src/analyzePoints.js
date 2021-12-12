const eyeCorners = {
  leftEar: 263,
  rightEar: 33,
  leftNose: 382,
  rightNose: 155,
};

const lipChinLeft = 365;
const lipChinRight = 150;

const dist = (p1, p2) => {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
};

const avgPoints = (p1, p2) => {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
};

export const getDistance = (prediction) => {
  const keypoints = prediction[0].scaledMesh;

  /*
  const x_avg =
    keypoints.map((k) => k[0]).reduce((a, b) => a + b, 0) / keypoints.length;
  const y_avg =
    keypoints.map((k) => k[1]).reduce((a, b) => a + b, 0) / keypoints.length;
  const center_point = [x_avg, y_avg];

  let total = 0;
  let n = 0;

  keypoints.forEach((k) => {
    n += 1;
    total += dist(k, center_point);
  });

  return (n / total) * 100;
  */

  return (
    1000 /
    dist(
      avgPoints(keypoints[eyeCorners.leftEar], keypoints[eyeCorners.leftNose]),
      avgPoints(keypoints[eyeCorners.rightEar], keypoints[eyeCorners.rightNose])
    )
  );
};

export const getAngle = (prediction) => {
  const keypoints = prediction[0].scaledMesh;

  return keypoints[eyeCorners.leftEar][2] - keypoints[eyeCorners.rightEar][2];
};
