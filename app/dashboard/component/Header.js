"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const navItems = [
    { href: "/dashboard", label: "Quest Hub", icon: "🏰" },
    { href: "/dashboard/workouts", label: "Training Arena", icon: "⚔️" },
    { href: "/diet", label: "Provisions", icon: "🍎" },
    { href: "/dashboard/yoga", label: "Meditation Temple", icon: "🧘" },
  ];

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="container mx-auto flex items-center justify-between px-6 py-4"
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            FitAReena
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <div className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Notifications */}
          <Button variant="ghost" className="relative">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-cyan-500/50">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500">
                    WR
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 bg-gray-800 border border-cyan-500/20">
              <DropdownMenuItem className="text-cyan-400">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-cyan-400">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-400">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.nav>
    </header>
  );
}
