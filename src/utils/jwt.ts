import jwt from 'jsonwebtoken';
import { token } from '../config/config.staging';

const secretKey = token;

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, secretKey);
};
