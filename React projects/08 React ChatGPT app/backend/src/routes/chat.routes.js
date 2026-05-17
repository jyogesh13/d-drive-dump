import express from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import {
  getConversationMessages,
  getUserConversations,
  streamChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

// router.post("/stream", jwtAuth, streamChat);
router.post("/stream", streamChat);
router.get("/conversations", jwtAuth, getUserConversations);
router.get("/conversations/:id/messages", jwtAuth, getConversationMessages);

export default router;
