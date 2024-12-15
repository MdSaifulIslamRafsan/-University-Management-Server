import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';
let server: Server;

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('Database connected');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
connectDB();

process.on('unhandledRejection', () => {
  console.log('🚨 Unhandled rejection, exiting now...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('🚨 Uncaught exception, exiting now...');

  process.exit(1);
});
