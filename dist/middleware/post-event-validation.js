"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEventValidation = void 0;
const zod_1 = require("zod");
const eventSchema = zod_1.z
    .object({
    start: zod_1.z.number().min(0).max(540),
    duration: zod_1.z.number(),
    title: zod_1.z.string(),
    overlaps: zod_1.z.boolean().optional(),
})
    .strict();
const postEventValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = eventSchema.safeParse(req.body);
    if (!parsed.success)
        res.status(400).send(parsed.error);
    else {
        next();
    }
});
exports.postEventValidation = postEventValidation;
