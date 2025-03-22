"use client"
import { useState, useEffect } from "react";
import Header from "./component/Header";
import WelcomeSection from "./component/WelcomeSection";
import LeaderboardSection from "./component/LeaderboardSection";
import ProgressSection from "./component/ProgressSection";
import MotivationSection from "./component/MotivationSection";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth, db } from "@/firebaseConfig"; // Import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch username from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          console.log("User data from Firestore:", userDocSnap.data()); // Debugging
          setUsername(userDocSnap.data().username || "No Username");
        } else {
          console.log("No such user in Firestore");
          setUsername("User");
        }
      } else {
        setUser(null);
        setUsername("Guest");
      }
    });

    return () => unsubscribe();
  }, []);


  const menuItems = [
    { id: 'home', icon: '🏰', label: 'Hub' },
    { id: 'progress', icon: '📊', label: 'Stats' },
    { id: 'leaderboard', icon: '🏆', label: 'Rankings' },
    { id: 'quests', icon: '⚔️', label: 'Quests' },
    { id: 'rewards', icon: '💎', label: 'Rewards' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
      <Header />
      
      {/* Dashboard Layout */}
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-gray-900/50 backdrop-blur-md border-r border-cyan-500/20">
          <ScrollArea className="h-full px-4 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${
                    activePage === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400'
                  }`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="text-xl md:text-2xl">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Quick Stats Cards */}
              <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 p-4">
                <div className="text-2xl font-bold">{username}</div>
              </div>
              {/* Add more quick stat cards */}
            </div>

            {/* Dynamic Content Based on Active Page */}
            <div className="space-y-6">
              {activePage === 'home' && <WelcomeSection username={username} />}
              {activePage === 'progress' && <ProgressSection />}
              {activePage === 'leaderboard' && <LeaderboardSection />}
              {activePage === 'motivation' && <MotivationSection />}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Activity Feed */}
        <aside className="hidden lg:block w-80 bg-gray-900/50 backdrop-blur-md border-l border-cyan-500/20 p-4">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Activity Feed</h3>
          <div className="space-y-4">
            {/* Activity Items */}
            <div className="bg-gray-800/50 rounded-lg p-3 border border-cyan-500/10">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🎯</span>
                <div>
                  <p className="text-sm text-gray-300">Completed Daily Quest</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            </div>
            {/* Add more activity items */}
          </div>
        </aside>
      </div>
    </div>
  );
}
