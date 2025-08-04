"use client";
import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Container,
  Strong,
} from "@radix-ui/themes";

import { TechnologiesSection } from "@/components/LandingPage/TechnologiesPage";
import ExtraInfo from "@/components/LandingPage/ExtraInfo";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        className="h-screen px-6 text-center"
      >
        <Heading size="6" color="red" mb="2">
          No disponible en móviles
        </Heading>
        <Text color="gray">
          Este proyecto está optimizado para pantallas de escritorio. Pronto
          estará disponible también en dispositivos móviles.
        </Text>
      </Flex>
    );
  }

  return (
    <Container className="flex items-center justify-center pt-10">
      <Flex
        direction="column"
        align="center"
        gap="5"
        className="max-w-5xl mx-auto text-center"
      >
        <Heading size="8">MyAdmin</Heading>
        <Flex>
          <Text size="3" color="gray">
            MyAdmin es un proyecto personal desarrollado por Rodd, diseñado como
            un CMS Sistema de Gestión de Contenidos ligero, privado y enfocado a
            desarrolladores y creadores que buscan centralizar y gestionar sus
            proyectos de manera segura, sencilla y eficiente. Esta plataforma
            permite crear, editar y eliminar proyectos, y generar una API Key
            única que habilita la integración con otras aplicaciones o sitios
            externos. Todo desde una interfaz web moderna, rápida y en constante
            evolución. Aunque actualmente se encuentra en su versión MVP, el
            enfoque de MyAdmin es ofrecer un entorno de control personalizable
            que prioriza la seguridad, la simplicidad y la escalabilidad.
            Desarrollado con tecnologías modernas como Next.js, Prisma y Radix
            UI, MyAdmin representa una solución personal pero poderosa para
            quienes desean tener control total sobre sus datos y desarrollos.{" "}
            <br />
            <Strong>
              Actualmente está optimizado para escritorios. La versión móvil se
              encuentra en desarrollo.
            </Strong>
          </Text>
        </Flex>

        <div className="flex gap-x-7">
          <TechnologiesSection />
          <ExtraInfo />
        </div>
      </Flex>
    </Container>
  );
}
