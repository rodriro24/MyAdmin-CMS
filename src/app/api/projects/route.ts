import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const res = await prisma.project.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log;
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  if (!session) {
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  }
  try {
    const newProj = await prisma.project.create({
      data: {
        title: data.title,
        content: data.content,
        user: {
          connect: {
            id: Number(session?.user?.id),
          },
        },
      },
    });

    return NextResponse.json(newProj, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el proyecto" },
      { status: 500 }
    );
  }
}
