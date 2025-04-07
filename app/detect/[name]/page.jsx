"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PoseDetection from "@/Pose-Detection/poseDetection";
import ExerciseInstructions from "@/Pose-Detection/utils/ExerciseInstructions";

export default function Detect() {
    const { name } = useParams();
    const [video, setVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const handleToggle = () => {
        setIsLoading(true);
        setVideo(!video);
        // Hide instructions when starting video
        if (!video) {
            setShowInstructions(false);
        } else {
            // Show instructions when stopping video
            setTimeout(() => setShowInstructions(true), 500);
        }
        // Simulate loading delay
        setTimeout(() => setIsLoading(false), 1000);
    };
    
    // Format the exercise name for display
    const formatExerciseName = (name) => {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                        {formatExerciseName(name)} Exercise
                    </h1>
                    <p className="text-cyan-300 text-lg">
                        Get real-time feedback on your movement
                    </p>
                </div>

                {/* Instructions - shown when video is not active */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: showInstructions ? 1 : 0, height: showInstructions ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                >
                    {showInstructions && <ExerciseInstructions exerciseType={name} />}
                </motion.div>

                {/* Main Content */}
                <div className="relative bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <Button
                                onClick={handleToggle}
                                disabled={isLoading}
                                className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/30 text-lg font-semibold"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Initializing Camera...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        {video ? '🎥 Stop Practice' : '🎮 Start Practice'}
                                    </span>
                                )}
                            </Button>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: video ? 1 : 0, scale: video ? 1 : 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-lg overflow-hidden"
                        >
                            {video && <PoseDetection pose={name} />}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}