// Ticket routes
import { Router } from "express";

import {
    getAllTickets,
    createTicket
} from "./ticket.controller.js";

const router = Router();

//GET /api/tickets
router.get("/", getAllTickets);

//POST /api/tickets
router.post("/", createTicket);

export default router;