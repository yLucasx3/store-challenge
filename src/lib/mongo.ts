import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI, { dbName: "store" });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    console.log("Error connecting to Mongoose>", error);
  }
};

export default connect;
