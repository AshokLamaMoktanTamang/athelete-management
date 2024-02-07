import { CreateUser } from '@/dto';
import { User } from '@/models';

export const createUser = async (user: CreateUser) => {
  const newUser = new User(user);

  await newUser.save();

  return newUser;
};
