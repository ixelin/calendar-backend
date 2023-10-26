import { Response, NextFunction } from "express";
import { z } from "zod";
import Event from "../models/Event";
import mongoose from "mongoose";

// zod Validations
const eventSchema = z
  .object({
    id: z.string(),
  })
  .strict();
type RequestParams = {
  id: string;
};
export const getEventValidation = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const parsed = eventSchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).send(parsed.error);
  }
  try {
    const { id }: RequestParams = req.params;
    const validId = new mongoose.Types.ObjectId(id)
    const event = await Event.findOne({ _id: validId  });
    if (event) {
      next();
    } else {
      return res.status(400).send("This event no longer exist");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
};