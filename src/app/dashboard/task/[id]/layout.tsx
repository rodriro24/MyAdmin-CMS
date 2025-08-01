import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Edit Project",
  description: "Editá los detalles de un proyecto existente: nombre, descripción, estado y más. Gestioná fácilmente su información desde MyAdmin.",
  keywords: [
    "Editar proyecto",
    "Actualizar proyecto",
    "CMS",
    "Gestión de proyectos",
    "Panel administrativo",
    "Next.js",
    "MyAdmin",
    "Rodrigo Rolón",
    "Rodd Portfolio",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"),
  openGraph: {
    title: "Editar proyecto | MyAdmin CMS",
    description:
      "Actualizá fácilmente la información de un proyecto ya creado. Cambiá estados, detalles y accedé a acciones avanzadas.",
    url: "https://myadmin.vercel.app/projects/[id]/edit",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vista previa del editor de proyectos de MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};





export default function Edit({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}