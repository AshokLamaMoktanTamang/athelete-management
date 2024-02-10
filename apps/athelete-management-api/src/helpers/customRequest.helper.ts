import { Request } from 'express';
import { ClientSession } from 'mongoose';

export interface CustomRequest extends Request {
  session?: ClientSession;
}
