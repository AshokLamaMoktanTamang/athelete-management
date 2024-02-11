import jwt from 'jsonwebtoken';

import { config } from '@/config';

export const generateAccessToken = (payload: Record<string, string>) => {
  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });

  return accessToken;
};
