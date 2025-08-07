import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { validateRequiredFields } from "../validators.js";
import UserBook from "../models/userbook.js";
import User from "../models/userModel.js";
import Book from "../models/book.js";
dotenv.config()



export const addBook = async (req, res) => {
    try {
        const { title, author } = req.body
        let validateMessage = validateRequiredFields(req.body)
        if (validateMessage) {
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        } else {
            const newBook = await Book.findAll({ where: { name: title, author: author } })
            if (newBook.length > 0) {
                return res.status(401).json({
                    status: 401,
                    message: "Book with same name and author already exists.",
                    user: {},
                });
            } else {
                const name = title
                const book = await Book.create({
                    name,
                    author,
                    status: 'active',
                    bookStatus: 'free'
                })
                return res.status(200).json({
                    status: 200,
                    message: "Book created Successfully.",
                    data: book,
                });
            }

        }

    }
    catch (e) {
        console.log("thisisi", e);

        return res.status(401).json({
            status: 401,
            message: "Internal Server Error",
            user: {},
        });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { id, name, author } = req.body
        let validateMessage = validateRequiredFields(req.body)
        if (validateMessage) {
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        } else {
            const book = await Book.update({
                name,
                author,

            }, {
                where: { id: id }
            })
            return res.status(200).json({
                status: 200,
                message: "Book updated Successfully.",
                data: book,
            });
        }

    }
    catch (e) {
        console.log("thisisi", e);

        return res.status(401).json({
            status: 401,
            message: "Internal Server Error",
            user: {},
        });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.body

        let validateMessage = validateRequiredFields(id)
        if (validateMessage) {
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        } else {
            await Book.destroy({
                where: { id: id }
            })
            return res.status(200).json({
                status: 200,
                message: "Book deleted Successfully.",
                data: {},
            });
        }

    }
    catch (e) {
        console.log("thisisi", e);

        return res.status(401).json({
            status: 401,
            message: "Internal Server Error",
            user: {},
        });
    }
}



export const getAllBook = async (req, res) => {
    try {
        const books = await Book.findAll({ where: { status: 'active', bookStatus: 'free' }, raw: true })
        res.status(200).json({
            status: 200,
            message: "All book found successfully.",
            data: books,
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: {},
        });
    }
}

export const getUsersBook = async (req, res) => {
    try {

        const userBooks = await UserBook.findAll({
            where: { userId: req.user.id }
        });

        const bookIds = userBooks.map(ub => ub.bookId);
        const books = await Book.findAll({ where: { id: bookIds } });

        const userIds = userBooks.map(ub => ub.userId);

        const users = await User.findAll({ where: { id: userIds }, attributes: { exclude: ['password'] } });

        const data = userBooks.map(userBook => {
            const book = books.find(b => b.id === userBook.bookId);
            const user = users.find(u => u.id === userBook.userId);
            return { ...userBook.dataValues, Book: book, User: user };
        });

        return res.status(200).json({
            status: 200,
            message: "Book Found Successfully.",
            data: data,
        });
    } catch (e) {
        console.log("this is", e);

    }
}

export const issueBook = async (req, res) => {
    try {

        const book = await Book.findOne({ where: { id: req.body.bookId } })
        const userBook = await UserBook.findOne({ where: { bookId: req.body.bookId } })
        if (!req.body.bookId) {
            return res.status(401).json({
                status: 401,
                message: "Book Id is required.",
                data: {},
            });
        }
        if (!book) {
            return res.status(401).json({
                status: 401,
                message: "Book not found.",
                data: {},
            });
        }

        else if (userBook) {
            return res.status(401).json({
                status: 401,
                message: "Book already issued.",
                data: {},
            });
        }
        else {
            console.log("else");

            await UserBook.create({
                userId: req.user.id,
                bookId: Number(req.body.bookId)
            })
            await Book.update({ bookStatus: 'issued' },
                {
                    where: { id: req.body.bookId }
                })
            return res.status(200).json({
                status: 200,
                message: "Book Issued Successfully.",
                data: {},
            });
        }
    } catch (e) {
        console.log("this is", e);

        return res.status(500).json({
            status: 500,
            message: "Internal Server Error.",
            data: {},
        });
    }
}

export const retrunBook = async (req, res) => {
    try {

        const book = await Book.findOne({ where: { id: req.body.bookId } })
        const userBook = await UserBook.findOne({ where: { bookId: req.body.bookId } })
        if (!req.body.bookId) {
            return res.status(401).json({
                status: 401,
                message: "Book Id is required.",
                data: {},
            });
        }
        if (!book) {
            return res.status(401).json({
                status: 401,
                message: "Book not found.",
                data: {},
            });
        }


        else {
            console.log("else");

            await UserBook.destroy({ where: { bookId: req.body.bookId } })

            await Book.update({ bookStatus: 'free' },
                {
                    where: { id: req.body.bookId }
                })
            return res.status(200).json({
                status: 200,
                message: "Book Returned Successfully.",
                data: {},
            });
        }
    } catch (e) {
        console.log("this is", e);

        return res.status(500).json({
            status: 500,
            message: "Internal Server Error.",
            data: {},
        });
    }
}