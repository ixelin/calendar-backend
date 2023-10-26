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
exports.writeEventsToJson = exports.deleteEventById = exports.findEventsByUserId = exports.findEventById = exports.createEvent = void 0;
const fs_1 = __importDefault(require("fs"));
const Event_1 = __importDefault(require("../models/Event"));
const createEvent = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Event_1.default.create(Object.assign(Object.assign({}, data), { userId: userId }));
});
exports.createEvent = createEvent;
const findEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Event_1.default.findById(id);
});
exports.findEventById = findEventById;
const findEventsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Event_1.default.find({ userId: userId });
});
exports.findEventsByUserId = findEventsByUserId;
const deleteEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Event_1.default.deleteOne({ _id: id });
});
exports.deleteEventById = deleteEventById;
const writeEventsToJson = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield (0, exports.findEventsByUserId)(userId);
    const json = JSON.stringify(events, null, 2);
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile('data.json', json, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('data.json');
            }
        });
    });
});
exports.writeEventsToJson = writeEventsToJson;
