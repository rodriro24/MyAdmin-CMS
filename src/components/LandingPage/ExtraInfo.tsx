import { Flex, Button as RadixButton, Text } from "@radix-ui/themes";
import React from "react";
import { RocketIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ExtraInfo = () => {
  const router = useRouter();
  return (
    <Flex direction="column" align="center"  gap="5" className="text-left">
      <Text color="gray" size="2" className="w-full text-center" weight={'medium'}>
        Características:
      </Text>
      <ul className="list-disc list-inside text-sm text-muted-foreground">
        <li>Gestión de proyectos (crear, editar, eliminar, mostrar, ocultar)</li>
        <li>API Key personal para consumir desde otras apps</li>
        <li>En desarrollo </li>
      </ul>
      <RadixButton
        radius="large"
        size="3"
        onClick={() => router.push("/dashboard")}
      >
        <RocketIcon className="w-4 h-4 mr-2" /> Iniciar ahora
      </RadixButton>
    </Flex>
  );
};

export default ExtraInfo;
