import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../user/user.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided' });
      return;
    }
    
    const decoded = verifyToken(token);
    const userId = (decoded as { id: string }).id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
