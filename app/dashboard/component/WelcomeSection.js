"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function WelcomeSection({ username }) {
  const mockLevel = 12;

  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="relative h-screen w-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white overflow-hidden group transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-600 hover:to-pink-500">
        {/* Background Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-purple-900 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6"
        >
          <motion.div
            className="text-center space-y-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-6xl font-bold text-cyan-300 tracking-wider mb-4">
              Welcome Back
            </h2>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {username}
            </h1>
          </motion.div>

          {/* Quest section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center mt-12 mb-8"
          >
            <p className="text-xl text-yellow-300 font-gaming mb-2 animate-pulse">DAILY QUEST AVAILABLE!</p>
            <p className="text-2xl text-cyan-300">Ready to conquer today's fitness challenge?</p>
          </motion.div>

          <div className="mt-8 flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.08] transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-purple-600/50">
                    <span className="mr-2">⚔️</span> Start Quest
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border border-cyan-500">
                  <p className="text-white">Begin your daily fitness adventure!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:border-purple-500 hover:text-purple-400 transform hover:scale-[1.08] transition-all duration-200 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-purple-500/30">
                    <span className="mr-2">📊</span> Character Stats
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border border-cyan-500">
                  <p className="text-white">View your fitness journey progress</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
