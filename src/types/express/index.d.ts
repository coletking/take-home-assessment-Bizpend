import { newUser } from "../../pkg/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
      user?: newUser;
    }
  }