"use client";
import React, { useState } from 'react';

const liveItems = [
  "🚀 AI Agent successfully optimized 14 high-priority tasks",
  "⚡ Deep Focus mode activated: All distractions blocked",
  "🔒 Real-time workflow synced with 99.8% accuracy",
  "🎯 Smart deadline reminder dispatched for project deliverables",
  "💡 Automated task categorization running in the background",
  "🛡️ Secure encrypted agent connection established"
];

export default function LiveAgentTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="w-full bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-3 overflow-hidden transition-colors duration-300"
    >
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex w-full overflow-hidden whitespace-nowrap cursor-pointer"
      >

        <div 
          className="flex items-center gap-12 shrink-0 animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {liveItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-xs md:text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div 
          className="flex items-center gap-12 shrink-0 animate-marquee ml-12"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          aria-hidden="true"
        >
          {liveItems.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3 text-xs md:text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}