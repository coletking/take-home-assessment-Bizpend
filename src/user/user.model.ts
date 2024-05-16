import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  id:string
}


const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
  id:{ type: String, required: true, unique:true}
});

const User = model<IUser>('User', userSchema);

export default User;
