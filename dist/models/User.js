"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    id: {
        type: Number,
        default: Date.now(),
    },
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
