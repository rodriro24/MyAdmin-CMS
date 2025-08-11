import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

type Link = {
  deploy?: { url: string };
  github?: { url: string };
  other?: {
    [customPlatform: string]: string;
  };
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const rawLinks = data.links;

    let links: Link = {};
    if (Array.isArray(rawLinks)) {
      console.log("itwasarray");
      links = rawLinks.reduce<Link>(
        (acc, link: { platform: string; url: string }) => {
          if (link.platform === "other") {
            if (!acc.other) acc.other = {};
            acc.other["Custom"] = link.url; // nombre por defecto
          } else if (link.platform === "deploy") {
            acc.deploy = { url: link.url };
          } else if (link.platform === "github") {
            acc.github = { url: link.url };
          }
          return acc;
        },
        {}
      );
    } else if (typeof rawLinks === "string") {
      console.log("its string");
      try {
        const parsed = JSON.parse(rawLinks);

        if (Array.isArray(parsed)) {
          links = parsed.reduce<Link>(
            (acc, link: { platform: string; url: string; customName?: string }) => {
              if (link.platform === "other") {
                if (!acc.other) acc.other = {};
                if (link.customName && link.url) {
                  acc.other[link.customName] = link.url;
                }
              } else if (link.platform === "deploy") {
                acc.deploy = { url: link.url };
              } else if (link.platform === "github") {
                acc.github = { url: link.url };
              }
              return acc;
            },
            {}
          );
        } else {
          console.log("its json");
          links = parsed; // ya es objeto
        }
      } catch {
        links = {};
      }
    } else {
      links = rawLinks || {};
    }

    const newProj = await prisma.project.create({
      data: {
        title: data.title,
        content: data.content,
        media: data.media,
        links,
        user: {
          connect: {
            id: Number(session.user.id),
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
    console.log(error);
  }
}
