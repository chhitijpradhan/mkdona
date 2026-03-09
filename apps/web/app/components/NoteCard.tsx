"use client";
import { Pin, Trash2, Edit3 } from "lucide-react";
import { Note } from "../lib/api";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="group relative rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      style={{
        background: note.color || "#1e1e2e",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      onClick={() => onEdit(note)}
    >
      {/* Pin indicator */}
      {note.pinned && (
        <div className="absolute top-3 right-3">
          <Pin size={14} className="text-violet-400" />
        </div>
      )}

      {/* Title */}
      <h3
        className="text-base font-bold leading-tight pr-6"
        style={{ color: "rgba(255,255,255,0.9)" }}
      >
        {note.title || "Untitled"}
      </h3>

      {/* Content preview */}
      <p
        className="text-sm leading-relaxed line-clamp-4 flex-1"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {note.content || "No content"}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <span
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {formatDate(note.updated_at)}
        </span>

        {/* Action buttons — visible on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
            title="Edit"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20"
            style={{ color: "rgba(255,255,255,0.5)" }}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}