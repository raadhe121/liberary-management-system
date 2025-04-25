import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import router from './routes/userRoutes.js';

dotenv.config()
const app = express()
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.any());

app.use('/',router);


export default app;


