import express from 'express'
import { createUser, loginUser, logoutUser, myProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { addBook, getAllBook, getUsersBook, issueBook } from '../controllers/bookController.js';
const router = express.Router();


router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/all-book', getAllBook);


router.post('/logout',authenticateUser, logoutUser);
router.get('/my-profile',authenticateUser, myProfile);
router.post('/add-book',authenticateUser, addBook);
router.get('/user-book',authenticateUser, getUsersBook);
router.post('/issue-book',authenticateUser, issueBook);



export default router
