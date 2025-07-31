import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'


export async function GET(request: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  try {
    const res = await prisma.project.findUnique({
      where: {
        id
      }
    })
    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) { const id = Number(context.params.id);
  
  try {
    const res = await prisma.project.delete({
      where: {
        id
      }
    })
    if (res) {
      return NextResponse.json('Project succesfully deleted from database')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const data = await request.json();
  const id = Number(context.params.id);
  try {
    const changes = await prisma.project.update({
      where: {
        id
      },
      data
    });
    return NextResponse.json(changes, {status: 200})
  } catch (error) {
    console.error(error)
  }
  
}