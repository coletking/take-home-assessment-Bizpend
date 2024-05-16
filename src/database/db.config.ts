import mongoose from 'mongoose';
import { DB_url } from '../config/main.config';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = DB_url;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000
    });

    console.log('MongoDB connected successfully');
  } catch (error:any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
