
import { Activity } from '@/models';
import { ResponseMessage } from '@/utils';
import { CreateActivity } from '@/dto';

export const createActivity = async (activity: CreateActivity) => {
  try {
    const newActivity = new Activity(activity);
    await newActivity.save();

    return newActivity;
  } catch (error) {
    throw new Error(ResponseMessage.FAILED_ACTIVITY_CREATE);
  }
};
