"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  Grid,
} from "@radix-ui/themes";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPrisma,
  SiVercel,
  SiRadixui,
} from "react-icons/si";

const techs = [
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },
  { name: "React", icon: <SiReact size={40} color="#61DAFB" /> },
  { name: "Tailwind", icon: <SiTailwindcss size={40} color="#38BDF8" /> },
  { name: "Prisma", icon: <SiPrisma size={40} color="#0C344B" /> },
  { name: "Vercel", icon: <SiVercel size={40} /> },
  { name: "Radix UI", icon: <SiRadixui size={40} color="#000000" /> },
];

export const TechnologiesSection = () => {
  return (
    <Box px="5" py="7" style={{ backgroundColor: "var(--gray-a2)" }} className="max-w-2xl">
      <Flex direction="column" align="center" gap="2">
        <Heading size="5">Tecnologías utilizadas</Heading>
        <Text size="3" align="center" >
          MyAdmin fue desarrollado utilizando herramientas modernas del ecosistema web para garantizar un desarrollo rápido, diseño modular y buena experiencia de usuario.
        </Text>

        <Grid
          columns={{ initial: "2", sm: "3", md: "6" }}
          gap="4"
          mt="4"
          justify="center"
        >
          {techs.map((tech) => (
            <Card key={tech.name} size="1" variant="classic" >
              <Flex direction="column" align="center" gap="2">
                {tech.icon}
                <Text size="1" weight="medium">
                  {tech.name}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};
