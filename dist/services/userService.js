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
exports.generateJwtForUser = exports.createUser = exports.findUserById = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ id: id });
});
exports.findUserById = findUserById;
const createUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentials;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = new User_1.default({
        username: username,
        password: hashedPassword,
        id: Date.now(),
    });
    return yield user.save();
});
exports.createUser = createUser;
const generateJwtForUser = (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.generateJwtForUser = generateJwtForUser;
