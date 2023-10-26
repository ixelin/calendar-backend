import { Router } from "express";
const router = Router();

import { verify } from "../middleware/verify-token";
import {
  deleteEventController,
  getEventController,
  getJsonFileController,
  getOneEventController,
  getUserController,
  postEventController,
} from "../controllers/protected";
import { postEventValidation } from "../middleware/post-event-validation";
import { deleteEventValidation } from "../middleware/delete-event-validation";
import { getEventValidation } from "../middleware/get-event-validation";

// sample route - just put the verify middleware before any route here for JWT validation.
router.get("/user", verify, getUserController);
router.post("/event", verify, postEventValidation, postEventController);
router.get(
  "/event-by-id/:id",
  verify,
  getEventValidation,
  getOneEventController
);
router.delete(
  "/event/:id",
  verify,
  deleteEventValidation,
  deleteEventController
);
router.get("/events", verify, getEventController);
router.get("/json", verify, getJsonFileController);

export default router;
