import { Response } from "express";
import * as userService from '../services/userService';

export const registerUser = async (req: any, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.send({
            username: user.username,
            password: req.body.password,
            id: user.id,
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

export const loginUser = async (req: any, res: Response) => {
    const token = userService.generateJwtForUser(req.id);
    res.header('Authorization', `Bearer ${token}`).send({ token, data: { username: req.body.username, password: req.body.password, id: req.id } });
};
