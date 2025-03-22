"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store user info in Firestore using user.uid as document ID
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        coins: 0,
        createdAt: new Date(),
        badges: []
      });
  
      console.log("User signed up and stored in Firestore:", user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    signUp(formData.email, formData.password, formData.username);
    console.log(formData);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-900/90 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto px-6"
      >
        <Card className="bg-gray-800/50 border border-gray-700">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Join the Quest
              </h1>
              <p className="text-gray-400 mt-2">Begin your fitness adventure today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Username</label>
                <Input
                  type="text"
                  placeholder="Enter username"
                  className="mt-1 bg-gray-900/50 border-gray-700"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="mt-1 bg-gray-900/50 border-gray-700"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Password</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="mt-1 bg-gray-900/50 border-gray-700"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 bg-gray-900/50 border-gray-700"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-cyan-400 hover:text-cyan-300">
                  Login here
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
