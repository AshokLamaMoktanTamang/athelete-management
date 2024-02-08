import mongoose from 'mongoose';
import { config } from '@/config';

export const connectDb = async () => {
  try {
    await mongoose
      .connect(config.mongoUri, {
        connectTimeoutMS: 500,
      })
      .then(() => console.log('Mongo Connected successfully'));
  } catch (error) {
    console.log('Failed connecting mongo', error);
  }
};
