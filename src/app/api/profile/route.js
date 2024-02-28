import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const phone = data.phone;
  const address = data.address;
  const postalCode = data.postalCode;
  const city = data.city;
  const country = data.country;

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  await User.updateOne(
    { email },
    { name: data.name, phone, address, postalCode, city, country }
  );
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  return Response.json(await User.findOne({ email }));
}
