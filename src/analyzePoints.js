const eyeCorners = {
  leftEar: 263,
  rightEar: 33,
  leftNose: 382,
  rightNose: 155,
};

const lipChinLeft = 365;
const lipChinRight = 150;
const faceTop = 10;
const faceBottom = 152;

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

export const averageAngles = (measures) => {
  var x = 0;
  var y = 0;
  measures.forEach((msr) => {
    x += msr.x;
    y += msr.y;
  });
  return { x: x / measures.length, y: y / measures.length };
};

export const overallXAngle = (prediction) => {
  const { xAngle, yAngle } = getAngle(prediction);
  const coords = getEyeAngle(prediction[0]);
  const xEyeAngle = (coords.leftIris.angleX + coords.rightIris.angleX) / 2;
  const eyeScalar = 2;

  console.log("xFaceAngle: " + xAngle);
  console.log("xEyeAngle: " + xEyeAngle);

  return xAngle + eyeScalar * xEyeAngle;
};

export const overallYAngle = (prediction) => {
  const { xAngle, yAngle } = getAngle(prediction);
  const coords = getEyeAngle(prediction[0]);
  const width = (coords.leftEye.width + coords.rightEye.width) / 2;
  const height = (coords.leftEye.height + coords.rightEye.height) / 2;
  const yEyeAngle =
    (coords.leftIris.angleY + coords.rightIris.angleY) / 2 / (height / width) +
    3;
  const eyeScalar = 5;

  console.log("xFaceAngle: " + yAngle);
  console.log("xEyeAngle: " + yEyeAngle);

  return yAngle + eyeScalar * yEyeAngle;
};

export const getAngle = (prediction) => {
  const keypoints = prediction[0].scaledMesh;

  const est1 =
    keypoints[eyeCorners.leftEar][2] - keypoints[eyeCorners.rightEar][2];
  const est2 =
    keypoints[eyeCorners.leftNose][2] - keypoints[eyeCorners.rightNose][2];
  const est3 = keypoints[lipChinLeft][2] - keypoints[lipChinRight][2];

  const xAngle = (2 * (est1 + est2 + est3)) / 3;
  const yAngle = keypoints[faceTop][2] - keypoints[faceBottom][2] + 30;

  return { xAngle, yAngle };
};

const irises = {
  rightIris: [474, 475, 476, 477],
  leftIris: [469, 470, 471, 472],
  rightEye: [
    33, 7, 163, 144, 145, 153, 154, 155, 33, 246, 161, 160, 159, 158, 157, 173,
    33,
  ],
  leftEye: [
    263, 249, 390, 373, 374, 380, 381, 382, 263, 466, 388, 387, 386, 385, 384,
    398, 263,
  ],
};

export const getEyeAngle = (prediction) => {
  const keypoints = prediction.scaledMesh;
  const hFOV = 35;
  const vFOV = 35;

  var leftIrisX = 0;
  var leftIrisY = 0;
  var leftIrisZ = 0;
  irises.leftIris.forEach((pt) => {
    leftIrisX += keypoints[pt][0];
    leftIrisY += keypoints[pt][1];
    leftIrisZ += keypoints[pt][2];
  });

  var rightIrisX = 0;
  var rightIrisY = 0;
  var rightIrisZ = 0;
  irises.rightIris.forEach((pt) => {
    rightIrisX += keypoints[pt][0];
    rightIrisY += keypoints[pt][1];
    rightIrisZ += keypoints[pt][2];
  });

  var leftEyeMax = 0;
  var leftEyeMin = 1000;
  irises.leftEye.forEach((pt) => {
    if (keypoints[pt][1] > leftEyeMax) leftEyeMax = keypoints[pt][1];
    if (keypoints[pt][1] < leftEyeMin) leftEyeMin = keypoints[pt][1];
  });

  var leftEye = {
    x:
      (keypoints[eyeCorners.leftEar][0] + keypoints[eyeCorners.leftNose][0]) /
      2,
    y: leftEyeMin + (leftEyeMax - leftEyeMin) / 2,
    z:
      (keypoints[eyeCorners.leftEar][2] + keypoints[eyeCorners.leftNose][2]) /
      2,
    width: Math.abs(
      keypoints[eyeCorners.leftEar][0] - keypoints[eyeCorners.leftNose][0]
    ),
    height: leftEyeMax - leftEyeMin,
  };

  var rightEyeMax = 0;
  var rightEyeMin = 1000;
  irises.rightEye.forEach((pt) => {
    if (keypoints[pt][1] > rightEyeMax) rightEyeMax = keypoints[pt][1];
    if (keypoints[pt][1] < rightEyeMin) rightEyeMin = keypoints[pt][1];
  });

  var rightEye = {
    x:
      (keypoints[eyeCorners.rightEar][0] + keypoints[eyeCorners.rightNose][0]) /
      2,
    y: rightEyeMin + (rightEyeMax - rightEyeMin) / 2,
    z:
      (keypoints[eyeCorners.rightEar][2] + keypoints[eyeCorners.rightNose][2]) /
      2,
    width: Math.abs(
      keypoints[eyeCorners.rightEar][0] - keypoints[eyeCorners.rightNose][0]
    ),
    height: rightEyeMax - rightEyeMin,
  };

  const coords = {
    leftIris: { x: leftIrisX / 4, y: leftIrisY / 4, z: leftIrisZ / 4 },
    rightIris: { x: rightIrisX / 4, y: rightIrisY / 4, z: rightIrisZ / 4 },
    leftEye,
    rightEye,
  };

  // left iris angle
  const leftAngleX =
    ((coords.leftIris.x - coords.leftEye.x) / (coords.leftEye.width / 2)) *
    hFOV;
  //const leftAngleX = coords.leftIris.x-coords.leftEye.x
  const leftAngleY =
    ((coords.leftIris.y - coords.leftEye.y) / (coords.leftEye.height / 2)) *
    vFOV;
  coords.leftIris.angleX = leftAngleX;
  coords.leftIris.angleY = leftAngleY;

  // right iris angle
  const rightAngleX =
    ((coords.rightIris.x - coords.rightEye.x) / (coords.rightEye.width / 2)) *
    hFOV;
  //const rightAngleX = coords.rightIris.x-coords.rightEye.x
  const rightAngleY =
    ((coords.rightIris.y - coords.rightEye.y) / (coords.rightEye.height / 2)) *
    vFOV;
  coords.rightIris.angleX = rightAngleX;
  coords.rightIris.angleY = rightAngleY;

  return coords;
};
