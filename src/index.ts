import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig';
import cinemaRoutes from './routes/cinemaRoutes';
import logger from './utils/logger';
import { ResponseMessages } from './utils/responseMessage';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cinemaRoutes);

// Database connection
connectDB().then(() => {
  app.listen(port, () => {
    logger.info(`${ResponseMessages.SERVER_RUNNING} ${port}`);
  });
});
