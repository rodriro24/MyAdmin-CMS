import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Sign In",
  description: "Accede a tu cuenta en MyAdmin, el CMS fullstack moderno creado por Rodd para gestionar tus proyectos, usuarios y datos.",
  keywords: [
    "Iniciar sesión",
    "Login",
    "Autenticación",
    "CMS",
    "Next.js",
    "Panel de administración",
    "MyAdmin",
    "Rodrigo Rolón",
    "Rodd Portfolio",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"),
  openGraph: {
    title: "Inicia sesión en MyAdmin",
    description: "Ingresa a tu panel de control personalizado con MyAdmin CMS, creado por Rodd.",
    url: "https://myadmin.vercel.app/login",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vista previa del login de MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function login({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
