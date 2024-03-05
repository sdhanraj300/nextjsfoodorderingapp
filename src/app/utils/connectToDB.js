import mongoose from "mongoose";
export async function connectToDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (!process.env.MONGO_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGO_URL"');
  }
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
