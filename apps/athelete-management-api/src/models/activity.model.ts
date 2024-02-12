import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true
    },
    venue: {
      type: Schema.ObjectId,
      ref: 'Venue'
    }
  },
  {
    timestamps: true,
  }
);

const Activity = model('Activity', activitySchema);

export { Activity };
