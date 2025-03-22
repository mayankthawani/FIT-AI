"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="relative h-screen w-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back, Warrior!
          </h1>
          <p className="mt-6 text-xl text-cyan-300">Ready for today's fitness quest?</p>
          <div className="mt-8 flex gap-4">
            
            <Button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              Start Workout
            </Button>
            <Button variant="outline" className="px-6 py-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950">
              View Stats
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
