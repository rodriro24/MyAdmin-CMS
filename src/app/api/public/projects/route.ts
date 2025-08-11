import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || "*";

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return new NextResponse(JSON.stringify({ error: "API key missing" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Content-Type": "application/json",
      },
    });
  }

  // Simula proyectos por apiKey (esto lo debes reemplazar con lógica real)
  const user = await prisma.user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  const projects = await prisma.project.findMany({
  where: {
    userId: user.id,
    showable: true,
  },
});


const sanitizedProjects = projects.map(({ userId, id, showable, ...rest }) => rest);


  return new NextResponse(JSON.stringify(sanitizedProjects), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Content-Type": "application/json",
    },
  });
}

// Opcional: maneja OPTIONS para preflight requests CORS
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  });
}
