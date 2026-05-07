// Ticket controller
import { Request, Response } from "express";
import { UUID } from "crypto";
import {
    findAllTickets,
    createNewTicket,
    findTicketWithId,
    findTicketComments,
    createTicketComment
} from "./ticket.service.js";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface TicketDescriptions {
    shortDescription: string;
    description?: string;
}

export async function getAllTickets(req: Request, res: Response): Promise<void> {
    try {
        const tickets = await findAllTickets();
        res.json(tickets);
    } catch (error) {
        console.error("Error al obtener tickets:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function createTicket(req: Request, res: Response): Promise<void> {
    try {
        const { shortDescription, description }: TicketDescriptions = req.body;
        if (!shortDescription) {
            res.status(400).json({
                error: "shortDescription es obligatorio"
            });
            return;
        }
        const ticket = await createNewTicket({ shortDescription, description: description || "" });
        res.status(201).json(ticket);
    } catch (error) {
        console.error("Error al crear ticket:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getTicketWithId(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (typeof id !== "string" || !uuidRegex.test(id)) {
            res.status(400).json({ error: "El ID proporcionado no tiene un formato UUID válido" });
            return;
        }

        const ticket = await findTicketWithId(id as UUID);
        if (!ticket) {
            res.status(404).json({
                error: "Ticket no encontrado"
            });
            return;
        };
        res.json(ticket);
    } catch (error) {
        console.error("Error al obtener ticket:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getTicketComments(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;

        if (typeof id !== "string" || !uuidRegex.test(id)) {
            res.status(400).json({ error: "El ID proporcionado no tiene un formato UUID válido" });
            return;
        }

        const ticket = await findTicketWithId(id as UUID);
        if (!ticket) {
            res.status(404).json({ error: "Ticket no encontrado" });
            return;
        }

        const comments = await findTicketComments(id as UUID);
        res.json(comments);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function postTicketComment(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        if (typeof id !== "string" || !uuidRegex.test(id)) {
            res.status(400).json({ error: "El ID proporcionado no tiene un formato UUID válido" });
            return;
        }

        if (!comment) {
            res.status(400).json({
                error: "El comentario es obligatorio"
            });
            return;
        }

        const createdComment = await createTicketComment(id as UUID, comment);
        if (!createdComment) {
            res.status(404).json({
                error: "Ticket no encontrado"
            });
            return;
        };

        res.status(201).json(createdComment);
    } catch (error) {
        console.error("Error al crear comentario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}