"use client";
import "@radix-ui/themes/styles.css";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { status } = useSession(); // Obtener el estado de la sesión
  const [requested, setRequested] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Redirigir al dashboard si la sesión está autenticada
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setUnauthorized(false);
    setNotFound(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res?.ok) {
      setRequested(false);
      if (res?.error?.toLowerCase() === "invalid credentials") {
        setUnauthorized(true);
      }
      if (res?.error?.toLowerCase() === "user not found") {
        setNotFound(true);
      }
    } else {
      setRequested(false);
      // No necesitas router.push aquí porque useEffect manejará la redirección
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Flex direction="column" gap="3" className="my-4 mx-auto" width="300px">
        <label htmlFor="email">Email</label>
        <TextField.Root
          id="email"
          name="email"
          placeholder="email@domain.com"
          type="email"
          autoFocus
          value={form.email}
          onChange={handleChange}
        >
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="password">Password</label>
        <TextField.Root
          id="password"
          name="password"
          placeholder="*******"
          type="password"
          value={form.password}
          onChange={handleChange}
        >
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {unauthorized && (
          <small className="text-red-500 text-center">Wrong credentials</small>
        )}
        {notFound && (
          <small className="text-red-500 text-center">User not found</small>
        )}

        <Button color="blue" type="submit" disabled={requested}>
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default SignInForm;