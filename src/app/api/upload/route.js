import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
export async function POST(req) {
  if (req.query) {
    console.log("Request Query Parameters:", req.query);
  }
  await mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const image = body.image;
  await User.updateOne({ email }, { image: body.image });
  return Response.json(true);
}
