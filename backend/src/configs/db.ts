import mongoose from "mongoose";

const connectToDataBase = async (uri: string): Promise<void> => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`DataBase is connected to: ${connect.connection.host}`);
  } catch (err) {
    console.error("could not connect to database", err);
    throw err;
  }
};

export default connectToDataBase;
