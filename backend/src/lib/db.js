import mongoose from "mongoose";

import dns from 'dns';
dns.setServers([
  '1.1.1.1','8.8.8.8'
])
export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const conn = await mongoose.connect(uri);
    console.log("db-connected")
  } catch (e) {
    console.log("Error : " , e.message);
  }
};
