// Ticket controller
import { Request, Response } from "express";
import {
    findAllTickets,
    createNewTicket,
    findTicketWithId,
    getTicketComments,
    postTicketComment
} from "./ticket.service.js";

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
    // TODO: Implement
    const { id } = req.params;
    const ticket = findTicketWithId(id);
    res.status(501).json({ message: "Not implemented" });
}

export function getTicketComments(req: Request, res: Response): void {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented" });
}

export function postTicketComment(req: Request, res: Response): void {
    // TODO: Implement
    res.status(501).json({ message: "Not implemented" });
}