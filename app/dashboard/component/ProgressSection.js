"use client";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProgressSection() {
  const stats = [
    { label: "Strength", value: 75, color: "bg-cyan-500" },
    { label: "Agility", value: 60, color: "bg-purple-500" },
    { label: "Endurance", value: 85, color: "bg-pink-500" }
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-900/90 py-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full flex flex-col items-center justify-center mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-12">
          Quest Progress
        </h2>
        
        <div className="grid gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg text-gray-300">{stat.label}</span>
                  <span className="text-cyan-400">{stat.value}%</span>
                </div>
                <Progress value={stat.value} className={`h-2 ${stat.color}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 border border-cyan-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">24</div>
              <div className="text-gray-400">Quests Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400">7</div>
              <div className="text-gray-400">Active Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border border-pink-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-400">2.5K</div>
              <div className="text-gray-400">XP Earned</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
