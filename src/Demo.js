import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam";
import { draw } from "./mask";

const Demo = () => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [frames, setFrames] = useState(0)
    
    const runPredict = async () => {
        console.log("loading model")
        const model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
        )
        console.log("detecting")
        detect(model)
    }
    const detect = async (model) => {
        const t0 = new Date().getTime()
        if (videoRef.current) {
          const webcamCurrent = videoRef.current;
          const videoWidth = webcamCurrent.video.videoWidth;
        const videoHeight = webcamCurrent.video.videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
          // go next step only when the video is completely uploaded.
          if (webcamCurrent.video.readyState === 4) {
            const video = webcamCurrent.video;
            const predictions = await model.estimateFaces({
              input: video,
            });
            if (predictions.length) {
              console.log(predictions);
              const ctx = canvasRef.current.getContext("2d")
              requestAnimationFrame(() => {
                  console.log("drawing")
                  draw(predictions, ctx, videoWidth, videoHeight)
              })
              
              const t1 = new Date().getTime()
              setFrames(1/((t1-t0)/1000))
              //detect(model)
            }
          }
        };
      };
    useEffect(() => {
        runPredict()
    }, [videoRef])
    
 return <div>
 <Webcam id="video" ref={videoRef}></Webcam>
 <canvas ref={canvasRef} />
 <p>{frames}</p>
</div>  
}

export default Demo