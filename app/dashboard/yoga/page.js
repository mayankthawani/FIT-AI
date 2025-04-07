'use client';  // Add this at the top
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';
import Link from 'next/link';

// Add keyframes for tilt animation
const animateTilt = {
  animate: {
    transform: ['perspective(1000px) rotateX(0deg)', 'perspective(1000px) rotateX(2deg)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const yogaPoses = [
  {
    name: 'Breathing Exercise',
    sanskrit: 'Pranayama',
    level: 'Beginner',
    xpReward: 30,
    unlockRequirement: 'Available to all levels',
    difficulty: 1, // Out of 5
    benefits: [
      'Reduces stress and anxiety',
      'Improves focus and concentration',
      'Increases oxygen flow',
      'Balances energy levels'
    ],
    description: 'A fundamental practice that focuses on controlling the breath to calm the mind and energize the body.',
    image: '/breathing-exercise.jpg', // Update with correct image path
    link: '/dashboard/yoga/breathing' // Link to the breathing exercise page
  },
  {
    name: 'Mountain Pose',
    sanskrit: 'Tadasana',
    level: 'Mediator',
    xpReward: 50,
    unlockRequirement: 'Complete 2 mediator poses',
    difficulty: 4, // Out of 5
    benefits: [
      'Strengthens upper body',
      'Stretches spine and hamstrings',
      'Improves blood circulation',
      'Relieves stress'
    ],
    description: 'A foundational yoga pose that forms an inverted V-shape, stretching and strengthening the entire body.',
    image: '/Mayank.jpeg' // Update with correct image path
  },
  {
    name: 'Downward-Facing Dog',
    sanskrit: 'Adho Mukha Svanasana',
    level: 'Beginner',
    xpReward: 100,
    unlockRequirement: 'Complete 3 beginner poses',
    difficulty: 2, // Out of 5
    benefits: [
      'Strengthens upper body',
      'Stretches spine and hamstrings',
      'Improves blood circulation',
      'Relieves stress'
    ],
    description: 'A foundational yoga pose that forms an inverted V-shape, stretching and strengthening the entire body.',
    image: '/OIP.jpeg' // Update with correct image path
  },
  {
    name: 'Tree Pose',
    sanskrit: 'Vrksasana',
    level: 'Beginner',
    xpReward: 150,
    unlockRequirement: 'Complete 5 beginner poses',
    difficulty: 3, // Out of 5
    benefits: [
      'Improves balance',
      'Strengthens legs and core',
      'Increases focus',
      'Builds confidence'
    ],
    description: 'A standing balance pose that improves concentration and stability while opening the hips.',
    image: '/yoga-tree-pose-extreme-photographer.jpg'
  },
  // Add more poses as needed
];

export default function YogaPage() {
  const [imageError, setImageError] = useState({});

  const handleImageError = (poseName) => {
    setImageError(prev => ({...prev, [poseName]: true}));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Yoga Poses
          </h1>
          <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
            Master poses to earn XP and unlock new achievements
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yogaPoses.map((pose, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              variants={animateTilt}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-purple-500/20">
                {pose.link ? (
                  <Link href={pose.link} className="block">
                    <div className="relative h-56">
                      {!imageError[pose.name] ? (
                        <Image
                          src={pose.image}
                          alt={pose.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(pose.name)}
                          priority={index < 2} // Prioritize loading for first two images
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <span className="text-gray-400">Image unavailable</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 z-20">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1">
                          {pose.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">✨</span>
                          <span className="text-white font-bold">{pose.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative h-56">
                    {!imageError[pose.name] ? (
                      <Image
                        src={pose.image}
                        alt={pose.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(pose.name)}
                        priority={index < 2} // Prioritize loading for first two images
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-400">Image unavailable</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1">
                        {pose.level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">✨</span>
                        <span className="text-white font-bold">{pose.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {pose.name}
                  </h2>
                  <p className="text-purple-400 italic mb-3 text-sm">{pose.sanskrit}</p>
                  
                  <div className="mb-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-8 rounded ${
                            i < pose.difficulty 
                              ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-cyan-300 text-sm">{pose.unlockRequirement}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-purple-400">Benefits:</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      {pose.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-cyan-400">◆</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}