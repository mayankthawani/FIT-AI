"use client"
export default function GamerTraining() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Gamer Training</h1>
      
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-purple-300 mb-2">Training Demo Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <video
              className="w-full h-full rounded-lg object-cover"
              controls
              preload="metadata"
            >
              <source src="/videos/gamer-training.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 text-gray-300">
            <p className="text-sm">Watch this demo to learn proper gaming posture and exercises.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
