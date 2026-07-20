"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const statsData = [
  { rawTarget: 99.8, suffix: "%", decimals: 1, label: "Workflow Accuracy" },
  { rawTarget: 3.5, suffix: "x", decimals: 1, label: "Productivity Boost" },
  { rawTarget: 50, suffix: "K+", decimals: 0, label: "Tasks Optimized Daily" },
  { rawTarget: 24, suffix: "/7", decimals: 0, label: "Active AI Agent Support" }
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300 w-full">
  
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest">
            Platform Metrics
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Real-time numbers that showcase how FocusAgent streamlines workflows and elevates daily productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          {statsData.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="space-y-3 p-6 md:p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500/50 transition-all group"
            >
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                <Counter target={stat.rawTarget} decimals={stat.decimals} isInView={isInView} />
                {stat.suffix}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target, decimals, isInView }: { target: number; decimals: number; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - percentage, 3);
      const currentCount = easeProgress * target;

      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, target]);

  return <span>{count.toFixed(decimals)}</span>;
}