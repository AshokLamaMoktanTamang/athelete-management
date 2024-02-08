export const config = {
  port: parseInt(process.env.API_PORT, 10) || 3001,
  mongoUri: process.env.MONGODB_URI,
};
