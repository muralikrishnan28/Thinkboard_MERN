import mongoose from "mongoose";

export const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully!!!");
  } catch (error) {
    console.error(`Error to Connect DB : ${error}`);
    process.exit(1);
  }
};
