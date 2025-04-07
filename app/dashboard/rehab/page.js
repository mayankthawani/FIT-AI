"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RehabTraining() {
  // Animation variants for staggered list animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const rehabExercises = [
    {
      name: "wrist-rotate",
      title: "Wrist Rotation",
      description: "Pronation and supination exercises to improve wrist mobility",
      icon: "🔄"
    },
    {
      name: "head-rotate",
      title: "Neck Mobility",
      description: "Gentle head rotations to improve neck range of motion",
      icon: "🧠"
    }
    // Add more rehab exercises as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent mb-4">
            Rehabilitation Training
          </h1>
          <p className="text-green-300 text-lg max-w-2xl mx-auto">
            Guided exercises designed to aid recovery and improve mobility. Each exercise provides real-time feedback and tracking.
          </p>
        </div>

        {/* Exercise Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rehabExercises.map((exercise) => (
            <motion.div
              key={exercise.name}
              variants={item}
              className="relative bg-gray-800/50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur opacity-20"></div>
              <div className="relative h-full flex flex-col">
                <div className="text-4xl mb-4">{exercise.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{exercise.title}</h3>
                <p className="text-gray-300 mb-6 flex-grow">{exercise.description}</p>
                <Link href={`/detect/${exercise.name}`} passHref>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white">
                    Start Exercise
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}