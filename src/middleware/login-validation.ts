import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import User from "../models/User";

type RequestBody = {
  username: string;
  password: string;
};

// zod Validations
const loginSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(6),
  })
  .strict();

export const loginValidation = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // validating using zod
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) res.status(400).send(parsed.error);
  else {
    const {
      username: usernameFromBody,
      password: passwordFromBody,
    }: RequestBody = req.body;
    // checking if the email exists
    const user = await User.findOne({ username: usernameFromBody });
    if (user) {
      // checking if the password is correct
      const validPass = await bcrypt.compare(passwordFromBody, user.password);
      if (validPass) {
        req.id = user.id;
        next();
      } else res.status(400).send("Invalid Email or Password!!!");
    } else res.status(400).send("Invalid Email or Password!!!");
  }
};
