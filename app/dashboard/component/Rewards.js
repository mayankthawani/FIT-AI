"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const fitnessProducts = [
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
    name: "Smart Water Bottle",
    originalPrice: 500,
    coinPrice: 20000,
    image: "🚰",
    description: "Tracks water intake with LED display"
  },
  {
    name: "Jump Rope",
    originalPrice: 400,
    coinPrice: 15000,
    image: "🎯",
    description: "Adjustable length, ball bearing system"
  },
  {
    name: "Fitness Gloves",
    originalPrice: 400,
    coinPrice: 20000,
    image: "🧤",
    description: "Anti-slip workout gloves"
  },
  {
    name: "Gym Towel Set",
    originalPrice: 200,
    coinPrice: 10000,
    image: "🧺",
    description: "Pack of 3 microfiber towels"
  }
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fitnessProducts.map((product, index) => (
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
