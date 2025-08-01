import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request, { params }: { params: any }) {
  const id = Number(params.id);

  try {
    const res = await prisma.project.findUnique({ where: { id } });
    if (!res) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: any }) {
  const id = Number(params.id);

  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project successfully deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request, { params }: { params: any }) {
  const id = Number(params.id);
  const data = await request.json();

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
