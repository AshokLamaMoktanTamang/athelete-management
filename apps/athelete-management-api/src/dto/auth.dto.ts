import { UserRole } from '@/utils';
import { SaveOptions } from 'mongoose';

export interface CreateUser extends SaveOptions {
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  email: string;
}

export type LoginResponse = {
  accessToken: string
}
