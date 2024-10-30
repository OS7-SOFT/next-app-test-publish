import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validated = schema.safeParse(body);

  if (!validated.success)
    return NextResponse.json({ error: validated.error }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { error: "User is already exists" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ newUser: newUser.email }, { status: 201 });
}
