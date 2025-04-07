'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from "@/firebaseConfig";  // Adjust the import path as needed
import { onAuthStateChanged } from 'firebase/auth';

export default function BreathingExercisePage() {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, rest
  const [timer, setTimer] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [coins, setCoins] = useState(0);
  const [user, setUser] = useState(null);
  const cycleCompleteRef = useRef(false);
  const phaseTracker = useRef({ inhale: false, hold: false, exhale: false, rest: false });

  // Circle animation variants
  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 5, ease: "easeInOut" }
    },
    hold: {
      scale: 1.5,
      transition: { duration: 10, ease: "linear" }
    },
    exhale: {
      scale: 1,
      transition: { duration: 5, ease: "easeInOut" }
    },
    rest: {
      scale: 1,
      transition: { duration: 4, ease: "linear" }
    }
  };

  // Text prompts for each phase
  const phaseText = {
    inhale: "Breathe in deeply...",
    hold: "Hold your breath...",
    exhale: "Breathe out slowly...",
    rest: "Rest..."
  };

  // Timer durations for each phase
  const phaseDurations = {
    inhale: 5,
    hold: 10,
    exhale: 5,
    rest: 4
  };

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setCoins(0);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Update coins in database function
  const updateCoinsInDB = async (userId, newCoins) => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }
  
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { coins: newCoins });
      console.log("Coins updated in Firestore:", newCoins);
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  // Save coins to database when they change
  useEffect(() => {
    if (user && coins > 0) {
      updateCoinsInDB(user.uid, coins);
    }
  }, [coins, user]);

  // Manage the breathing cycle
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Move to next phase
            switch (phase) {
              case 'inhale':
                setPhase('hold');
                phaseTracker.current.inhale = true;
                return phaseDurations.hold;
              case 'hold':
                setPhase('exhale');
                phaseTracker.current.hold = true;
                return phaseDurations.exhale;
              case 'exhale':
                setPhase('rest');
                phaseTracker.current.exhale = true;
                return phaseDurations.rest;
              case 'rest':
                setPhase('inhale');
                phaseTracker.current.rest = true;
                
                // Check if a full cycle has been completed
                if (phaseTracker.current.inhale && 
                    phaseTracker.current.hold && 
                    phaseTracker.current.exhale && 
                    phaseTracker.current.rest) {
                  // Increment cycle count
                  setCompletedCycles(prev => prev + 1);
                  
                  // Award 3 coins for completed cycle
                  if (!cycleCompleteRef.current) {
                    setCoins(prevCoins => prevCoins + 3);
                    cycleCompleteRef.current = true;
                    
                    // Reset the flag after a brief delay to prevent multiple triggers
                    setTimeout(() => {
                      cycleCompleteRef.current = false;
                    }, 100);
                  }
                  
                  // Reset phase tracker for next cycle
                  phaseTracker.current = { inhale: false, hold: false, exhale: false, rest: false };
                }
                
                return phaseDurations.inhale;
              default:
                return phaseDurations.inhale;
            }
          }
          return prevTimer - 1;
        });
        
        setTotalTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase]);

  // Handle start/stop
  const toggleExercise = () => {
    if (!isActive) {
      // Reset for new start
      setPhase('inhale');
      setTimer(phaseDurations.inhale);
      // Reset phase tracker when starting
      phaseTracker.current = { inhale: false, hold: false, exhale: false, rest: false };
    }
    setIsActive(!isActive);
  };

  // Reset the exercise
  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(phaseDurations.inhale);
    setCompletedCycles(0);
    setTotalTime(0);
    // Reset the phase tracker
    phaseTracker.current = { inhale: false, hold: false, exhale: false, rest: false };
    // Don't reset coins so users keep their rewards
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/dashboard/yoga" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
            <ChevronLeft size={24} />
            <span className="ml-2">Back to Yoga Poses</span>
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            Breathing Exercise
          </h1>
          <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
            Follow the animation to calm your mind and focus your energy
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="relative mb-8">
            {/* Outer static circle */}
            <div className="w-64 h-64 rounded-full border-2 border-purple-500 opacity-30"></div>
            
            {/* Animated inner circle */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-70 blur-sm"
              variants={circleVariants}
              animate={phase}
            ></motion.div>
            
            {/* Animated solid inner circle */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400"
              variants={circleVariants}
              animate={phase}
            ></motion.div>
            
            {/* Text prompt */}
            <div className="absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center justify-center text-white font-medium text-xl pointer-events-none">
              {timer}
            </div>
          </div>
          
          <div className="text-2xl font-light text-cyan-300 mb-8">
            {phaseText[phase]}
          </div>
          
          <div className="flex gap-6">
            <button
              onClick={toggleExercise}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={resetExercise}
              className="px-8 py-3 bg-gray-700 rounded-full text-white font-medium hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Your Progress
          </h2>
          
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Completed Cycles</p>
              <p className="text-3xl font-bold text-cyan-400">{completedCycles}</p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Total Time</p>
              <p className="text-3xl font-bold text-purple-400">
                {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Coins Earned</p>
              <p className="text-3xl font-bold text-yellow-400">{coins}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-purple-400">Benefits of Deep Breathing:</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">◆</span>
                Reduces stress and anxiety
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">◆</span>
                Lowers heart rate and blood pressure
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">◆</span>
                Improves focus and concentration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">◆</span>
                Increases oxygen flow throughout your body
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}