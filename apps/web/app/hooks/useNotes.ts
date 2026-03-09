"use client";

import { useState, useEffect, useCallback } from "react";
import { api, Note, CreateNoteInput, UpdateNoteInput } from "../lib/api";

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getNotes();
            setNotes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load notes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const createNote = useCallback(async (input: CreateNoteInput) => {
        const note = await api.createNote(input);
        setNotes((prev) => [note, ...prev]);
        return note;
    }, []);

    const updateNote = useCallback(
        async (id: number, input: UpdateNoteInput) => {
            const updated = await api.updateNote(id, input);
            setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
            return updated;
        },
        []
    );

    const deleteNote = useCallback(async (id: number) => {
        await api.deleteNote(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const togglePin = useCallback(
        async (id: number, pinned: boolean) => {
            await updateNote(id, { pinned: !pinned });
        },
        [updateNote]
    );

    return {
        notes,
        loading,
        error,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
        togglePin,
    };
}
