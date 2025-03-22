"use client";
import { useEffect, useRef, useState } from "react";

import PoseDetection from "@/Pose-Detection/poseDetection";
export default function Detect(){
    const [video, setVideo] = useState(false);

    const handleToggle = () => {
        setVideo(!video);
    };

    return (
        <div>
            <button onClick={handleToggle}>Toggle Video</button>
            {video && <PoseDetection pose="bicepcurl" />}
        </div>
    );
}
