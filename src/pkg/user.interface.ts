import { Schema, model, Document } from 'mongoose';

export interface newUser extends Document {
  name: string;
  email: string;
  age?: number;
  id:string
}


export interface editUserPayload {
    name?: string;
    email?: string;
    age?: number;
  }

