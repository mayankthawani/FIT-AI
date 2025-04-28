"use client";
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

export default function ExerciseVideo({ exerciseName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  // Map exercise names to their video files with exact case matching
  const videoMapping = {
    squat: '/videos/squatsddd.mp4',
    'pushup': '/videos/pushups.mp4',
    'headrotate': '/videos/head.mp4',
    'wristrotate': '/videos/wrist.mp4',
    'bicepcurl': '/videos/bicepcurl.mp4',
    
  };

  // Normalize exercise name and get video path
  const normalizedName = exerciseName?.toLowerCase().replace(/-/g, '');
  const videoPath = videoMapping[normalizedName];

  useEffect(() => {
    // Debug logging
    console.log('Exercise Name (original):', exerciseName);
    console.log('Exercise Name (normalized):', normalizedName);
    console.log('Video Path:', videoPath);
    console.log('Available mappings:', Object.keys(videoMapping));

    if (!videoPath) {
      setError(`No video found for exercise: ${exerciseName}`);
    }
  }, [exerciseName, normalizedName, videoPath]);

  // Handle video errors
  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
    setError(`Error loading video. Path: ${videoPath}`);
  };

  return (
    <Card className="bg-gray-800/50 border border-purple-500/20 p-4 mb-6">
      <h3 className="text-xl font-semibold text-cyan-300 mb-3">
        Demonstration Video
      </h3>
      <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-900">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm p-4">
            {error}
          </div>
        ) : (
          <video
            key={videoPath} // Force reload when path changes
            src={videoPath}
            controls
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={handleVideoError}
            poster="/images/video-placeholder.png" // Add a placeholder image
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </Card>
  );
}
