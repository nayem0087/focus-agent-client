"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Eye, ArrowLeft, Sparkles, X, Save, Plus, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Item {
  _id: string;
  title: string;
  description: string;
  price: string;
  date: string;
  rating: number;
  location: string;
  image: string;
  userEmail?: string;
}

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = useCallback((email: string) => {
    setLoading(true);
    fetch(`${API_BASE}/api/items?email=${encodeURIComponent(email)}`)
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

  useEffect(() => {
    if (sessionLoading) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    fetchItems(session.user.email);
  }, [sessionLoading, session, fetchItems]);

  const handleDeleteClick = (item: Item) => {
    setDeleteTarget(item);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${API_BASE}/api/items/${deleteTarget._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== deleteTarget._id));
        toast.success("Agent deleted successfully!");
      } else {
        toast.error("Failed to delete item.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`${API_BASE}/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        toast.success("Agent updated successfully!");
        setIsModalOpen(false);
        if (session?.user?.email) fetchItems(session.user.email);
      } else {
        toast.error("Failed to update item.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <Sparkles size={12} /> Manage Dashboard
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              My Active Agents
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              View, edit, or delete the agents you&apos;ve deployed.
            </p>
          </div>

          <button
            onClick={() => router.push('/add-agent')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition shrink-0"
          >
            <Plus size={14} /> Create Agent
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2rem] overflow-hidden shadow-sm">
          {sessionLoading || loading ? (
            <div className="p-12 text-center text-xs text-gray-400 animate-pulse">Loading items...</div>
          ) : !session?.user?.email ? (
            <div className="p-12 text-center text-xs text-gray-400">Please log in to view your agents.</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400">You haven&apos;t created any agents yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Agent Details</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Location</th>
                    <th className="py-4 px-4 text-center">Rating</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                  {items.map((item) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-gray-400 line-clamp-1">{item.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">{item.price}</td>
                      <td className="py-4 px-4 text-gray-500">{item.location}</td>
                      <td className="py-4 px-4 text-center font-bold text-yellow-500">⭐ {item.rating}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => router.push(`/agents/${item._id}`)}
                          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-300 transition"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-purple-600 hover:text-white text-gray-600 dark:text-gray-300 transition"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-600 hover:text-white text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit modal */}
        <AnimatePresence>
          {isModalOpen && editingItem && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Agent Specifications</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Title</label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Price</label>
                      <input
                        type="text"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Location</label>
                      <input
                        type="text"
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
                    <input
                      type="url"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                    >
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete confirmation modal */}
        <AnimatePresence>
          {deleteTarget && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2rem] p-6 md:p-8 max-w-sm w-full space-y-5 shadow-2xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mx-auto">
                  <AlertTriangle className="text-red-600" size={22} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Delete this agent?</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    &quot;{deleteTarget.title}&quot; will be permanently removed. This cannot be undone.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}