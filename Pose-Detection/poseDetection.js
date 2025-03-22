"use client";

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { detectStanding } from "./utils/standing";
import { detectSquat } from "./utils/squat";
import { detectPushup } from "./utils/pushup";
import { auth, db } from "@/firebaseConfig"; // Import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { detectBicepCurl } from "./utils/bicepcurl";


const PoseDetection = ({ pose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [poseName, setPoseName] = useState("Detecting...");
  const [user, setUser] = useState(null);
  const [rep, setRep] = useState(false);
  const [coins, setCoins] = useState(0);
  let poseLandmarker;

  const updateCoinsInDB = async (userId, newCoins) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { coins: newCoins });
      console.log("Coins updated in Firestore:", newCoins);
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch username from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          console.log("User data from Firestore:", userDocSnap.data()); // Debugging
          setCoins(userDocSnap.data().coins || null);
        } else {
          console.log("No such user in Firestore");
        }
      } else {
        setUser(null);
        setCoins(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && coins !== null) {
      updateCoinsInDB(user.uid, coins);
    }
  }, [coins]); // Ensure coins updates when user changes

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

          let detectedPose = "Unknown";

          if (pose === "squat") {
            const isSquat = detectSquat(keypoints);
            // const isStanding = detectStanding(keypoints);
          
            if (isSquat) {
              detectedPose = "Standing";
              setRep(false);
            } else {
              detectedPose = "Squat";
              if (!rep) {
                setCoins((prevCoins) => prevCoins + 1); // Updates state, triggers useEffect
                setRep(true);
              }
            }
          }
          else if(pose === "pushup") {
            const isPushUp = detectPushup(keypoints);
          
            if (isPushUp) {
              detectedPose = "PushUp";
              if (!rep) {
                setCoins((prevCoins) => prevCoins + 1); // Updates state, triggers useEffect
                setRep(true);
              }
            } else {
              detectedPose = "Unknown";
              setRep(false);
            }
          }
          else if(pose === "bicepcurl"){
            const isBicepCurl = detectBicepCurl(keypoints);
            if (isBicepCurl) {
              detectedPose = "BicepCurl";
              if (!rep) {
                setCoins((prevCoins) => prevCoins + 1); // Updates state, triggers useEffect
                setRep(true);
              }
            } else {
              detectedPose = "Unknown";
              setRep(false);
            }
          }
          else {
            detectedPose = detectStanding(keypoints);
          }

          setPoseName(detectedPose);

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
  }, [pose]); // Ensure detection updates when pose changes

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <video
        ref={videoRef}
        className="absolute"
        style={{ width: "100%", height: "auto", maxWidth: "640px", border: "2px solid gray", borderRadius: "8px" }}
        autoPlay
        muted
        playsInline
      />

      <canvas
        ref={canvasRef}
        className="absolute"
        style={{ width: "100%", height: "auto", maxWidth: "640px" }}
      />

      <div className="absolute top-5 text-white text-2xl bg-gray-800 px-4 py-2 rounded-md">
        {poseName}
      </div>
    </div>
  );
};

export default PoseDetection;
