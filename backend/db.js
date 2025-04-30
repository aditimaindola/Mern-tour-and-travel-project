import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      ssl: true, // Enforce SSL/TLS
      serverSelectionTimeoutMS: 5000, // Optional: helps avoid long hangs
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop the server if the DB connection fails
  }
};

export default connectDB;
