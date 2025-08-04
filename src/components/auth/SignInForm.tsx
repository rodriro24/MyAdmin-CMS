"use client";
import "@radix-ui/themes/styles.css";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [requested, setRequested] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setUnauthorized(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setRequested(true);
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })
    if (!res?.ok) {
      setRequested(false);
      if ((res?.error?.toLocaleLowerCase()) === 'invalid credentials') setUnauthorized(true);
      if((res?.error?.toLocaleLowerCase()) === 'user not found') setNotFound(true);
    }
    router.push('/dashboard')
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <Flex direction="column" gap="3" className="my-4 mx-auto" width="300px">
        <label htmlFor="email">Email</label>
        <TextField.Root id="email"
            name="email"
            placeholder="email@domain.com"
            type="email"
            autoFocus
            value={form.email}
            onChange={handleChange}>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="password">Password</label>
        <TextField.Root id="password"
            name="password"
            placeholder="*******"
            type="password"
            value={form.password}
            onChange={handleChange}>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {
          unauthorized && (
            <small className="text-red-500 text-center">Wrong credentials</small>
          )
        }
        {
          notFound && (
            <small className="text-red-500 text-center">User not found</small>
          )
        }

        <Button color="blue" type="submit" loading={requested}>
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default SignInForm;
