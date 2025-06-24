import { motion } from 'framer-motion';
import {
  Brain,
  Smile,
  Users,
  UserCheck,
  RefreshCw,
  Eye,
  HeartHandshake,
  Activity,
  Aperture,
  CheckCircle2
} from 'lucide-react';
import PageTransition from "../../PageTransition"

const therapies = [
  {
    icon: Brain,
    title: 'Cognitive-Behavioral Therapy (CBT)',
    description: `CBT is a practical, evidence-based therapy that helps people break free from negative thought and behavior patterns. It teaches you to recognize and change self-defeating thinking, which can improve mood, self-esteem, and relationships. CBT is proven effective for depression, anxiety, anger, low self-worth, social anxiety, panic, and more.`
  },
  {
    icon: CheckCircle2,
    title: 'Rational Emotive Behavior Therapy (REBT)',
    description: `REBT, developed by Albert Ellis, focuses on challenging irrational beliefs. It teaches that our happiness is shaped more by our thoughts than by outside events. REBT encourages self-acceptance and helps you replace unhelpful thinking with healthier perspectives.`
  },
  {
    icon: Eye,
    title: 'Exposure and Response Prevention (ERP)',
    description: `ERP is a powerful approach for OCD and anxiety. It involves gradually facing triggers while resisting compulsive behaviors, with support from a therapist. Over time, this reduces anxiety and helps you gain control over obsessions and compulsions.`
  },
  {
    icon: RefreshCw,
    title: 'Dialectical Behavior Therapy (DBT)',
    description: `DBT is designed for people facing intense emotions or high-risk situations. It blends acceptance and change, teaching skills in distress tolerance, emotion regulation, mindfulness, and assertive communication. DBT is especially helpful for borderline personality disorder, self-harm, and complex mental health needs.`
  },
  {
    icon: UserCheck,
    title: 'Solution-Focused Therapy',
    description: `This approach highlights your strengths and resources. Instead of focusing on problems, solution-focused therapy helps you identify exceptions and envision a preferred future. Techniques like the miracle question and scaling help you and your therapist build practical steps toward your goals.`
  },
  {
    icon: HeartHandshake,
    title: 'Restorative Practices',
    description: `Restorative practices strengthen relationships and community bonds. They are based on the idea that everyone needs meaningful connections to thrive. This approach is used to repair harm, resolve conflict, and build supportive environments.`
  },
  {
    icon: Aperture,
    title: 'Hypnotherapy',
    description: `Hypnosis is a focused, relaxed state where you are more open to positive suggestions. Guided by a therapist, hypnotherapy can help you manage pain, anxiety, or unwanted habits. You remain in control and aware throughout the process.`
  },
  {
    icon: Activity,
    title: 'Biofeedback',
    description: `Biofeedback uses sensors to help you become aware of your body's stress responses. By practicing relaxation techniques and seeing real-time feedback, you can learn to control things like heart rate, muscle tension, and breathing—helping with headaches, anxiety, and more.`
  },
  {
    icon: Users,
    title: 'Family Systems Therapy',
    description: `This therapy views the family as an interconnected system. It helps families understand their unique dynamics and work together to resolve issues. Each member learns how their actions affect the group, and the goal is to restore healthy relationships and support.`
  },
  {
    icon: Smile,
    title: 'Mindfulness-Based Interventions',
    description: `Mindfulness therapies teach you to be present and nonjudgmental. Techniques like Mindfulness-Based Cognitive Therapy and Acceptance & Commitment Therapy help you observe thoughts and feelings without getting stuck in them. These approaches are effective for depression, anxiety, and stress.`
  },
  {
    icon: CheckCircle2,
    title: 'Acceptance & Commitment Therapy (ACT)',
    description: `ACT helps you accept your feelings and commit to actions that align with your values. Instead of fighting emotions, you learn to observe and accept them, making it easier to move forward. ACT uses techniques like acceptance, mindfulness, and values-based living.`
  }
];

export default function TherapyMethods() {
  return (
    <PageTransition>
      <motion.section
        className="py-20 bg-white min-h-[60vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-primary">Therapy Approaches</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            We offer a variety of evidence-based therapy methods to support your mental health and personal growth. Explore some of the approaches we use below.
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {therapies.map((therapy, idx) => (
            <motion.div
              key={therapy.title}
              className="bg-gray-50 rounded-2xl shadow p-6 flex flex-col items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
            >
              <div className="flex items-center gap-3 mb-2">
                <therapy.icon className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-bold text-gray-900">{therapy.title}</h2>
              </div>
              <p className="text-gray-700 text-left text-base">{therapy.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </PageTransition>
  );
} 