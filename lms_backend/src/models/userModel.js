import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import dotenv from 'dotenv';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

dotenv.config();

const UserModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dob: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        "user-type": {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "user",
        timestamps: true
    }
);
export default UserModel;
