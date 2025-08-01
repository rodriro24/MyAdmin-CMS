import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Context) {
  const id = Number(params.id);

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const id = Number(params.id);

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project successfully deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  const id = Number(params.id);
  const data = await req.json();

  try {
    const updated = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
