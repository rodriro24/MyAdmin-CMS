import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Register",
  description: "Regístrate en MyAdmin, el CMS fullstack creado por Rodd para gestionar datos y proyectos desde un panel intuitivo y eficiente.",
  keywords: [
    "Registro",
    "Crear cuenta",
    "Sign up",
    "CMS",
    "Next.js",
    "Panel de control",
    "MyAdmin",
    "Rodd Portfolio",
    "Rodrigo Rolón",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"),
  openGraph: {
    title: "Crea tu cuenta en MyAdmin",
    description: "Únete a la plataforma y gestiona tus proyectos con un CMS moderno, construido con tecnologías como Next.js y Prisma.",
    url: "https://myadmin.vercel.app/register",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vista previa del registro en MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};



export default function SingUp({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
