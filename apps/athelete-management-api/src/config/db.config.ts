import mongoose, { Connection } from 'mongoose';
import { config } from '@/config';

let dbClient: Connection | void;

export const connectDb = async () => {
  try {
    dbClient = await mongoose
      .connect(config.mongoUri, {
        connectTimeoutMS: 500,
      })
      .then(() => console.log('Mongo Connected successfully'));
  } catch (error) {
    console.log('Failed connecting mongo', error);
  }
};

export const getDbClient = (): Connection => dbClient || null;
