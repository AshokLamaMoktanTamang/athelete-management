import { Schema, model } from 'mongoose';

const venueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Venue = model('Venue', venueSchema);

export { Venue };
