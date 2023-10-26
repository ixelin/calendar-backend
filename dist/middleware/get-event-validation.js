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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventValidation = void 0;
const zod_1 = require("zod");
const Event_1 = __importDefault(require("../models/Event"));
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
})
    .strict();
const getEventValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = eventSchema.safeParse(req.params);
    if (!parsed.success) {
        return res.status(400).send(parsed.error);
    }
    try {
        const { id } = req.params;
        const validId = new mongoose_1.default.Types.ObjectId(id);
        const event = yield Event_1.default.findOne({ _id: validId });
        if (event) {
            next();
        }
        else {
            return res.status(400).send("This event no longer exist");
        }
    }
    catch (_a) {
        return res.status(500).send("Internal server error");
    }
});
exports.getEventValidation = getEventValidation;
