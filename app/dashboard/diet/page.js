"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DietPage() {
  const diets = [
    {
      type: "Athlete's Power Diet",
      description: "Optimal nutrition plan for strength and muscle gain",
      icon: "💪",
      details: [
        {
          title: "Key Benefits",
          points: [
            "Enhanced muscle growth and recovery",
            "Improved strength and performance",
            "Sustained energy throughout workouts"
          ]
        },
        {
          title: "Macro Distribution",
          points: [
            "Protein: 30-35% (2.2g per kg bodyweight)",
            "Carbs: 45-50% (Complex carbohydrates)",
            "Fats: 20-25% (Healthy fats)"
          ]
        },
        {
          title: "Sample Meal Plan",
          points: [
            "Breakfast: Oatmeal with whey protein, banana, and almonds",
            "Mid-Morning: Greek yogurt with berries and honey",
            "Lunch: Grilled chicken breast, brown rice, mixed vegetables",
            "Pre-Workout: Sweet potato with tuna",
            "Post-Workout: Protein shake with banana",
            "Dinner: Salmon, quinoa, broccoli, olive oil"
          ]
        }
      ],
      color: "border-blue-500"
    },
    {
      type: "Fat Loss Focused Diet",
      description: "Strategic nutrition plan for effective fat loss while preserving muscle",
      icon: "🔥",
      details: [
        {
          title: "Key Benefits",
          points: [
            "Sustainable fat loss approach",
            "Preserved muscle mass",
            "Stable energy levels"
          ]
        },
        {
          title: "Macro Distribution",
          points: [
            "Protein: 35-40% (2.4g per kg bodyweight)",
            "Carbs: 30-35% (Timing around workouts)",
            "Fats: 25-30% (Essential fats)"
          ]
        },
        {
          title: "Sample Meal Plan",
          points: [
            "Breakfast: Egg whites, whole grain toast, spinach",
            "Mid-Morning: Protein bar with apple",
            "Lunch: Grilled chicken salad with olive oil dressing",
            "Snack: Celery with almond butter",
            "Dinner: Lean beef with asparagus"
          ]
        }
      ],
      color: "border-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent mb-8">
          Nutrition Guide
        </h1>
        
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Discover scientifically-backed nutrition plans tailored for different fitness goals. Each diet is designed to optimize your performance and help you achieve your desired results.
        </p>

        <div className="space-y-12">
          {diets.map((diet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className={`${diet.color} bg-gray-800/50`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{diet.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{diet.type}</h2>
                      <p className="text-gray-400">{diet.description}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {diet.details.map((section, i) => (
                      <div key={i} className="bg-gray-900/50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.points.map((point, j) => (
                            <li key={j} className="text-gray-300 flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
