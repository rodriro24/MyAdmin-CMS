import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Create Project",
  description: "Crea un nuevo proyecto dentro de MyAdmin CMS. Rellena los datos necesarios para iniciar la gestión completa desde el dashboard.",
  keywords: [
    "Nuevo proyecto",
    "Crear proyecto",
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
    title: "Nuevo proyecto | MyAdmin CMS",
    description:
      "Comenzá a organizar tus ideas desde cero con el creador de proyectos de MyAdmin. Agregá nombre, descripción, estado y más.",
    url: "https://myadmin.vercel.app/projects/new",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Formulario de creación de nuevo proyecto en MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};



export default function Create({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}