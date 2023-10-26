"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventValidation = void 0;
const zod_1 = require("zod");
const eventSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
})
    .strict();
const deleteEventValidation = (req, res, next) => {
    const parsed = eventSchema.safeParse(req.params);
    if (!parsed.success) {
        res.status(400).send(parsed.error);
    }
    else {
        next();
    }
};
exports.deleteEventValidation = deleteEventValidation;
