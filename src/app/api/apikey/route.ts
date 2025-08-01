import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/libs/prisma';
import crypto from 'crypto';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST() {

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Genera una API key aleatoria
  const apiKey = crypto.randomBytes(32).toString('hex');

  await prisma.user.update({
    where: { id: user.id },
    data: {
      apiKey,
    },
  });

  return NextResponse.json({ apiKey }, {status: 201});


}
