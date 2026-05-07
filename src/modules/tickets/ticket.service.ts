// Ticket service
import { Ticket } from "./ticket.model.js";
import { Comment } from "./ticket.comments.model.js";
import { UUID } from "crypto";
import * as ticketRepository from "./ticket.repository.js";

interface TicketInput {
    shortDescription: string;
    description?: string;
}

export async function findAllTickets(): Promise<Ticket[]> {
    return ticketRepository.findAll();
}

export async function createNewTicket({ shortDescription, description }: TicketInput): Promise<Ticket> {
    return ticketRepository.create(shortDescription, description || "");
}

export async function findTicketWithId(id: UUID): Promise<Ticket | null> {
    return ticketRepository.findById(id);
}

export async function findTicketComments(id: UUID): Promise<Comment[]> {
    return ticketRepository.findCommentsByTicketId(id);
}

export async function createTicketComment(id: UUID, commentText: string): Promise<Comment | null> {
    // Verificar si el ticket existe primero
    const exists = await ticketRepository.ticketExists(id);
    if (!exists) return null;

    return ticketRepository.createComment(id, commentText);
}