import { Request, Response } from "express";

import {
  createNewUser,
  deletUserAccountById,
  getUserById,
  updateUserAccount,
} from "./user.service";
import { editUserPayload } from "../pkg/user.interface";
import { startSession } from "mongoose";
import { generateToken } from "../utils/jwt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const [status, newUser] = await createNewUser(name, email, age);
    if (!status) {
      return res.json({
        status: false,
        message: "Unexpected error try again",
      });
    }
  
    const token = generateToken(newUser._id.toString());
    return res.json({
      status: true,
      user: newUser,
      token,
      message: "new user created successfully",
    });
    
  } catch (error: any) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.json({
        status: false,
        message: "No user record found",
      });
    }
    return res.json({
      status: true,
      message: "user record fetch successfully",
      user,
    });
  } catch (error: any) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const id: string = req.params.id;

  // Create a dynamic payload
  const payload: Partial<editUserPayload> = {};
  if (name !== undefined) payload.name = name;
  if (email !== undefined) payload.email = email;
  if (age !== undefined) payload.age = age;

  if (Object.keys(payload).length === 0) {
    return res.json({
      status: false,
      message: "No valid fields provided for update",
    });
  }

  const session = await startSession();

  try {
    session.startTransaction();

    const [status, newUser] = await updateUserAccount(id, payload, session);

    if (!status) {
      await session.abortTransaction();
      session.endSession();
      return res.json({
        status: false,
        message: "User record fetch failed",
        newUser,
      });
    }

    await session.commitTransaction();
    session.endSession();

    return res.json({
      status: true,
      message: "User record updated successfully",
      newUser,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await deletUserAccountById(id);
    if (!user) {
      return res.json({
        status: false,
        message: "Delete operation failed",
      });
    }
    return res.json({
      status: true,
      message: "Delete operation successful",
    });
  } catch (error: any) {
    return res.json({
      status: false,
      message: "Unexpected Error",
    });
  }
};
