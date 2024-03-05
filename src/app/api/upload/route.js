import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { id, image } = data;
  let filter = {};
  if (id) {
    filter = { id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }
  await User.updateOne(filter, {image});
  return Response.json(true);
}
