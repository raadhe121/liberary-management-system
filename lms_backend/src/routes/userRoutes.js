import express from 'express'
import { createUser, deleteUser, getAllStudents, loginUser, logoutUser, myProfile, updateUser } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { addBook, deleteBook, getAllBook, getUsersBook, issueBook, retrunBook, updateBook } from '../controllers/bookController.js';
const router = express.Router();


router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/all-book', getAllBook);
router.post('/update-user', updateUser);
router.post('/delete-user', deleteUser);

router.post('/logout',authenticateUser, logoutUser);
router.get('/my-profile',authenticateUser, myProfile);
router.get('/all-students',authenticateUser, getAllStudents);
router.post('/add-book',authenticateUser, addBook);
router.post('/update-book',authenticateUser, updateBook);
router.post('/delete-book',authenticateUser, deleteBook);

router.get('/user-book',authenticateUser, getUsersBook);
router.post('/issue-book',authenticateUser, issueBook);
router.post('/return-book',authenticateUser, retrunBook);




export default router
