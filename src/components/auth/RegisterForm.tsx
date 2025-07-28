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

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    nick: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // lógica para registrar
    const res = await axios.post("/api/auth/register", form);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="3" className="my-4 mx-auto" width="300px">
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextField.Root
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Retype your password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        >
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button color="blue" type="submit">
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};

export default RegisterForm;
