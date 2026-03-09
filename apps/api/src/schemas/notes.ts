import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  isPinned: z.boolean().optional(),
});

export const updateNoteSchema = createNoteSchema.partial();

export const queryNotesSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type QueryNotesInput = z.infer<typeof queryNotesSchema>;