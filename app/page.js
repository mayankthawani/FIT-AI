import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold leading-tight">
          Transform Fitness into an Adventure
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          Join our AI-powered fitness game and level up your workouts with real-time tracking, challenges, and rewards.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button className="px-6 py-3 text-lg">Get Started</Button>
          <Button variant="outline" className="px-6 py-3 text-lg">Learn More</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">AI-Powered Workouts</h2>
            <p className="text-gray-400 mt-2">
              Track your exercises and get real-time feedback with AI.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Compete with Friends</h2>
            <p className="text-gray-400 mt-2">
              Challenge your friends and climb the leaderboard.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Interactive Challenges</h2>
            <p className="text-gray-400 mt-2">
              Complete challenges based on your activity and win rewards.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Unlock Rewards</h2>
            <p className="text-gray-400 mt-2">
              Earn badges and achievements as you progress.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © 2025 Fitness Game. All Rights Reserved.
      </footer>
    </div>
  );
}
