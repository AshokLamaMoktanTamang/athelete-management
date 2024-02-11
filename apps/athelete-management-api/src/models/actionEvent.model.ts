import { ActionEvent } from '@/utils';
import mongoose, { Schema, model } from 'mongoose';

const actionEventSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    event: {
      type: String,
      enum: Object.values(ActionEvent),
    },
  },
  {
    timestamps: true,
  }
);

const EventAction = model('ActionEvent', actionEventSchema);

export { EventAction };
