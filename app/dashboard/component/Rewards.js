"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useState } from "react";

const rewardsData = {
  gym: [
    {
      name: "Premium Yoga Mat",
      originalPrice: 600,
      coinPrice: 30000,
      image: "🧘‍♀️",
      description: "Non-slip, eco-friendly yoga mat"
    },
    {
      name: "Resistance Bands Set",
      originalPrice: 400,
      coinPrice: 25000,
      image: "💪",
      description: "Set of 5 different resistance levels"
    },
    {
      name: "Gym Bag",
      originalPrice: 800,
      coinPrice: 35000,
      image: "🎒",
      description: "Spacious workout bag with compartments"
    },
    {
      name: "Protein Shaker",
      originalPrice: 300,
      coinPrice: 15000,
      image: "🥤",
      description: "Premium blender bottle with mixer ball"
    },
    {
      name: "Lifting Straps",
      originalPrice: 250,
      coinPrice: 12000,
      image: "🏋️",
      description: "Cotton lifting straps for heavy lifts"
    },
    {
      name: "Gym Membership",
      originalPrice: 2000,
      coinPrice: 75000,
      image: "🎟️",
      description: "1-month premium gym membership"
    }
  ],
  gaming: [
    {
      name: "Gaming Mouse",
      originalPrice: 1200,
      coinPrice: 45000,
      image: "🖱️",
      description: "RGB Gaming Mouse with programmable buttons"
    },
    {
      name: "Gaming Headset",
      originalPrice: 2000,
      coinPrice: 50000,
      image: "🎧",
      description: "7.1 Surround Sound Gaming Headset"
    },
    {
      name: "Steam Gift Card",
      originalPrice: 1000,
      coinPrice: 40000,
      image: "🎮",
      description: "Digital gift card for Steam games"
    },
    {
      name: "Gaming Keyboard",
      originalPrice: 2500,
      coinPrice: 65000,
      image: "⌨️",
      description: "Mechanical RGB gaming keyboard"
    },
    {
      name: "Gaming Chair",
      originalPrice: 5000,
      coinPrice: 100000,
      image: "💺",
      description: "Ergonomic gaming chair with lumbar support"
    },
    {
      name: "Xbox Game Pass",
      originalPrice: 1500,
      coinPrice: 45000,
      image: "🎯",
      description: "3-month Xbox Game Pass subscription"
    }
  ],
  rehab: [
    {
      name: "Medical Consultation",
      originalPrice: 1000,
      coinPrice: 40000,
      image: "👨‍⚕️",
      description: "30-min online consultation with specialist"
    },
    {
      name: "Massage Ball Set",
      originalPrice: 300,
      coinPrice: 15000,
      image: "⚪",
      description: "Set of therapy massage balls"
    },
    {
      name: "Foam Roller",
      originalPrice: 500,
      coinPrice: 25000,
      image: "🔄",
      description: "High-density foam roller for recovery"
    },
    {
      name: "Compression Sleeves",
      originalPrice: 400,
      coinPrice: 20000,
      image: "🦿",
      description: "Joint support compression sleeves"
    },
    {
      name: "Physical Therapy",
      originalPrice: 1500,
      coinPrice: 50000,
      image: "🏥",
      description: "1 session with certified physiotherapist"
    },
    {
      name: "TENS Unit",
      originalPrice: 800,
      coinPrice: 35000,
      image: "⚡",
      description: "Electrical nerve stimulation device"
    },
    {
      name: "Ice/Heat Pack",
      originalPrice: 300,
      coinPrice: 15000,
      image: "❄️",
      description: "Reusable therapy pack for pain relief"
    }
  ]
};

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

export default function Rewards({ totalCoins, userId, setTotalCoins }) {
  const [activeCategory, setActiveCategory] = useState('gym');

  const handleRedeem = async (product) => {
    const newCoins = totalCoins - product.coinPrice;
    if (newCoins >= 0) {
      await updateCoinsInDB(userId, newCoins);
      setTotalCoins(newCoins);
    }
  };

  return (
    <section className="py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Rewards Shop
          </h2>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <span className="text-xl">🪙</span>
            <span className="text-yellow-400 font-bold">{totalCoins}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {Object.keys(rewardsData).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`capitalize ${
                activeCategory === category 
                  ? 'bg-yellow-500 text-black' 
                  : 'border-yellow-500/50 text-yellow-400'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewardsData[activeCategory].map((product, index) => (
            <Card 
              key={index}
              className="bg-gray-800/50 border border-yellow-500/20 rounded-xl overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-200">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                  </div>
                  <span className="text-3xl">{product.image}</span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">🪙</span>
                      <span className="text-yellow-400 font-bold">{product.coinPrice}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline"
                    className={`border-yellow-500/50 ${
                      totalCoins >= product.coinPrice 
                        ? 'hover:bg-yellow-500/20 text-yellow-400' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={totalCoins < product.coinPrice}
                    onClick={() => handleRedeem(product)}
                  >
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
