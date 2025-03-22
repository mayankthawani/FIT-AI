"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function WorkoutsPage() {
  const exercises = [
    { 
      name: "Squats", 
      sets: 3, 
      reps: 12, 
      muscle: "Legs", 
      icon: "🦵",
      description: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, keeping chest up and knees over toes.",
      difficulty: "Intermediate",
      targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"]
    },
    { 
      name: "Push-ups", 
      sets: 3, 
      reps: 15, 
      muscle: "Chest", 
      icon: "💪",
      description: "Start in plank position, lower body until chest nearly touches ground, push back up. Keep core tight throughout.",
      difficulty: "Beginner",
      targetMuscles: ["Chest", "Shoulders", "Triceps"]
    },
    { 
      name: "Head Rotations", 
      sets: 2, 
      reps: 10, 
      muscle: "Neck", 
      icon: "🔄",
      description: "Slowly rotate head in circular motions, keeping movements controlled. Helps reduce neck tension and improves mobility.",
      difficulty: "Easy",
      targetMuscles: ["Neck muscles", "Upper trapezius"]
    },
    { 
      name: "Bicep Curls", 
      sets: 3, 
      reps: 12, 
      muscle: "Arms", 
      icon: "💪",
      description: "Hold dumbbells at sides, palms forward. Curl weights toward shoulders while keeping elbows fixed at sides.",
      difficulty: "Intermediate",
      targetMuscles: ["Biceps", "Forearms"]
    },
    { 
      name: "Planks", 
      sets: 3, 
      time: "30s", 
      muscle: "Core", 
      icon: "🏋️",
      description: "Hold a straight-arm plank position, engaging core and keeping body in straight line from head to heels.",
      difficulty: "Intermediate",
      targetMuscles: ["Core", "Shoulders", "Back"]
    },
    { 
      name: "Lunges", 
      sets: 3, 
      reps: 10, 
      muscle: "Legs", 
      icon: "🦿",
      description: "Step forward with one leg, lowering hips until both knees are bent at 90 degrees. Alternate legs.",
      difficulty: "Beginner",
      targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"]
    },
  ];

  const exerciseCategories = {
    strength: [exercises[0], exercises[1], exercises[3]], // Squats, Push-ups, Bicep Curls
    mobility: [exercises[2]], // Head Rotations
    core: [exercises[4], exercises[5]], // Planks, Lunges
  };

  const handleClick = () => {
    
  }

  return (
    <section className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-violet-900/20 to-black relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />
      <div className="absolute inset-0 bg-black/50 -z-[1]" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-12 py-16 px-4 relative z-10"
      >
        {Object.entries(exerciseCategories).map(([category, exercises], categoryIndex) => (
          <motion.div
          onClick={handleClick}
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
          >
            <h2 className="text-2xl font-bold capitalize mb-6 text-gray-100">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {category}
              </span>
              <span className="text-gray-400 text-sm ml-2">Training</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-cyan-500/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg">
                            {exercise.icon}
                          </span>
                          <div>
                            <h3 className="text-xl font-bold text-cyan-400">{exercise.name}</h3>
                            <span className="text-sm text-gray-400">{exercise.muscle}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400">
                          {exercise.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {exercise.description}
                      </p>
                      
                      <div className="flex flex-col gap-2 bg-gray-800/30 p-3 rounded-lg">
                        <div className="text-gray-300 flex justify-between">
                          <span className="text-cyan-400 font-medium">Sets × Reps:</span>
                          <span>{exercise.sets} × {exercise.reps || exercise.time}</span>
                        </div>
                        <div className="text-gray-300 text-sm flex flex-wrap gap-1">
                          {exercise.targetMuscles.map((muscle, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 rounded-full bg-gray-700/50 text-xs"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
