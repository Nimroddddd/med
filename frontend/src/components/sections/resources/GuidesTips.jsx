import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

const guides = [
  {
    title: 'Daily Meditation: A Mental Health Guide',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    content: [
      'Set aside a regular time each day for meditation to help make it a habit.',
      'Start with just 5-10 minutes and gradually increase as you get more comfortable.',
      'Choose a quiet, cozy spot where you can relax without interruptions.',
      'Focus on your breath—notice each inhale and exhale.',
      'Let thoughts and feelings come and go without judging them or yourself.',
      "Try guided meditations using apps or online videos if you're new to the practice.",
      'Be patient with yourself—if your mind wanders, gently bring your attention back to your breath.'
    ]
  },
  {
    title: 'Everyday Mental Health: Simple Habits for Wellbeing',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    content: [
      'Move your body regularly—exercise is a natural mood booster.',
      'Eat a colorful, balanced diet with plenty of fruits, veggies, and whole grains.',
      'Aim for 7-9 hours of restful sleep each night to recharge your mind and body.',
      'Limit alcohol and caffeine, as too much can affect your mood and sleep.',
      'Stay connected with friends and family for emotional support.',
      'Take breaks from screens, especially before bedtime.',
      'Practice mindfulness, deep breathing, or gentle stretching to manage stress.',
      "If you're struggling, reach out to a mental health professional—help is always available."
    ]
  },
  {
    title: 'Mastering Anxiety: Everyday Tips',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    content: [
      'Learn about anxiety and its symptoms to better understand your experience.',
      'Consider Cognitive Behavioral Therapy (CBT) to challenge unhelpful thought patterns.',
      'Practice mindfulness and meditation to observe your thoughts without judgment.',
      "Use deep breathing to activate your body's relaxation response.",
      'Try progressive muscle relaxation to release tension.',
      'Maintain a healthy lifestyle: balanced diet, regular exercise, and good sleep.',
      'Identify and limit triggers that increase your anxiety.',
      'Break tasks into smaller steps and set realistic goals to avoid overwhelm.',
      'Stay connected with supportive people—share your feelings.',
      'Limit news and social media if they make you feel anxious.',
      'If anxiety is interfering with your life, seek help from a mental health professional. Medication may also be an option.'
    ]
  },
  {
    title: 'Spotting and Overcoming Hidden Depression',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    content: [
      'Watch for subtle signs like irritability, fatigue, appetite changes, or trouble concentrating.',
      'Remember, some people with depression appear to function well but feel persistently sad or empty inside.',
      'Physical symptoms like headaches or stomach issues can sometimes signal depression.',
      'Notice if you or someone you care about is withdrawing from social activities or losing interest in things they once enjoyed.',
      'Perfectionism and self-criticism can be signs of hidden depression.',
      'If you notice these signs, consider talking to a therapist or counselor for support.',
      'Open up to trusted friends or family—sharing your feelings can help.',
      'Prioritize self-care: exercise, mindfulness, hobbies, and healthy routines.',
      'CBT and mindfulness can help challenge negative thoughts and build resilience.',
      'Set small, achievable goals to avoid feeling overwhelmed.',
      'If needed, medication prescribed by a healthcare professional can be part of your treatment plan.'
    ]
  }
];

export default function GuidesTips() {
  return (
    <PageTransition>
      <section>
        <Banner image="office-2.jpg" title="Guides & Tips" subtitle="Helpful advice and resources for your mental wellness journey." />
        <motion.section
          className="pt-0 sm:pt-10 pb-20 bg-white min-h-[60vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-[80vwh] w-full mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 text-primary text-center">Guides & Tips for Your Mental Wellness</h1>
            <div className="space-y-12">
              {guides.map((guide, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-10 w-4/5 mx-auto">
                  {guide.image && (
                    <img src={guide.image} alt={guide.title} className="w-full md:w-96 h-64 object-cover rounded-xl mb-4 md:mb-0" />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-primary mb-4">{guide.title}</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base text-left">
                      {guide.content.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </section>
    </PageTransition>
  );
} 