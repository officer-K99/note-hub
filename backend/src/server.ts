import app from "./app";
import dotenv from "dotenv";
import connectToDataBase from "./configs/db";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error("could not found db connection in env");
    }

    await connectToDataBase(dbUri);

    app.listen(PORT, () => {
      console.log(`Server is Running at Port ${PORT}`);
    });
  } catch (err) {
    console.error(`could not start the sever ${err}`);
    process.exit(1);
  }
};

startServer();
