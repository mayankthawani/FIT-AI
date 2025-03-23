"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProgressSection({ setTotalCoins, setBicep, setCrunches, setHeader, setLunges, setPushup, setSquat }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setTotalCoins(userDoc.data().coins || 0);
          setPushup(userDoc.data().pushups || 0);
          setSquat(userDoc.data().squats || 0);
          setHeader(userDoc.data().headers || 0);
          setBicep(userDoc.data().biceps || 0);
          setLunges(userDoc.data().lunges || 0);
          setCrunches(userDoc.data().crunches || 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setTotalCoins]);

  const stats = [
    { label: "Push-Ups", count: userData?.pushups || 0, targetCount: 150, color: "border-cyan-500", coins: userData?.pushups || 80 },
    { label: "Squats", count: userData?.squats || 0, targetCount: 150, color: "border-purple-500", coins: userData?.squats || 32 },
    { label: "Bicep Curls", count: userData?.biceps || 0, targetCount: 200, color: "border-pink-500", coins: userData?.biceps || 21 },
    { label: "Crunches", count: userData?.crunches || 0, targetCount: 10, color: "border-blue-500", coins: userData?.plankCoins || 29 },
    { label: "Lunges", count: userData?.lunges || 0, targetCount: 100, color: "border-green-500", coins: userData?.lunges || 45 },
    { label: "Head Rotator", count: userData?.headers || 0, targetCount: 50, color: "border-yellow-500", coins: userData?.headers|| 10 },
  ];

  // Updated star calculation logic
  const calculateStars = (count) => {
    const stars = Math.floor(count / 5); // One star for every 5 counts
    return "⭐".repeat(Math.min(stars, 5)); // Maximum of 5 stars
  };

  // Calculate completed quests (exercises with 5 or more counts)
  const completedQuests = stats.filter(stat => stat.count >= 5).length;

  const totalCoins = userData?.coins || 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
          Exercise Progress
        </h2>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className={`bg-gray-800/50 border-2 ${stat.color} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <CardContent className="p-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-200">{stat.label}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🪙</span>
                      <span className="text-yellow-400">{stat.coins}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg text-gray-300">
                      Total: {stat.count}
                    </div>
                    <div className="text-2xl">
                      {calculateStars(stat.count)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 border-2 border-cyan-500/20 rounded-xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-cyan-400">{completedQuests}</div>
              <div className="text-xl text-gray-400">Quests Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-2 border-purple-500/20 rounded-xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-purple-400">7</div>
              <div className="text-xl text-gray-400">Active Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-2 border-yellow-500/20 rounded-xl shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                <span>🪙</span>
                {totalCoins}
              </div>
              <div className="text-xl text-gray-400">Total Coins</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
