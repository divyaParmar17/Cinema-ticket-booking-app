import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import { ResponseMessages } from '../utils/responseMessage';

dotenv.config();

//connection to db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    logger.info(ResponseMessages.DB_CONNECTION_CREATED);
  } catch (error) {
    logger.error(ResponseMessages.DB_CONNECTION_FAILED, error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
