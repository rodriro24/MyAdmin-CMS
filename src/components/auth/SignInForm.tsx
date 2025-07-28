"use client";
import "@radix-ui/themes/styles.css";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Button } from "@radix-ui/themes";
import React, { useState } from "react";

const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form); // acá iría tu lógica de auth
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

        <Button color="blue" type="submit">
          Sign In
        </Button>
      </Flex>
    </form>
  );
};

export default SignInForm;
