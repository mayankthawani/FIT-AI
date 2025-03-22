import Image from 'next/image';

const yogaPoses = [
  {
    name: 'Downward-Facing Dog',
    sanskrit: 'Adho Mukha Svanasana',
    benefits: [
      'Strengthens upper body',
      'Stretches spine and hamstrings',
      'Improves blood circulation',
      'Relieves stress'
    ],
    description: 'A foundational yoga pose that forms an inverted V-shape, stretching and strengthening the entire body.',
    image: '/OIP.jpg'
  },
  {
    name: 'Tree Pose',
    sanskrit: 'Vrksasana',
    benefits: [
      'Improves balance',
      'Strengthens legs and core',
      'Increases focus',
      'Builds confidence'
    ],
    description: 'A standing balance pose that improves concentration and stability while opening the hips.',
    image: '/yoga-tree-pose-extreme-photographer.jpg'
  },
  // Add more poses as needed
];

export default function YogaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Discover the Power of Yoga
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore various yoga poses and their benefits for mind, body, and soul
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yogaPoses.map((pose, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-56">
                <Image
                  src={pose.image}
                  alt={pose.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{pose.name}</h2>
                <p className="text-purple-600 italic mb-4">{pose.sanskrit}</p>
                
                <h3 className="font-semibold mb-2 text-gray-700">Benefits:</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {pose.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-600 hover:text-gray-800 transition-colors">{benefit}</li>
                  ))}
                </ul>
                
                <h3 className="font-semibold mb-2 text-gray-700">Description:</h3>
                <p className="text-gray-600">{pose.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
