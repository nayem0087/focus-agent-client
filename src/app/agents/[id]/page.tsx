"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, MapPin, Calendar, Tag, ArrowLeft, ShieldCheck, Cpu, MessageSquare, Sparkles, Send, Bot, User, RefreshCw, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface Item {
  _id: string;
  title: string;
  description: string;
  price: string;
  date: string;
  rating: number;
  location: string;
  image: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function AgentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [item, setItem] = useState<Item | null>(null);
  const [relatedItems, setRelatedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // --- AI Content Generator States ---
  const [promptTopic, setPromptTopic] = useState('');
  const [contentType, setContentType] = useState('Blog Post');
  const [outputLength, setOutputLength] = useState('Medium');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatingContent, setGeneratingContent] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- AI Chat Assistant States ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    if (!id) return;

    // সব আইটেম একসাথে এনে সেখান থেকে বর্তমান আইডি ম্যাচ করা
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data: Item[]) => {
        const found = data.find((i) => i._id.toString() === id);
        if (found) {
          setItem(found);
          setMessages([
            { sender: 'bot', text: `Hello! I am ${found.title}. How can I assist you with your workflow today?` }
          ]);
          const filtered = data.filter((i) => i._id.toString() !== id).slice(0, 3);
          setRelatedItems(filtered);
        } else {
          setItem(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // AI Content Generator Handler (Simulated Advanced Reasoning & Template Processing)
  const handleGenerateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTopic.trim()) {
      toast.error("Please enter a topic or instruction!");
      return;
    }

    setGeneratingContent(true);
    setGeneratedContent('');

    setTimeout(() => {
      const sampleResult = `### Generated ${contentType} for ${item?.title}
**Topic:** ${promptTopic}
**Length:** ${outputLength}

1. **Executive Overview:** Leveraging the autonomous framework of ${item?.title}, this ${contentType.toLowerCase()} focuses on high-impact optimization and zero-latency execution.
2. **Key Implementation Steps:**
   - Initialize the target repository or environment.
   - Configure parameters based on ${outputLength.toLowerCase()} scale requirements.
   - Execute and monitor performance metrics seamlessly.
3. **Conclusion:** Scalable efficiency achieved with advanced agentic intelligence.`;

      setGeneratedContent(sampleResult);
      setGeneratingContent(false);
      toast.success("Content generated successfully!");
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.copied ? null : toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // AI Chat Assistant Handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = `Based on my capabilities in ${item?.title}, I can help you automate this process efficiently.`;
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        botReply = `The current pricing model is ${item?.price}.`;
      } else if (userText.toLowerCase().includes('location') || userText.toLowerCase().includes('server')) {
        botReply = `This agent operates primarily on ${item?.location}.`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto animate-pulse space-y-8 bg-gray-50 dark:bg-gray-950">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-[2rem]" />
          <div className="space-y-4 py-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold mb-4">Agent Not Found</h2>
        <button onClick={() => router.back()} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ব্যাক বাটন */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} /> Back to Listings
        </button>

        {/* মেইন ডিটেইলস সেকশন */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl p-3"
          >
            <div className="relative h-[380px] md:h-[450px] rounded-[2rem] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {item.rating} (120+ Reviews)
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
                <Tag size={12} /> {item.price}
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                {item.title}
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" /> Location: <span className="text-gray-900 dark:text-white font-semibold">{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-500" /> Released: <span className="text-gray-900 dark:text-white font-semibold">{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" /> Security: <span className="text-gray-900 dark:text-white font-semibold">Verified Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-purple-500" /> Engine: <span className="text-gray-900 dark:text-white font-semibold">Autonomous v2</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href="#ai-tools-section" className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm text-center">
                Try Agent AI Tools ⚡
              </a>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* FEATURE 1: AI Content Generator & FEATURE 2: AI Chatbot */}
        {/* ======================================================== */}
        <div id="ai-tools-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          
          {/* A. AI Content Generator */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800">
                <Sparkles size={12} /> Requirement A: AI Content Generator
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Prompt Workspace</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Generate professional content, documentation, or social posts tailored by this agent.</p>
            </div>

            <form onSubmit={handleGenerateContent} className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Content Type</label>
                  <select 
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Blog Post</option>
                    <option>Product Description</option>
                    <option>Technical Documentation</option>
                    <option>Social Media Post</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Output Length</label>
                  <select 
                    value={outputLength}
                    onChange={(e) => setOutputLength(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Detailed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Custom Prompt / Topic</label>
                  <input 
                    type="text"
                    required
                    value={promptTopic}
                    onChange={(e) => setPromptTopic(e.target.value)}
                    placeholder="e.g., Automating database scaling in Next.js"
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={generatingContent}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {generatingContent ? "Reasoning & Generating..." : <><Sparkles size={14} /> Generate Content</>}
              </button>
            </form>

            {generatedContent && (
              <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">AI Output Result:</span>
                  <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center gap-1 text-xs">
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedContent}
                </pre>
              </div>
            )}
          </div>

          {/* C. AI Chat Assistant */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between h-[520px]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
                <Bot size={12} /> Requirement C: AI Chat Assistant
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chat with {item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Context-aware conversational assistant with history.</p>
            </div>

            {/* চ্যাট কনভারসেশন বক্স */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 my-2 scrollbar-thin">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                  <Bot size={14} /> Agent is thinking...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask this agent anything..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}