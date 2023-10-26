import { Response, NextFunction } from "express";

import { z } from "zod";

// zod Validations
const eventSchema = z
  .object({
    start: z.number().min(0).max(540),
    duration: z.number(),
    title: z.string(),
    overlaps: z.boolean().optional(),
  })
  .strict();

export const postEventValidation = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // validating using zod
  const parsed = eventSchema.safeParse(req.body);
  if (!parsed.success) res.status(400).send(parsed.error);
  else {
    next();
  }
};
