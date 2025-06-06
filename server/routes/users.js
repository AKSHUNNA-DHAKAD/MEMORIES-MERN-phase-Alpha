import express from "express";
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

// why these are a post Route beacuse we are sending some data from signin/sign up form to the server/ backend  and then backend accordingly performs accordingly. 
router.post('/signin', signin);  // ✅ correct path and handler
router.post('/signup', signup);  // ✅ correct path and handler

export default router;
