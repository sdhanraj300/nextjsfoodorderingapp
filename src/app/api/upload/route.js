import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  console.log(email);
  const image = body.image;
  await User.updateOne({ email }, { image: body.image });
  console.log(image);
  return Response.json(true);
}
