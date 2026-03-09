const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Note {
    id: number;
    title: string;
    content: string;
    color: string;
    pinned: boolean;
    created_at: string;
    updated_at: string;
}

export type CreateNoteInput = {
    title?: string;
    content?: string;
    color?: string;
    pinned?: boolean;
};

export type UpdateNoteInput = Partial<CreateNoteInput>;

async function request<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (res.status === 204) return undefined as T;
    if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `HTTP ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export const api = {
    getNotes: () => request<Note[]>("/api/notes"),

    createNote: (data: CreateNoteInput) =>
        request<Note>("/api/notes", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    updateNote: (id: number, data: UpdateNoteInput) =>
        request<Note>(`/api/notes/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

    deleteNote: (id: number) =>
        request<void>(`/api/notes/${id}`, { method: "DELETE" }),
};
