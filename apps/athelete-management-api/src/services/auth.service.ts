import { CreateUser } from '@/dto';
import { User } from '@/models';
import { ResponseMessage } from '@/utils';

export const createUser = async (user: CreateUser) => {
  try {
    const newUser = new User(user);
    await newUser.save();
  
    return newUser;
  } catch (error) {
    throw new Error(ResponseMessage.FAILED_REGISTER);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({email});
    
    if(!user) return null
  
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
