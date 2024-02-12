import { Request } from 'express';
import { ClientSession } from 'mongoose';

import { AccesstokenPayload } from '@/dto';

export interface CustomRequest extends Request {
  session?: ClientSession;
  user?: AccesstokenPayload
}
