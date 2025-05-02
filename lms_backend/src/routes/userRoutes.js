import express from 'express'
import { createUser, loginUser } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { addBook } from '../controllers/bookController.js';
const router = express.Router();


router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/add-book',authenticateUser, addBook);



export default router
