"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, MapPin, Calendar, ArrowRight, Tag, Search, SlidersHorizontal } from 'lucide-react';

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

export default function ExploreSection() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Filtering & Sorting States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || item.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rating-high') return b.rating - a.rating;
    if (sortBy === 'price-low') {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price-high') {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
      return priceB - priceA;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-[90%] mx-auto space-y-10">

        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Explore Active <span className="text-blue-600 dark:text-blue-400">Agents & Solutions</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Discover cutting-edge autonomous tools engineered to elevate your engineering productivity.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 md:p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">

          <div className="relative w-full md:w-1/3">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search agents or tools..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Location:</span>
              <select 
                value={selectedLocation}
                onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
                className="w-full md:w-auto px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Locations</option>
                <option value="Cloud">Cloud / Remote</option>
                <option value="Global">Global</option>
                <option value="Dedicated">Dedicated Server</option>
                <option value="Edge">Edge Cluster</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <SlidersHorizontal size={14} className="text-gray-400 hidden sm:inline" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              >
                <option value="default">Sort By: Featured</option>
                <option value="rating-high">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {loading ? (
            [...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="h-[420px] rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex flex-col justify-between animate-pulse shadow-sm"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                <div className="space-y-3 py-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6" />
                </div>
                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
              </div>
            ))
          ) : currentItems.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-base font-bold">No agents or solutions found matching your criteria.</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="h-[430px] rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex flex-col justify-between shadow-lg shadow-gray-200/50 dark:shadow-none transition-all duration-300 group"
              >
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    {item.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Tag size={12} /> {item.price}
                  </div>
                </div>

                <div className="space-y-2 py-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-blue-500" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-indigo-500" /> {item.date}
                    </span>
                  </div>
                </div>

                <Link 
                  href={`/agents/${item._id}`} 
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-800 dark:text-gray-200 font-semibold py-2.5 rounded-xl text-xs transition-all duration-300 group-hover:shadow-md"
                >
                  View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))
          )}

        </div>

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}