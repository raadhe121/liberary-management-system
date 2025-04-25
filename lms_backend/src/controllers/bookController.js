import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import Book from "../models/book.js";
import { validateRequiredFields } from "../validators.js";
dotenv.config()



export const addBook = async (req, res) => {
    try {
        const { name, author } = req.body
        let validateMessage = validateRequiredFields(req.body)
        if (validateMessage) {
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        } else {
            const book = await Book.create({
                name,
                author,
                status: 'active'
            })
            return res.status(200).json({
                status: 200,
                message: "Book created Successfully.",
                data: book,
            });
        }

    }
    catch (e) {
        return res.status(401).json({
            status: 401,
            message: "Internal Server Error",
            user: {},
        });
    }
}