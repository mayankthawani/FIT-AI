"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function WorkoutsPage() {
  const exercises = [
    { name: "Squats", sets: 3, reps: 12, muscle: "Legs", icon: "🦵" },
    { name: "Push-ups", sets: 3, reps: 15, muscle: "Chest", icon: "💪" },
    { name: "Head Rotations", sets: 2, reps: 10, muscle: "Neck", icon: "🔄" },
    { name: "Bicep Curls", sets: 3, reps: 12, muscle: "Arms", icon: "💪" },
    { name: "Planks", sets: 3, time: "30s", muscle: "Core", icon: "🏋️" },
    { name: "Lunges", sets: 3, reps: 10, muscle: "Legs", icon: "🦿" },
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-900/90 py-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl w-full flex flex-col items-center justify-center mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-12">
          Today's Workout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
          {exercises.map((exercise, index) => (
            <Card 
              key={index}
              className="bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{exercise.icon}</span>
                  <span className="text-sm text-gray-400">{exercise.muscle}</span>
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{exercise.name}</h3>
                <div className="text-gray-300">
                  {exercise.sets} sets × {exercise.reps || exercise.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-gray-800/50 border border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">6</div>
              <div className="text-gray-400">Exercises</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">45</div>
              <div className="text-gray-400">Minutes</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border border-pink-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-400">300</div>
              <div className="text-gray-400">Calories</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
