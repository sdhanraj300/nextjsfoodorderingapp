import { Category } from "../../../models/Category";

export async function POST(req, res) {
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}

export async function GET(req, res) {
  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(req, res) {
  const { _id, name } = await req.json();
  const categoryDoc = await Category.findByIdAndUpdate(_id, { name });
  return Response.json(categoryDoc);
}
