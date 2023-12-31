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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./db/connect");
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const auth_1 = __importDefault(require("./routes/auth"));
const protected_1 = __importDefault(require("./routes/protected"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use("/api/user", auth_1.default);
app.use("/api/protected", protected_1.default);
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connect_1.connectDB)("mongodb://0.0.0.0:27017/");
        if (db) {
            console.log("Connected to the database!!!");
        }
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
