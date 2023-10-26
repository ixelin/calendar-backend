import { Response } from "express";
import fs from "fs";
import * as eventService from "../services/eventService";
import * as userService from "../services/userService";

export const getUserController = async (req: any, res: Response) => {
  const user = await userService.findUserById(req.user.id);
  res.status(200).json(user);
};
export const postEventController = async (req: any, res: Response) => {
  const event = await eventService.createEvent(req.body, req.user.id);
  res.status(200).json(event);
};

export const getOneEventController = async (req: any, res: Response) => {
  const event = await eventService.findEventById(req.params.id);
  res.status(200).json(event);
};

export const getEventController = async (req: any, res: Response) => {
  const events = await eventService.findEventsByUserId(req.user.id);
  res.status(200).json(events);
};

export const deleteEventController = async (req: any, res: Response) => {
  const event = await eventService.deleteEventById(req.params.id);
  res.status(200).json(event);
};

export const getJsonFileController = async (req: any, res: Response) => {
  try {
    const filePath: any = await eventService.writeEventsToJson(req.user.id);
    res.sendFile(filePath, { root: "." }, (err) => {
      if (err) {
        console.error("Error sending JSON file:", err);
        return res.status(500).json({ error: "Error sending JSON file" });
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting JSON file:", err);
        }
      });
    });
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return res.status(500).json({ error: "Error writing JSON file" });
  }
};
