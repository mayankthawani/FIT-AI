import { Card, CardContent } from "@/components/ui/card";

export default function Challenges() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold">Challenges</h2>
        <p className="text-gray-400 mt-2">🏃 Run 5km - Reward: 100 XP</p>
      </CardContent>
    </Card>
  );
}
