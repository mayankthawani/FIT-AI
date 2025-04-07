import React from 'react';

const ExerciseInstructions = ({ exerciseType }) => {
  // Instructions for different exercise types
  const instructions = {
    'wrist-rotate': {
      title: 'Wrist Rotation Exercise',
      steps: [
        'Sit with your arm supported on a table or armrest',
        'Keep your elbow bent at approximately 90 degrees',
        'Rotate your palm facing downward (pronation)',
        'Return to neutral position',
        'Rotate your palm facing upward (supination)',
        'Return to neutral position and repeat'
      ],
      benefits: [
        'Increases wrist mobility and flexibility',
        'Helps recovery after wrist injury or surgery',
        'Strengthens forearm muscles',
        'Improves grip strength and hand function'
      ],
      tips: [
        'Perform movements slowly and with control',
        'Stop if you feel pain (not just discomfort)',
        'Keep your upper arm and elbow stable',
        'Begin with 5-10 repetitions and gradually increase'
      ]
    },
    'head-rotate': {
      title: 'Neck Mobility Exercise',
      steps: [
        'Sit or stand with good posture',
        'Slowly turn your head to the left',
        'Return to center',
        'Slowly turn your head to the right',
        'Return to center and repeat'
      ],
      benefits: [
        'Improves neck mobility',
        'Reduces tension in neck muscles',
        'Helps with posture improvement',
        'Can help reduce headaches caused by neck tension'
      ],
      tips: [
        'Move slowly and gently',
        'Keep shoulders relaxed and down',
        'Breathe naturally throughout the exercise',
        'Stop if you feel any pain or dizziness'
      ]
    },
    // Add other exercise types as needed
  };

  const exerciseInfo = instructions[exerciseType] || {
    title: 'Exercise Instructions',
    steps: ['Instructions not available for this exercise type'],
    benefits: [],
    tips: []
  };

  return (
    <div className="bg-gray-800/70 rounded-xl p-6 border border-purple-500/20 mb-8">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">{exerciseInfo.title}</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-purple-300 mb-2">Steps:</h3>
        <ol className="list-decimal pl-5 space-y-1 text-gray-200">
          {exerciseInfo.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      
      {exerciseInfo.benefits.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Benefits:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-200">
            {exerciseInfo.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      
      {exerciseInfo.tips.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Tips:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-200">
            {exerciseInfo.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseInstructions;