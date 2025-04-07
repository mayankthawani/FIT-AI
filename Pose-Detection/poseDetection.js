"use client";

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { detectStanding } from "./utils/standing";
import { detectSquat } from "./utils/squat";
import { detectPushup } from "./utils/pushup";
import { detectHeadRotation } from "./utils/headrotation";
import { detectWristRotation } from "./utils/wristRotation";
import { auth, db } from "@/firebaseConfig"; // Import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { detectBicepCurl } from "./utils/bicepcurl";
import { detectLunges } from "./utils/lunges";


const PoseDetection = ({ pose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [poseName, setPoseName] = useState("Detecting...");
  const [user, setUser] = useState(null);
  const repRef = useRef(false);
  const [coins, setCoins] = useState(0);
  const [pushups, setPushups] = useState(0);
  const [squats, setSquats] = useState(0);
  const [crunches, setCrunches] = useState(0);
  const [lunges, setLunges] = useState(0);
  const [biceps, setBiceps] = useState(0);
  const [headers, setHeaders] = useState(0);
  const [count, setCount] = useState(0);
  const [leftRotations, setLeftRotations] = useState(0);
  const [rightRotations, setRightRotations] = useState(0);
  const [pronationCount, setPronationCount] = useState(0);
  const [supinationCount, setSupinationCount] = useState(0);
  const lastRotationTypeRef = useRef(null);
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

  const updateWristRotationsInDB = async (userId, newWristRotations) => {
    if (!userId){
      console.error("User not logged in");
      return;
    };
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { wristRotations: newWristRotations });
      console.log("Wrist rotations updated in Firestore:", newWristRotations);
    } catch (error) {
      console.error("Error updating wrist rotations:", error);
    }
  };  

  const updatePushupsInDB = async (userId, newPushups) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { pushups: newPushups });
      console.log("Pushups updated in Firestore:", newPushups);
    } catch (error) {
      console.error("Error updating pushups:", error);
    }
  };

  const updateSquatsInDB = async (userId, newSquats) => {
    if (!userId){ 
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in

    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { squats: newSquats });
      console.log("Squats updated in Firestore:", newSquats);
    } catch (error) {
      console.error("Error updating squats:", error);
    }
  };

  const updateCrunchesInDB = async (userId, newCrunches) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { crunches: newCrunches });
      console.log("Crunches updated in Firestore:", newCrunches);
    } catch (error) {
      console.error("Error updating crunches:", error);
    }
  };

  const updateLungesInDB = async (userId, newLunges) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { lunges: newLunges });
      console.log("Lunges updated in Firestore:", newLunges);
    } catch (error) {
      console.error("Error updating lunges:", error);
    }
  };

  const updateHeadRotationsInDB = async (userId, newHeadRotations) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { headers: newHeadRotations });
      console.log("Head rotations updated in Firestore:", newHeadRotations);
    } catch (error) {
      console.error("Error updating head rotations:", error);
    }
  };

  const updateBicepCurlsInDB = async (userId, newBicepCurls) => {
    if (!userId){
      console.error("User not logged in");
      return;
    }; // Ensure user is logged in
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { biceps: newBicepCurls });
      console.log("Bicep curls updated in Firestore:", newBicepCurls);
    } catch (error) {
      console.error("Error updating bicep curls:", error);
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
          setBiceps(userDocSnap.data().biceps || null);
          setCrunches(userDocSnap.data().crunches || null);
          setHeaders(userDocSnap.data().headers || null);
          setLunges(userDocSnap.data().lunges || null);
          setPushups(userDocSnap.data().pushups || null);
          setSquats(userDocSnap.data().squats || null);
          
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
    if (user && wristRotations !== null) {
      updateWristRotationsInDB(user.uid, wristRotations);
    }
  }, [wristRotations]);
  
  useEffect(() => {
    if (user && coins !== null) {
      updateCoinsInDB(user.uid, coins);
    }
  }, [coins]);
  
  useEffect(() => {
    if (user && pushups !== null) {
      updatePushupsInDB(user.uid, pushups);
    }
  }, [pushups]);
  
  useEffect(() => {
    if (user && headers !== null) {
      updateHeadRotationsInDB(user.uid, headers);
    }
  }, [leftRotations, rightRotations]);
  
  useEffect(() => {
    if (user && squats !== null) {
      updateSquatsInDB(user.uid, squats);
    }
  }, [squats]);
  
  useEffect(() => {
    if (user && lunges !== null) {
      updateLungesInDB(user.uid, lunges);
    }
  }, [lunges]);
  
  useEffect(() => {
    if (user && crunches !== null) {
      updateCrunchesInDB(user.uid, crunches);
    }
  }, [crunches]);
  
  useEffect(() => {
    if (user && biceps !== null) {
      updateBicepCurlsInDB(user.uid, biceps);
    }
  }, [biceps]);

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
              if(repRef.current) {
                repRef.current = false;
              }
            } else {
              detectedPose = "Squat";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setSquats((prevSquats) => prevSquats + 1);
                setCount((prevCount) => prevCount + 1); // Updates state, triggers useEffect
                repRef.current = true;
              }
            }
          }
          else if(pose === "pushup") {
            const isPushUp = detectPushup(keypoints);
          
            if (isPushUp) {
              detectedPose = "PushUp";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setPushups((prevPushups) => prevPushups + 1);
                setCount((prevCount) => prevCount + 1); // Updates state, triggers useEffect
                repRef.current = true;
              }
            } else {
              detectedPose = "Unknown";
              if(repRef.current) {
                repRef.current = false;
              }
            }
          }
          else if(pose === "wrist-rotate") {
            const wristRotation = detectWristRotation(keypoints);
            
            if (wristRotation === "Wrist Pronation") {
              detectedPose = "Pronation";
              if (!repRef.current && lastRotationTypeRef.current !== "pronation") {
                repSound.current.play();
                setCoins((prevCoins) => prevCoins + 1);
                setPronationCount(prev => prev + 1);
                repRef.current = true;
                lastRotationTypeRef.current = "pronation";
              }
            } else if (wristRotation === "Wrist Supination") {
              detectedPose = "Supination";
              if (!repRef.current && lastRotationTypeRef.current !== "supination") {
                repSound.current.play();
                setCoins((prevCoins) => prevCoins + 1);
                setSupinationCount(prev => prev + 1);
                repRef.current = true;
                lastRotationTypeRef.current = "supination";
              }
            } else if (wristRotation === "Neutral Position") {
              detectedPose = "Neutral";
              if(repRef.current) {
                repRef.current = false;
              }
            } else {
              detectedPose = "Center";
              if(repRef.current) {
                repRef.current = false;
              }
            }
          }                       
          else if(pose === "bicepcurl"){
            const isBicepCurl = detectBicepCurl(keypoints);
            if (isBicepCurl) {
              detectedPose = "BicepCurl";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setBiceps((prevBiceps) => prevBiceps + 1);
                setCount((prevCount) => prevCount + 1); // Updates state, triggers useEffect
                repRef.current = true;
              }
            } else {
              detectedPose = "Unknown";
              if(repRef.current) {
                repRef.current = false;
              }
            }
          }
          else if(pose === "crunches") {
            const isCrunches = detectCrunches(keypoints);
          
            if (isCrunches) {
              detectedPose = "Crunches";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setCrunches((prevCrunches) => prevCrunches + 1);
                setCount((prevCount) => prevCount + 1); // Updates state, triggers useEffect
                repRef.current = true;
              }
            } else {
              detectedPose = "Unknown";
              if(repRef.current) {
                repRef.current = false;
              }
            }
          }
          else if(pose === "head-rotate") {
            const headRotation = detectHeadRotation(keypoints);
          
            if (headRotation === "HeadRotation Left") {
              detectedPose = "Head Left";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setHeaders((prevHeaders) => prevHeaders + 1);
                setLeftRotations(prev => prev + 1);
                repRef.current = true;
              }
            } else if (headRotation === "HeadRotation Right") {
              detectedPose = "Head Right";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setRightRotations(prev => prev + 1);
                repRef.current = true;
              }
            } else {
              detectedPose = "Center";
              if(repRef.current) {
                repRef.current = false;
              }
            }
          }
          else if(pose === "lunges") {
            const isLunges = detectLunges(keypoints);
          
            if (isLunges) {
              detectedPose = "Lunges";
              if (!repRef.current) {
                setCoins((prevCoins) => prevCoins + 1);
                setLunges((prevLunges) => prevLunges + 1);
                setCount((prevCount) => prevCount + 1); // Updates state, triggers useEffect
                repRef.current = true;
              }
            } else {
              detectedPose = "Unknown";
              if(repRef.current) {
                repRef.current = false;
              }
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
        {pose === "head-rotate" ? (
          <div className="text-lg">
            Left: {leftRotations} | Right: {rightRotations}
          </div>
        ) : (
          <div>
            Count: {count}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoseDetection;
