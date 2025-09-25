import express from 'express';
import { getAllContacts,getMessagesByUserId,sendMessage,getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from "../middleware/arcjet.middleware.js";



// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware


const router=express.Router();
router.use(arcjetProtection, protectRoute);


router.get("/contacts", getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);




export default router;