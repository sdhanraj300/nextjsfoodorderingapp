import { Category } from "../../../models/Category";
import mongoose from "mongoose";
export async function POST(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  const categoryDoc = await Category.findByIdAndUpdate(_id, { name });
  return Response.json(categoryDoc);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Category.deleteOne({ _id });
  return Response.json(true);
}
