import { Schema, model, Document } from "mongoose"

interface IEvent extends Document {
  start: number;
  duration: number;
  title: string;
  userId: number;
  overlaps?: boolean;
}

const EventSchema: Schema = new Schema({
  start: {
    type: Number,
    required: true,
    min: 0,
    max: 540
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
  }
})

const Event = model<IEvent>('Event', EventSchema)
export default Event;