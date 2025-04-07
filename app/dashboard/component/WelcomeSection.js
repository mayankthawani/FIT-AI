"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function WelcomeSection({ username }) {
  const trainingPaths = [
    {
      title: "Gym Enthusiast",
      icon: "💪",
      description: "Traditional workout routines with expert form tracking",
      features: ["Form Analysis", "Progress Tracking", "Strength Metrics"],
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard/workouts"
    },
    {
      title: "Gamer Zone",
      icon: "🎮",
      description: "Gamified workouts that make fitness fun and engaging",
      features: ["Quest System", "Achievement Unlocks", "Multiplayer Challenges"],
      color: "from-purple-500 to-pink-500",
      href: "/dashboard/gamer"
    },
    {
      title: "Rehabilitation",
      icon: "🏥",
      description: "Guided recovery exercises with careful monitoring",
      features: ["Gentle Routines", "Progress Tracking", "Recovery Metrics"],
      color: "from-green-500 to-emerald-500",
      href: "/dashboard/rehab"
    }
  ];

  return (
    <section className="min-h-screen py-12 relative overflow-hidden">
      {/* Gaming Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/gaming-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-gray-900/95" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid" />
        
        {/* Floating Particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rotate-45 transform -translate-x-32 -translate-y-32 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rotate-45 transform translate-x-32 translate-y-32 blur-3xl" />

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block mb-6"
        >
          <div className="text-6xl mb-2">🎮</div>
        </motion.div>
        <h2 className="text-5xl font-bold mb-4 relative">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Welcome Back, Hero
          </span>
        </h2>
        <h3 className="text-3xl font-gaming text-cyan-300 mb-2">{username}</h3>
        <p className="text-gray-400">Select Your Quest Path</p>
      </motion.div>

      {/* Training Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 relative z-10">
        {trainingPaths.map((path, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Link href={path.href}>
              <Card className="group h-full relative cursor-pointer border-2 border-transparent hover:border-cyan-500/50 bg-gray-900/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-all duration-300`} />
                  
                  {/* Card Content */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="text-5xl mb-6 transform transition-all duration-300"
                    >
                      {path.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 font-gaming">{path.title}</h3>
                    <p className="text-gray-400 mb-6">{path.description}</p>
                    
                    {/* Features with Gaming Icons */}
                    <ul className="space-y-3 mb-6">
                      {path.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-center gap-3">
                          <span className="text-cyan-400 text-lg">⚡</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Gaming-style Button */}
                    <Button 
                      className={`w-full bg-gradient-to-r ${path.color} font-gaming text-lg py-6
                        hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300
                        border border-white/10 group-hover:border-white/20`}
                    >
                      Start Quest
                      <span className="ml-2">➜</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Player Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 max-w-md mx-auto relative z-10"
      >
        <Card className="bg-gray-800/50 border border-cyan-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-cyan-400 font-gaming mb-1">Player Status</h3>
                <div className="text-sm text-gray-400">Ready for new quests</div>
              </div>
              <div className="text-2xl">⚔️</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
