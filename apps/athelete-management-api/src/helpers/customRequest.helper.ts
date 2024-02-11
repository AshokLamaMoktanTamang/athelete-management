import { Request } from 'express';
import { ClientSession } from 'mongoose';

import { CreateActionEvent } from '@/dto';

export interface CustomRequest extends Request {
  session?: ClientSession;
}
