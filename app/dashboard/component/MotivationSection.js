"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MotivationSection() {
  const quote = {
    text: "Every rep brings you closer to legendary status!",
    author: "Master Trainer"
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center bg-gray-900/90">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full h-full flex flex-col justify-center items-center px-6"
      >
        <Card className="bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-cyan-500/20">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-8">💪</div>
            <blockquote className="text-2xl font-semibold text-cyan-300 mb-4">
              "{quote.text}"
            </blockquote>
            <cite className="text-gray-400">- {quote.author}</cite>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
