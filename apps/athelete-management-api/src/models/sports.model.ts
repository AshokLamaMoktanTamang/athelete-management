import { SportStatus } from '@/utils';
import { Schema, model } from 'mongoose';

const sportSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(SportStatus),
    },
  },
  {
    timestamps: true,
  }
);

const Sport = model('Sport', sportSchema);

export { Sport };
