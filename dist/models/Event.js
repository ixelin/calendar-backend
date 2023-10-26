"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventSchema = new mongoose_1.Schema({
    start: {
        type: Number,
        required: true,
        min: 0,
        max: 540,
    },
    duration: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    overlaps: {
        type: Boolean,
    },
    userId: {
        type: Number,
        required: true,
    },
});
const Event = (0, mongoose_1.model)("Event", EventSchema);
exports.default = Event;
