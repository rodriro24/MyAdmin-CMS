import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// GET /api/projects/[id]
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  try {
    const res = await prisma.project.findUnique({ where: { id } });
    if (!res) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project successfully deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const data = await request.json();

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
