"use client"; // Ensures this runs only on the client side in Next.js

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [poseName, setPoseName] = useState("Detecting..."); // ✅ Track pose state
  let poseLandmarker;

  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        streamRef.current = stream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          if (canvasRef.current) {
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
          }
        };
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const loadPoseModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      detectPose();
    };

    const detectPose = async () => {
      if (!poseLandmarker || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const processFrame = async () => {
        if (!poseLandmarker || !videoRef.current) return;

        const poses = await poseLandmarker.detectForVideo(video, performance.now());

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (poses.landmarks.length > 0) {
          const keypoints = poses.landmarks[0];

          // ✅ Detect Pose based on Keypoints
          const detectedPose = recognizePose(keypoints);
          setPoseName(detectedPose); // Update UI with pose name

          // ✅ Draw Keypoints
          keypoints.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          });

          // ✅ Show Pose Name on Canvas
          ctx.fillStyle = "white";
          ctx.font = "20px Arial";
          ctx.fillText(detectedPose, 20, 40);
        }

        requestAnimationFrame(processFrame);
      };

      requestAnimationFrame(processFrame);
    };

    setupCamera().then(loadPoseModel);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // ✅ Function to Recognize Poses
  const recognizePose = (keypoints) => {
    if (!keypoints) return "Unknown";

    // Get Joint Positions
    const leftHip = keypoints[23];
    const rightHip = keypoints[24];
    const leftKnee = keypoints[25];
    const rightKnee = keypoints[26];

    // Calculate Knee Heights Relative to Hips
    const avgHipY = (leftHip.y + rightHip.y) / 2;
    const avgKneeY = (leftKnee.y + rightKnee.y) / 2;

    // Simple Pose Logic
    if (avgKneeY > avgHipY * 1.1) return "Standing"; // Knees are much lower
    return "Squat"; // Default Pose
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      {/* Video feed */}
      <video
        ref={videoRef}
        className="absolute"
        style={{ width: "100%", height: "auto", maxWidth: "640px", border: "2px solid gray", borderRadius: "8px" }}
        autoPlay
        muted
        playsInline
      />
      
      {/* Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{ width: "100%", height: "auto", maxWidth: "640px" }}
      />

      {/* Display Detected Pose */}
      <div className="absolute top-5 text-white text-2xl bg-gray-800 px-4 py-2 rounded-md">
        {poseName}
      </div>
    </div>
  );
};

export default PoseDetection;
