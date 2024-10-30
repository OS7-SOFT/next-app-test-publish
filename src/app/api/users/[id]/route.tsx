import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/client";
import userSchema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    return NextResponse.json({ error: "Not Found" });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validated = userSchema.safeParse(body);

  if (!validated.success)
    return NextResponse.json(validated.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user)
    return NextResponse.json({ error: "user Not Found" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user)
    return NextResponse.json({ error: "user Not Found" }, { status: 404 });

  const userDeleted = await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json(userDeleted, { status: 200 });
}
