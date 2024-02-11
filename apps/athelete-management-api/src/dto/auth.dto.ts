import { UserRole } from '@/utils';
import { SaveOptions } from 'mongoose';

export interface CreateUser extends SaveOptions {
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  email: string;
  country: string;
  contact: string;
  interestedSports: Array<string>;
}

export type LoginResponse = {
  accessToken: string
}
