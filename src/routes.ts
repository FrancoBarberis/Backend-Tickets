// Central routes
import { Router } from "express";
import ticketRoutes from "./modules/tickets/ticket.routes.js";

const router = Router();

// Define verticals
router.use("/tickets", ticketRoutes);
// router.use("/users", userRoutes);
// router.use("/auth", authRoutes);

export default router;