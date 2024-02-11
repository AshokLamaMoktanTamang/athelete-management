import { CreateUser } from '@/dto';
import { User } from '@/models';
import { ResponseMessage } from '@/utils';
import { SaveOptions } from 'mongoose';

export const createUser = async (
  user: CreateUser,
  saveOptions?: SaveOptions
) => {
  try {
    const newUser = new User(user);
    await newUser.save(saveOptions);

    return newUser;
  } catch (error) {
    console.log('Error', error);
    
    throw new Error(ResponseMessage.FAILED_REGISTER);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return null;

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
