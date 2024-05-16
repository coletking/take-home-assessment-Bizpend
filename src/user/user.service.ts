import { editUserPayload, newUser } from "../pkg/user.interface";
import { getRandomId } from "../utils/idGenerator";
import User from "./user.model";

export const createNewUser = async(name:string, email:string, age:number):Promise<[boolean, newUser]> =>{
    const userId = getRandomId(35,"1234567890")
    const user = new User({ name, email, age, id:userId })
    await user.save()
    return[true, user]
}

export const getUserById = async(id:string)=>{
    if(!id){
        return undefined
    }
  const user =   await User.findById(id);
  return user as newUser
}

export const updateUserAccount = async (id: string, payload: editUserPayload, session: any): Promise<[boolean, any]> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true, session });
        if (!updatedUser) {
            return [false, null];
        }
        return [true, updatedUser];
    } catch (error) {
        throw new Error('Update operation failed');
    }
};

export const deletUserAccountById = async(id:string)=>{
   const action =  await User.findByIdAndDelete(id);
   if(!action){
    throw new Error("Delete operation failed")
   }
   return action
}