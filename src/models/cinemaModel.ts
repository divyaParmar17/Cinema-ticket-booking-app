import mongoose, { Schema, Document } from 'mongoose';

export interface Cinema {
  seats: number;
  bookedSeats: number[];
}

export interface CinemaModel extends Document, Cinema {}

const cinemaSchema: Schema = new Schema({
  seats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: [Number],
    default: [],
  },
});

export default mongoose.model<CinemaModel>('Cinema', cinemaSchema);
