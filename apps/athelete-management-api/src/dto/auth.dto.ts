import { UserRole } from '@/utils';

export interface CreateUser {
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  email: string;
}
