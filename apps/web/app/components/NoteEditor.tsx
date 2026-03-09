"use client";

import { useState, useEffect, useRef } from "react";
import { X, Pin } from "lucide-react";
import { Note, CreateNoteInput } from "../lib/api";
import clsx from "clsx";

const NOTE_COLORS = [
    { label: "Dark", value: "#1e1e2e" },
    { label: "Navy", value: "#1a1a3a" },
    { label: "Forest", value: "#12261e" },
    { label: "Wine", value: "#26121a" },
    { label: "Slate", value: "#1a2233" },
    { label: "Amber", value: "#261f12" },
    { label: "Plum", value: "#231226" },
    { label: "Teal", value: "#122226" },
];

interface NoteEditorProps {
    note?: Note | null;
    onSave: (data: CreateNoteInput) => Promise<void>;
    onClose: () => void;
}

export function NoteEditor({ note, onSave, onClose }: NoteEditorProps) {
    const [title, setTitle] = useState(note?.title ?? "");
    const [content, setContent] = useState(note?.content ?? "");
    const [color, setColor] = useState(note?.color ?? "#1e1e2e");
    const [pinned, setPinned] = useState(note?.pinned ?? false);
    const [saving, setSaving] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await onSave({ title, content, color, pinned });
            onClose();
        } finally {
            setSaving(false);
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Modal */}
            <div
                className="relative w-full max-w-lg rounded-3xl border p-6 flex flex-col gap-5 animate-fade-in"
                style={{
                    background: color,
                    borderColor: "rgba(255,255,255,0.10)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                    maxHeight: "90vh",
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                >
                    <X size={18} />
                </button>

                <h2 className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {note ? "Edit note" : "New note"}
                </h2>

                {/* Title */}
                <input
                    ref={titleRef}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-b text-base font-semibold outline-none placeholder:opacity-40 pb-2 transition-colors"
                    style={{
                        borderColor: "rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.9)",
                    }}
                />

                {/* Content */}
                <textarea
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full bg-transparent text-sm outline-none resize-none placeholder:opacity-40 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                />

                {/* Color picker */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider mr-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        Color
                    </span>
                    {NOTE_COLORS.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            title={c.label}
                            className={clsx(
                                "w-6 h-6 rounded-full border-2 transition-transform",
                                color === c.value ? "scale-125 border-white/60" : "border-transparent hover:scale-110"
                            )}
                            style={{ background: c.value, outline: color === c.value ? "2px solid rgba(255,255,255,0.3)" : "none", outlineOffset: "2px" }}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1">
                    <button
                        onClick={() => setPinned((p) => !p)}
                        className={clsx(
                            "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl transition-all",
                            pinned
                                ? "bg-violet-500/20 text-violet-300"
                                : "text-white/40 hover:text-white/70"
                        )}
                    >
                        <Pin size={14} />
                        {pinned ? "Pinned" : "Pin"}
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-1.5 rounded-xl text-sm transition-colors"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-5 py-1.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                color: "#fff",
                                boxShadow: saving ? "none" : "0 4px 16px rgba(124,58,237,0.4)",
                            }}
                        >
                            {saving ? "Saving…" : note ? "Save" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
