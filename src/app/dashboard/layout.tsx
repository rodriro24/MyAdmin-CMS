import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Dashboard",
  description: "Visualiza y gestiona todos tus proyectos y datos desde el dashboard principal de MyAdmin, un CMS moderno y eficiente creado por Rodd.",
  keywords: [
    "Dashboard",
    "Panel de control",
    "CMS",
    "Next.js",
    "Gestión de proyectos",
    "Admin Panel",
    "Prisma",
    "Tailwind",
    "Radix UI",
    "MyAdmin",
    "Rodrigo Rolón",
    "Rodd Portfolio",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"),
  openGraph: {
    title: "Panel principal | MyAdmin CMS",
    description:
      "Desde este dashboard centralizado podés gestionar todos tus proyectos, usuarios y más, con una interfaz clara, potente y veloz.",
    url: "https://myadmin.vercel.app/dashboard",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vista previa del panel principal de MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};




export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}