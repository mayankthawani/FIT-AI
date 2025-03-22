"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [activeClass, setActiveClass] = useState('warrior');
  const [fitnessLevel, setFitnessLevel] = useState({
    level: 7,
    experience: 70,
    nextLevel: 100
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ToastProvider>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            FitAReena
          </div>
          <div className="flex gap-6">
            <Button 
              variant="ghost" 
              className="text-cyan-400"
              onClick={() => scrollToSection('features')}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-cyan-400"
              onClick={() => scrollToSection('gamemodes')}
            >
              Game Modes
            </Button>
            <Button 
              variant="ghost" 
              className="text-cyan-400"
              onClick={() => scrollToSection('classes')}
            >
              Classes
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">Login</Button>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-b from-black via-purple-900 to-black text-white pt-16">
        {/* Hero Section with Particles */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
          </div>
          <div className="text-center max-w-2xl relative z-10">
            <h1 className="text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
              Level Up Your Fitness Journey
            </h1>
            <p className="text-cyan-300 mt-4 text-lg">
              Transform your workouts into an epic quest. Train, compete, and conquer with AI-powered gameplay.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button className="px-8 py-4 text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-none shadow-lg shadow-purple-500/25">
                Get Started
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg border-cyan-500 text-cyan-400 hover:bg-cyan-950">
                View Leaderboard
              </Button>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce">
            <span className="text-cyan-400 text-2xl">↓</span>
          </div>
          {/* Add floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-500/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 20}px`,
                  height: `${Math.random() * 20}px`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`
                }}
              />
            ))}
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-12 bg-black/40">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-cyan-400">10K+</div>
              <div className="text-gray-400">Active Warriors</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-pink-400">50M+</div>
              <div className="text-gray-400">Workouts Completed</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-400">100K+</div>
              <div className="text-gray-400">Achievements Unlocked</div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-screen py-20 px-6 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Epic Features Await
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-cyan-400 text-4xl mb-4">👁️</div>
                  <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-cyan-400 transition-colors">
                    Real-Time Pose Detection
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Advanced AI tracks your form with precision, providing instant feedback to perfect your technique and prevent injuries.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-pink-400 text-4xl mb-4">📊</div>
                  <h3 className="text-2xl font-semibold text-pink-300 group-hover:text-pink-400 transition-colors">
                    Progress Tracking
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Watch your fitness journey unfold with detailed analytics, performance metrics, and achievement milestones.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-purple-400 text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-semibold text-purple-300 group-hover:text-purple-400 transition-colors">
                    Daily Challenges
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Face new exciting challenges every day. Complete unique workout combinations to earn special rewards and XP.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-blue-400 text-4xl mb-4">🏆</div>
                  <h3 className="text-2xl font-semibold text-blue-300 group-hover:text-blue-400 transition-colors">
                    Competitive Leaderboards
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Compete globally or with friends. Climb the ranks, earn titles, and showcase your fitness dominance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Game Modes Section with Tabs */}
        <section id="gamemodes" className="py-20 px-6 bg-purple/20">
          <h2 className="text-center text-xl mb-8">Game Modes</h2>
          <Tabs defaultValue="quests" className="max-w-xl mx-auto">
            <TabsList className="flex justify-center mb-8 space-x-4">
              <TabsTrigger value="quests">Quests</TabsTrigger>
              <TabsTrigger value="battle">Battle Arena</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="quests" className="text-center text-gray-300">
              Embark on daily quests like "Run 5km" or "Complete 50 push-ups" to earn experience points.
            </TabsContent>
            <TabsContent value="battle" className="text-center text-gray-300">
              Enter the Battle Arena to challenge other players in real-time fitness duels.
            </TabsContent>
            <TabsContent value="leaderboard" className="text-center text-gray-300">
              Compete against players worldwide and climb the leaderboard.
            </TabsContent>
          </Tabs>
        </section>

        {/* Character Classes Section */}
        <section id="classes" className="py-20 px-6 bg-black/40">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Choose Your Class
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {['warrior', 'rogue', 'mage'].map((classType) => (
              <Card 
                key={classType}
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 
                  ${activeClass === classType ? 'border-cyan-500' : 'border-gray-700'}`}
                onClick={() => setActiveClass(classType)}
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-cyan-300 capitalize">{classType}</h3>
                  <p className="text-gray-400 mt-2">
                    {classType === 'warrior' && 'Specializes in strength training'}
                    {classType === 'rogue' && 'Masters of cardio and agility'}
                    {classType === 'mage' && 'Focuses on flexibility and balance'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fitness Level Progress Bar */}
        <section className="py-20 px-6 bg-black/40">
          <h2 className="text-center text-xl mb-8">Your Fitness Level</h2>
          <div className="max-w-lg mx-auto bg-gray-900/50 p-8 rounded-lg shadow-md border border-cyan-500/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cyan-400 font-bold">Level {fitnessLevel.level}</span>
              <span className="text-gray-400">{fitnessLevel.experience}/{fitnessLevel.nextLevel} XP</span>
            </div>
            <Progress 
              value={(fitnessLevel.experience / fitnessLevel.nextLevel) * 100} 
              className="h-4 bg-gray-700"
            />
            <div className="mt-4 text-gray-400 text-sm text-center">
              {fitnessLevel.nextLevel - fitnessLevel.experience} XP needed for next level
            </div>
          </div>
        </section>

        {/* Achievements Showcase */}
        <section className="py-20 px-6 bg-purple-900/20">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-cyan-500 text-transparent bg-clip-text">
            Epic Achievements
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-900/50 rounded-lg border border-cyan-500/20 p-4 flex flex-col items-center justify-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-sm text-cyan-300 text-center">Achievement {i + 1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section - Fixed Structure */}
        <section className="py-20 px-6 bg-black/40">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Hero Stories
          </h2>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="story1">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="story1">Sarah's Journey</TabsTrigger>
                <TabsTrigger value="story2">Mike's Quest</TabsTrigger>
                <TabsTrigger value="story3">Lisa's Victory</TabsTrigger>
              </TabsList>
              <TabsContent value="story1" className="text-gray-300">Sarah transformed her life with FitQuest...</TabsContent>
              <TabsContent value="story2" className="text-gray-300">Mike discovered his inner strength...</TabsContent>
              <TabsContent value="story3" className="text-gray-300">Lisa achieved her fitness goals...</TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Toast Notifications */}
        <ToastViewport />

        {/* Enhanced Footer - Fixed Structure */}
        <footer className="bg-black/80 border-t border-cyan-500/20 py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">FitQuest</h3>
              <p className="text-gray-400">Level up your fitness journey</p>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Features</h3>
              <ul className="text-gray-400 space-y-2">
                <li>AI Training</li>
                <li>Quests</li>
                <li>Rewards</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Community</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Discord</li>
                <li>Twitter</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-4">Support</h3>
              <ul className="text-gray-400 space-y-2">
                <li>FAQ</li>
                <li>Contact</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 text-cyan-500/60 text-sm">
            © 2025 FitQuest Labs | Level Up Your Reality
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
