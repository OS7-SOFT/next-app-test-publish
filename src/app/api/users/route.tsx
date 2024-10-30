import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import userSchema from "./schema";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = userSchema.safeParse(body);
  if (!validated) return NextResponse.json({ error: validated, status: 400 });
  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user) return NextResponse.json({ error: "This user is already exits" });

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json({ newUser, status: 201 });
}
