"use client";
import "@radix-ui/themes/styles.css";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    nick: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setUserTaken(false);
  };
  const [requested, setRequested] = useState(false);
  const [userTaken, setUserTaken] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
    try {
      const res = await axios.post("/api/auth/register", form);
      if (res.status === 201) {
      const { email, password } = form;
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (!result?.ok) {
        setRequested(false);
        return;
      }
      router.push('/dashboard')
    }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          setRequested(false);
          setUserTaken(true);
        };
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="3" className="mx-auto" width="300px">
        <label htmlFor="name">Name</label>
        <TextField.Root
          id="name"
          name="name"
          placeholder="Your name"
          type="text"
          value={form.name}
          onChange={handleChange}
          autoFocus
        >
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="lastname">Lastname</label>
        <TextField.Root
          id="lastname"
          name="lastname"
          placeholder="Your lastname"
          type="text"
          value={form.lastname}
          onChange={handleChange}
        >
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="nick">Nick</label>
        <TextField.Root
          id="nick"
          name="nick"
          placeholder="Type a nick"
          type="text"
          value={form.nick}
          onChange={handleChange}
        >
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <label htmlFor="email">Email</label>
        <TextField.Root
          id="email"
          name="email"
          placeholder="email@domain.com"
          type="email"
          value={form.email}
          onChange={handleChange}
        >
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        {
          userTaken && (
            <small className="text-right -mt-2 text-red-400">Email already taken</small>
          )
        }

        <label htmlFor="password">Password</label>
        <TextField.Root
          id="password"
          name="password"
          placeholder="Your password"
          type="password"
          value={form.password}
          onChange={handleChange}
        >
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        

        <Button color="blue" type="submit" loading={requested}>
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;
