import { Response, NextFunction } from "express";
import { z } from "zod";

// zod Validations
const eventSchema = z
  .object({
    id: z.string(),
  })
  .strict();

export const deleteEventValidation = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Validating using zod
  const parsed = eventSchema.safeParse(req.params);

  if (!parsed.success) {
    res.status(400).send(parsed.error);
  } else {
    next();
  }
};
