import { Router } from 'express';
import { createUser, deleteUser, getUser, updateUser } from './user.controler';
import { authMiddleware } from '../middleware/auth';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:id', authMiddleware, getUser);
userRouter.patch('/:id',authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);

export default userRouter;
