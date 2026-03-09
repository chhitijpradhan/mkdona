import { Router } from 'express';
import { prisma } from '../db';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { createNoteSchema, queryNotesSchema, updateNoteSchema } from '../schemas/notes';

const router = Router();

// POST /notes/seed - Create a test user and note (for DB check)
// NOTE: This is intentionally left unauthenticated for quick local DB checks.
router.use(authMiddleware);

// GET /notes - Get all notes
router.get('/', async (req: AuthRequest, res) => {
    try {
        if (!req.user) return res.status(401).send();
        const { page, limit, q } = queryNotesSchema.parse(req.query);
        const skip = (page - 1) * limit;

        const where: any = { authorId: req.user.userId };
        if (q && q.trim().length > 0) {
            where.OR = [
                { title: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
            ];
        }

        const notes = await prisma.note.findMany({
            where,
            orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
            skip,
            take: limit,
            include: {
                author: { select: { id: true, email: true, name: true } },
            },
        });
        res.json(notes);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// GET /notes/:id - Get one note (owner-only)
router.get('/:id', async (req: AuthRequest, res) => {
    const { id } = req.params;
    try {
        if (!req.user) return res.status(401).send();
        const note = await prisma.note.findFirst({
            where: { id: Number(id), authorId: req.user.userId },
            include: { author: { select: { id: true, email: true, name: true } } },
        });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch {
        res.status(500).json({ error: 'Failed to fetch note' });
    }
});

// POST /notes - Create a note
router.post('/', async (req: AuthRequest, res) => {
    try {
        if (!req.user) return res.status(401).send();
        const data = createNoteSchema.parse(req.body);
        const note = await prisma.note.create({
            data: { ...data, authorId: req.user.userId },
            include: {
                author: { select: { id: true, email: true, name: true } },
            },
        });
        res.status(201).json(note);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// PUT /notes/:id - Update a note
router.put('/:id', async (req: AuthRequest, res) => {
    const { id } = req.params;
    try {
        if (!req.user) return res.status(401).send();
        const data = updateNoteSchema.parse(req.body);

        const existing = await prisma.note.findFirst({
            where: { id: Number(id), authorId: req.user.userId },
            select: { id: true },
        });
        if (!existing) return res.status(404).json({ error: 'Note not found' });

        const note = await prisma.note.update({
            where: { id: Number(id) },
            data,
            include: {
                author: { select: { id: true, email: true, name: true } },
            },
        });
        res.json(note);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// DELETE /notes/:id - Delete a note
router.delete('/:id', async (req: AuthRequest, res) => {
    const { id } = req.params;
    try {
        if (!req.user) return res.status(401).send();

        const existing = await prisma.note.findFirst({
            where: { id: Number(id), authorId: req.user.userId },
            select: { id: true },
        });
        if (!existing) return res.status(404).json({ error: 'Note not found' });

        await prisma.note.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

export default router;
