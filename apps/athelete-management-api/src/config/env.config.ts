export const config = {
  port: parseInt(process.env.API_PORT, 10) || 3001,
  mongoUri: process.env.MONGODB_URI,
  mongoReplica: process.env.MONGODB_REPLICA,
  jwtSecret: process.env.JWT_SECRET_KEY,
};
