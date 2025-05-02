import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validateRequiredFields } from "../validators.js";
import { hashPassword } from "../encryption.js";
import role from "../models/role.js";
import dotenv from 'dotenv'
import { error } from "firebase-functions/logger";
dotenv.config()



export const createUser = async (req, res) => {
    try {
        const { name, email, password, number, role } = req.body;
        let validateMessage = validateRequiredFields(req.body)
        const isEmailExists = await User.findOne({ where: { email: email }, raw: true })
        if (validateMessage) {
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        }
        else if (isEmailExists) {
            validateMessage = "Email already exists."
            return res.status(401).json({
                status: 401,
                message: validateMessage,
                user: {},
            });
        }
        else {
            const hashedPassword = await hashPassword(password)
            const roleId = role == 'staff' ? 2 : 3
            const user = await User.create({
                roleId: roleId,
                name,
                email,
                number,
                password: hashedPassword,
            });
            delete user.password;
            return res.status(200).json({
                status: 200,
                message: "User created successfully",
                user: user,
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            user: {},
        });
        console.log(e);

    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: "Invalid password" });
        }
        delete user.password;
        const userRoleData = await role.findOne({ where: { id: user.roleId } })
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const users = {
            ...user,
            token: token,
            role: userRoleData

        }
        return res.status(200).json({
            status: 200,
            message: "User Login successfully",
            data: users
        })
    } catch (e) {
        console.log("user", e);
        return res.status(500).json({ status: 404, error: "Internal Server Error" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Token not provided',
                user: {},
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                message: 'Logged out successfully',
                user: {},
            });
        }
    } catch (e) {

    }
}

export const myProfile = async (req, res) => {
    try {
        console.log("this is id", req.user.id);

        const user = await User.findOne({ where: { id: req.user.id }, raw: true })
        const useRole = await role.findOne({ where: { id: user.roleId }, raw: true })
        const users = {
            ...user,
            role: useRole
        }
        return res.status(200).json({
            status: 200,
            message: "Profile found successfully.",
            data: users
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: {},
            error: e
        })
    }
}