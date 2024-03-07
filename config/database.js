import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //If the databes is already connected, don't connect again
  if (connected) {
    console.log("=> using existing database connection");
    return;
  }

  //connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("=> new database connection");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
  }
};

export default connectDB;
