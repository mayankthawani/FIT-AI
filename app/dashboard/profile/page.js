"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("");
  const [totalCoins, setTotalCoins] = useState(0);
  const [fitnessLevel, setFitnessLevel] = useState({
    level: 1,
    experience: 0,
    nextLevel: 100,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmail(currentUser.email);

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || "No Username");
          setTotalCoins(data.coins || 0);
          setFitnessLevel({
            level: data.level || 1,
            experience: data.experience || 0,
            nextLevel: data.nextLevel || 100,
          });
        }
      } else {
        setUser(null);
        setUsername("Guest");
        setEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-800/50 border border-cyan-500/20">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">Profile</h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-300">Username</h2>
                <p className="text-gray-400">{username}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-300">Email</h2>
                <p className="text-gray-400">{email}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-300">Total Coins</h2>
                <p className="text-gray-400">{totalCoins}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-300">Fitness Level</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-cyan-400 font-bold">Level {fitnessLevel.level}</span>
                  <span className="text-gray-400">
                    {fitnessLevel.experience}/{fitnessLevel.nextLevel} XP
                  </span>
                </div>
                <Progress
                  value={(fitnessLevel.experience / fitnessLevel.nextLevel) * 100}
                  className="h-4 bg-gray-700"
                />
                <div className="mt-2 text-gray-400 text-sm">
                  {fitnessLevel.nextLevel - fitnessLevel.experience} EXP needed for next level
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}