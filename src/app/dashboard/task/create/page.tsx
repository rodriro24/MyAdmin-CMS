"use client";
import {
  Button,
  Container,
  TextField,
  Flex,
  Heading,
  TextArea,
  Card,
} from "@radix-ui/themes";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const Page = () => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { control } = useForm();
  const [requested, setRequested] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequested(true);
    const task = {
      title,
      content
    }
    // console.log(task)
    try {
      const res = await axios.post('/api/projects', task)
      // console.log(res)
      if (res.status === 201) {
        // alert('Task saved')
        setTitle('');
        setContent('');
        router.push('/dashboard') //opcional, redirecciona al panel
      }

    } catch (error) {
      console.error(error)
    } finally {
      setRequested(false);
    }
  }

  return (
    <Container className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={onSubmit}>
        <Card size={"3"} >
          <Flex direction="column" gap="5">
            <ArrowLeft color="lightblue" onClick={() => redirect('/dashboard')} />
            <Heading>
              New Project
            </Heading>
            <div className="relative mb-2">
              <Controller control={ control } name='title' render={({field}) => {
                return (
                  <TextField.Root
                    id="title"
                    value={title}
                    onFocus={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                    onChange={(e) => setTitle(e.target.value)}
                    className="pt-5"
                  />
                )
              }}/>
              <label
                htmlFor="title"
                className={`absolute text-gray-500 transition-all duration-300 ${
                  titleFocused || title
                    ? "-top-5.5 left-1 text-sm text-blue-600"
                    : "top-1 left-3 text-base text-gray-400"
                }`}
              >
                Title
              </label>
            </div>

            <div className="relative">
              <Controller control={ control } name="content" render={({field}) => {
                return (
                  <TextArea
                    id="content"
                    value={content}
                    onFocus={() => setContentFocused(true)}
                    onBlur={() => setContentFocused(false)}
                    onChange={(e) => setContent(e.target.value)}
                    className="pt-5 w-full"
                    size="2"
                  />
                )
              }} />
              <label
                htmlFor="content"
                className={`absolute text-gray-500 transition-all duration-200 ${
                  contentFocused || content
                    ? "-top-5.5 left-1 text-sm text-blue-600"
                    : "top-2 left-3 text-base text-gray-400"
                }`}
              >
                Content
              </label>
            </div>
            <Button className="mt-4" loading={requested}>Save Project</Button>
          </Flex>
        </Card>

        
      </form>
    </Container>
  );
};

export default Page;
