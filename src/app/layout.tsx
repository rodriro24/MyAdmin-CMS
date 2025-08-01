import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import NavBar from "@/components/NavBar";
import ContextProvider from "@/context/GlobalContext";

export const metadata = {
  title: "MyAdmin CMS | Home Page ",
  description: "MyAdmin es un CMS fullstack creado por Rodd que te permite gestionar proyectos, usuarios y datos desde un panel moderno, rápido y flexible.",
  keywords: [
    "CMS",
    "Dashboard",
    "Next.js",
    "Gestión de proyectos",
    "Admin panel",
    "Prisma",
    "Tailwind",
    "Radix UI",
    "MyAdmin",
    "Rodd Portfolio",
    "Rodrigo Portfolio",
    "Rodrigo Rolon Portfolio",
    "Rodrigo Rolon",
  ],
  authors: [{ name: "Rodrigo Rolón", url: "https://tu-portfolio.com" }],
  creator: "Rodrigo Rolón",
  metadataBase: new URL("https://myadmin.vercel.app"), // Reemplaza con tu URL final
  openGraph: {
    title: "MyAdmin | CMS moderno para gestionar tus proyectos",
    description:
      "Creado por Rodd, este CMS MVP ya funcional permite centralizar la gestión de datos de forma clara y potente.",
    url: "https://myadmin.vercel.app", //aca va la url
    siteName: "MyAdmin",
    images: [
      {
        url: "https://myadmin.vercel.app/og-image.png", // Asegúrate de tener una imagen en public/
        width: 1200,
        height: 630,
        alt: "Vista previa del panel de MyAdmin",
      },
    ],
    locale: "es_PY",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Theme appearance="dark">
          <ContextProvider>
            <NavBar />
            {children}
          </ContextProvider>
        </Theme>
      </body>
    </html>
  );
}
