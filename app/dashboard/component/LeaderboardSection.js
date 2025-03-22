"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function LeaderboardSection() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().username || "Anonymous",
          points: doc.data().coins || 0,
        }));

        // Sort users by coins (points) in descending order
        const sortedUsers = userData.sort((a, b) => b.points - a.points)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
            badge: index === 0 ? "🏆" : index === 1 ? "⚔️" : "🎯"
          }));

        setPlayers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-900/90 py-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl w-full flex flex-col justify-center items-center px-6"
      >
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-12">
          Battle Rankings
        </h2>

        <div className="grid gap-4 w-full">
          {players.map((player) => (
            <Card 
              key={player.id}
              className="bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{player.badge}</span>
                  <div>
                    <div className="font-bold text-cyan-400">{player.name}</div>
                    <div className="text-sm text-gray-400">Rank #{player.rank}</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-purple-400">{player.points} XP</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
