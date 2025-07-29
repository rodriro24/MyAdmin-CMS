import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const data = await request.json();
  const user = {
    name: data.name,
    email: data.email,
    password: await bcrypt.hash(data.password, 10)
  }
  console.log(data)
  const newUser = await prisma.user.create({
    data: user
  })
  return NextResponse.json(newUser, {status: 201})  
}