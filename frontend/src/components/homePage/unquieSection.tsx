"use client";
import { cardVariants, containerVariants } from "@/shared/utlis/motionVariants";
import { motion } from "framer-motion";

export default function UniqueSection() {
  const features = [
    {
      title: "📚 Self-Learning First",
      desc: "Learn at your own pace with structured content designed to help you grow step by step.",
      gradient: "from-indigo-500/10 to-purple-500/10",
    },
    {
      title: "🤝 Daily Interactive Meetings",
      desc: "Instead of lectures, we ask questions, correct your answers, and prepare you for interviews.",
      gradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      title: "🎤 Learn to Explain",
      desc: "Sometimes, you’ll take a session yourself. Explaining builds mastery and confidence.",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "💼 Earn While You Learn",
      desc: "If you explain well, you can take classes and earn money while continuing to learn here itself.",
      gradient: "from-yellow-400/10 to-orange-500/10",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          What Makes Us <span className="text-indigo-400">Unique?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-12"
        >
          At <span className="font-semibold text-white">Freshkite</span>, we
          believe true learning comes from{" "}
          <em className="text-indigo-300">doing</em> and{" "}
          <em className="text-pink-300">sharing</em>. That’s why our approach is
          different:
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`rounded-2xl p-6 shadow-lg bg-gradient-to-br ${item.gradient} border border-white/10 hover:scale-105 hover:shadow-2xl transition-transform duration-300`}
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-200">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
