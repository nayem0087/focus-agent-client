"use client";
import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "AI Task Prioritization",
      description: "Our advanced agentic AI analyzes your workload and automatically arranges high-impact tasks first."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Deep Focus Mode",
      description: "Eliminate digital noise and distractions with intelligent session blocking and pacing."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Real-time Workflow Sync",
      description: "Keep all your devices and team deliverables perfectly synchronized without manual effort."
    }
  ];

  return (
    <section className="md:py-24 py-12 px-4 md:px-8 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-[90%] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
            Engineered for Maximum Productivity
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Experience the next generation of task management powered by autonomous agent intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 backdrop-blur-sm transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}