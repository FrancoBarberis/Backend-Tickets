// Ticket repository
import { pool } from "../../config/database.js";
import { Ticket } from "./ticket.model.js";
import { Comment } from "./ticket.comments.model.js";
import { UUID } from "crypto";

export async function findAll(): Promise<Ticket[]> {
    const result = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
    return result.rows.map(row => mapTicket(row));
}

export async function create(shortDescription: string, description: string): Promise<Ticket> {
    const query = `
        INSERT INTO tickets (short_description, description)
        VALUES ($1, $2)
        RETURNING *
    `;
    const result = await pool.query(query, [shortDescription, description]);
    return mapTicket(result.rows[0]);
}

export async function findById(id: UUID): Promise<Ticket | null> {
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return mapTicket(result.rows[0]);
}

export async function findCommentsByTicketId(ticketId: UUID): Promise<Comment[]> {
    const result = await pool.query('SELECT * FROM comments WHERE ticket_id = $1 ORDER BY created_at ASC', [ticketId]);
    return result.rows.map(row => mapComment(row));
}

export async function createComment(ticketId: UUID, text: string): Promise<Comment> {
    const query = `
        INSERT INTO comments (ticket_id, text)
        VALUES ($1, $2)
        RETURNING *
    `;
    const result = await pool.query(query, [ticketId, text]);
    return mapComment(result.rows[0]);
}

export async function ticketExists(id: UUID): Promise<boolean> {
    const ticketResult = await pool.query('SELECT id FROM tickets WHERE id = $1', [id]);
    return ticketResult.rows.length > 0;
}

// Helpers para mapear las columnas snake_case de la base de datos a las propiedades camelCase del modelo
function mapTicket(row: any): Ticket {
    return {
        id: row.id,
        shortDescription: row.short_description,
        description: row.description,
        state: row.state,
        priority: row.priority,
        requesterId: row.requester_id,
        assigneeId: row.assignee_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

function mapComment(row: any): Comment {
    return {
        id: row.id,
        ticketId: row.ticket_id,
        text: row.text,
        authorId: row.author_id,
        createdAt: row.created_at
    };
}
