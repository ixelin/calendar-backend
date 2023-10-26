import fs from 'fs';
import Event from "../models/Event";

export const createEvent = async (data: any, userId: string) => {
    return await Event.create({ ...data, userId: userId });
};

export const findEventById = async (id: string) => {
    return await Event.findById(id);
};

export const findEventsByUserId = async (userId: string) => {
    return await Event.find({ userId: userId });
};

export const deleteEventById = async (id: string) => {
    return await Event.deleteOne({ _id: id });
};

export const writeEventsToJson = async (userId: string) => {
    const events = await findEventsByUserId(userId);
    const json = JSON.stringify(events, null, 2);
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json', json, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('data.json');
            }
        });
    });
};
