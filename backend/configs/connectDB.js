import mongoose from 'mongoose';

const connectDB = async (DB_URI) => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log(`MONGO_DB CONNECTED: ${db.connection.host.cyan.underline}`);
  } catch (error) {
    console.log(`ERROR: ${error.message.red.underline.bold}`);
    process.exit(1);
  }
};

export default connectDB;
