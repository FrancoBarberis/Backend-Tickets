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

export function getAllTickets(req: Request, res: Response): void {
    const tickets = findAllTickets();
    res.json(tickets);
}

export function createTicket(req: Request, res: Response): void {
    const { shortDescription, description }: TicketDescriptions = req.body;
    if (!shortDescription) {
        res.status(400).json({
            error: "shortDescription es obligatorio"
        });
        return;
    }
    const ticket = createNewTicket({ shortDescription, description: description || "" });
    res.status(201).json(ticket);
}

export function getTicketWithId(req: Request, res: Response): void {
    const { id } = req.params;

    if (typeof id !== "string" || !uuidRegex.test(id)) {
        res.status(400).json({ error: "El ID proporcionado no tiene un formato UUID válido" });
        return;
    }

    const ticket = findTicketWithId(id as UUID);
    if (!ticket) {
        res.status(404).json({
            error: "Ticket no encontrado"
        });
        return;
    };
    res.json(ticket);
}

export function getTicketComments(req: Request, res: Response): void {
    const { id } = req.params;

    if (typeof id !== "string" || !uuidRegex.test(id)) {
        res.status(400).json({ error: "El ID proporcionado no tiene un formato UUID válido" });
        return;
    }

    const ticket = findTicketWithId(id as UUID);
    if (!ticket) {
        res.status(404).json({ error: "Ticket no encontrado" });
        return;
    }

    const comments = findTicketComments(id as UUID);
    res.json(comments);
}

export function postTicketComment(req: Request, res: Response): void {
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

    const createdComment = createTicketComment(id as UUID, comment);
    if (!createdComment) {
        res.status(404).json({
            error: "Ticket no encontrado"
        });
        return;
    };

    res.status(201).json(createdComment);
}