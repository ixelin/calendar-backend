import { Response, NextFunction } from "express";

import { z } from "zod";
import User from "../models/User";

// zod Validations
const registerSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
}).strict();

type RequestBody = {
    username: string;
}
export const registerValidation = async (req: any, res: Response, next: NextFunction) => {
    // validating using zod
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success)
        res.status(400).send(parsed.error)
    else {
        const { username }: RequestBody = req.body;
        // checking to see if the user is already registered
        const usernameExist = await User.findOne({ username: username })
        if (usernameExist)
            res.status(400).send('User with this name already exists!!!')
        else
            next();
    }
}
