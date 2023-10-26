import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/User";

type UserCredentials = {
    username: string;
    password: string;
};

export const findUserById = async (id: string) => {
    return await User.findOne({ id: id });
};

export const createUser = async (credentials: UserCredentials) => {
    const { username, password } = credentials;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        password: hashedPassword,
        id: Date.now()
    });

    return await user.save();
};

export const generateJwtForUser = (id: string) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME
    });
};
