"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../lib/axios";
import { Note } from "../lib/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simple form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchNotes();
  }, []);

  // GET all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notes");
      console.log("Full Response:", res.data); // <--- Add this!
      const fetchedNotes = Array.isArray(res.data) ? res.data : res.data.notes;
    
    setNotes(fetchedNotes || []);
    } catch {
      setError("Failed to fetch notes");
      setNotes([])
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      const res = await API.post("/notes", { title, content });
      setNotes((prev) => [res.data.note, ...prev]);
      setTitle("");
      setContent("");
      setError("");
    } catch {
      setError("Failed to create note");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editingId || !title.trim()) return;
    try {
      const res = await API.put(`/notes/${editingId}`, { title, content });
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? res.data.note : n))
      );
      setTitle("");
      setContent("");
      setEditingId(null);
      setError("");
    } catch {
      setError("Failed to update note");
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTitle("");
        setContent("");
      }
    } catch {
      setError("Failed to delete note");
    }
  };

  // Start editing
  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="text-lg font-bold mb-4">
            {editingId ? "✏️ Edit Note" : "➕ New Note"}
          </h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-3 text-white placeholder:text-white/30 outline-none focus:border-violet-500"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-4 text-white placeholder:text-white/30 outline-none focus:border-violet-500 resize-none"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 transition-colors"
            >
              {editingId ? "Update" : "Create"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Notes List */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-2 text-gray-400">Loading...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notes?.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
              >
                <h3 className="text-base font-bold text-white mb-1">
                  {note?.title}
                </h3>
                <p className="text-sm text-white/50 mb-4 whitespace-pre-wrap">
                  {note?.content}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/20">
                    {new Date(note.updated_at).toLocaleDateString()}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(note)}
                      className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;