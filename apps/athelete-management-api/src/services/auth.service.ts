import { CreateUser } from '@/dto';
import { User } from '@/models';

export const createUser = async (user: CreateUser) => {
  try {
    const newUser = new User(user);
    await newUser.save();
  
    return newUser;
  } catch (error) {
    throw new Error(error);
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
