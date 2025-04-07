import React from 'react';

const ExerciseInstructions = ({ exerciseType }) => {
  // Instructions for different exercise types
  const instructions = {
    'squat': {
      title: 'Squats',
      steps: [
        'Stand with feet shoulder-width apart',
        'Lower your body as if sitting back into a chair',
        'Keep your chest up and knees over your toes',
        'Return to standing position and repeat'
      ],
      benefits: [
        'Strengthens quadriceps, hamstrings, and glutes',
        'Improves core and lower body stability',
        'Enhances overall leg endurance and balance',
        'Boosts mobility and posture'
      ],
      tips: [
        'Keep your back straight throughout the movement',
        'Avoid letting your knees go past your toes',
        'Engage your core for better control',
        'Perform 3 sets of 12 reps'
      ]
    },

    'pushup': {
      title: 'Push-ups',
      steps: [
        'Start in plank position with hands shoulder-width apart',
        'Lower body until chest nearly touches the ground',
        'Push back up to starting position',
        'Keep your core tight throughout the movement'
      ],
      benefits: [
        'Strengthens chest, shoulders, and triceps',
        'Improves upper body endurance',
        'Engages core muscles for stability',
        'Can be done anywhere without equipment'
      ],
      tips: [
        'Keep your body in a straight line from head to heels',
        'Avoid sagging hips or flaring elbows',
        'Breathe in as you lower, out as you push up',
        'Perform 3 sets of 15 reps'
      ]
    },

    'bicepcurl': {
      title: 'Bicep Curls',
      steps: [
        'Hold dumbbells at sides, palms facing forward',
        'Curl weights toward shoulders while keeping elbows fixed at sides',
        'Slowly lower the weights back down to starting position',
        'Repeat for desired repetitions'
      ],
      benefits: [
        'Targets and strengthens biceps and forearms',
        'Enhances grip strength and arm definition',
        'Supports lifting and pulling motions in daily life',
        'Improves muscle coordination'
      ],
      tips: [
        'Keep elbows close to your torso',
        'Avoid using momentum or swinging weights',
        'Control both upward and downward motion',
        'Perform 3 sets of 12 reps'
      ]
    },

    'crunches': {
      title: 'Crunches',
      steps: [
        'Lie on your back with knees bent and feet flat on the floor',
        'Place hands behind your head without pulling on the neck',
        'Lift your upper body towards your knees using your core',
        'Lower back down slowly and repeat'
      ],
      benefits: [
        'Strengthens abdominal muscles',
        'Improves core endurance and stability',
        'Supports better posture and balance',
        'Can help tone and shape the midsection'
      ],
      tips: [
        'Engage your core throughout the movement',
        'Exhale when lifting, inhale when lowering',
        'Avoid pulling your head forward with your hands',
        'Perform 3 sets of 15 reps'
      ]
    },

    'lunges': {
      title: 'Lunges',
      steps: [
        'Step forward with one leg',
        'Lower hips until both knees are at 90 degrees',
        'Keep front knee over ankle and back knee hovering above ground',
        'Push back to starting position and alternate legs'
      ],
      benefits: [
        'Strengthens quadriceps, hamstrings, and glutes',
        'Improves balance and coordination',
        'Increases hip mobility',
        'Helps correct muscle imbalances'
      ],
      tips: [
        'Keep your torso upright throughout the movement',
        'Do not let your front knee extend past your toes',
        'Use a steady pace and controlled motion',
        'Perform 3 sets of 10 reps'
      ]
    },
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