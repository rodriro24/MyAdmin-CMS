"use client";
import {
  Container,
  Flex,
  Link,
  Text,
  DropdownMenu,
  Button,
  Heading,
} from "@radix-ui/themes";
import NavLink from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  Settings,
  LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";


const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className="bg-zinc-950">
      <Container>
        <Flex
          justify="between"
          align={"center"}
          className="max-w-4/5 px-3 py-4 mx-auto"
        >
          <NavLink href={"/"}>
            {/* <Text className="text-xl font-extrabold ">RadixNext</Text> */}
            <Heading>MyAdmin</Heading>
          </NavLink>

          <ul className="flex flex-row gap-x-4 text-cyan-700 items-center">
            <li className="cursor-pointer">
              <Link asChild>
                <NavLink href={"/dashboard"}>
                  <Text>Dashboard</Text>
                </NavLink>
              </Link>
            </li>

            {!session && (
              <>
                <li className="cursor-pointer">
              <Link asChild>
                <NavLink href={"/auth/login"}>
                  <Text>Log In</Text>
                </NavLink>
              </Link>
            </li>

            <li className="cursor-pointer">
              <Link asChild>
                <NavLink href={"/auth/register"}>
                  <Text>Register</Text>
                </NavLink>
              </Link>
            </li>
              </>
            )}

            {session && (
              <>
                <li>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft">
                    {session?.user?.name}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Item><User className="w-4 h-4 mr-2" />Profile</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => router.push('/settings')}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenu.Item>

                  <DropdownMenu.Separator />

                  {/* <DropdownMenu.Item><LayoutDashboard className="w-4 h-4 mr-2" />Manage Account</DropdownMenu.Item>
                  <DropdownMenu.Separator /> */}
                  <DropdownMenu.Item color="red" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </li>
              </>
            )}

          </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
