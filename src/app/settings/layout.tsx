import { ReactNode } from "react";

export const metadata = {
  title: "MyAdmin CMS | Settings",
  description: "Configura tu cuenta, gestiona tus datos personales y ajusta tu experiencia dentro del CMS MyAdmin creado por Rodd.",
  keywords: [
    "Configuración",
    "Ajustes",
    "Cuenta",
    "Perfil",
    "CMS",
    "Panel de usuario",
    "Next.js",
    "MyAdmin",
    "Rodrigo Rolón",
    "Rodd Portfolio",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"),
  openGraph: {
    title: "Ajustes de cuenta | MyAdmin CMS",
    description:
      "Editá tu información personal, cambiá tu clave o ajustá la visibilidad de tus proyectos desde este panel de configuración.",
    url: "https://myadmin.vercel.app/settings",
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vista previa de ajustes de cuenta en MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function Settings({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}