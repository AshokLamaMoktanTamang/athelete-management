import { CreateActionEvent } from '@/dto';
import { EventAction } from '@/models';
import { HttpMessage } from '@/utils';
import { SaveOptions } from 'mongoose';

export const createEvent = async (
  event: CreateActionEvent,
  saveOption?: SaveOptions
) => {
  try {
    const newEvent = new EventAction(event);
    await newEvent.save(saveOption);
    
    return newEvent;
  } catch (error) {
    throw new Error(HttpMessage.InternalServerError);
  }
};
