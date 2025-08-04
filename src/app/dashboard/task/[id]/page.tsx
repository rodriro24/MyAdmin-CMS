"use client";

import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { ArrowLeft, BookmarkIcon } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProjectPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showable, setShowable] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // solo para el botón
  const [defaultData, setDefaultData] = useState<{
    title: string;
    content: string;
    showable: boolean;
  }>({ title: "", content: "", showable: false });

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        const { title, content, showable } = res.data;
        console.log(res.data);

        setTitle(title);
        setContent(content);
        setShowable(showable);
        setDefaultData({ title, content, showable }); // ahora sí, bien
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    getProject();
  }, [id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axios.put(`/api/projects/${id}`, {
        title,
        content,
        showable
      });
      if (res.status === 200) {
        setDefaultData({
          title,
          content,
          showable,
        });
        toast.success("Changes saved!", {
          style: {
            border: "1px solid #2596be",
            padding: "10px",
            color: "#fff",
            background: "#555",
          },
          iconTheme: {
            primary: "#2596be",
            secondary: "#FFFAEE",
          },
        });
      }
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container className="h-[calc(100vh-4rem)] pt-10 px-4">
      <Toaster />
      <form onSubmit={handleSave}>
        <div className="mx-auto max-w-3xl py-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <ArrowLeft color="lightblue" onClick={() => redirect('/dashboard')}/>
            <Heading>Edit Project</Heading>
          {(title && content) && (
            <Badge
              color={defaultData.showable ? "green" : "red"}
              size={"1"}
              className="rounded-2xl"
            >
              {defaultData.showable ? "Active" : "Inactive"}
            </Badge>
          )}
          </div>
          <Text as="label" size="2" className="justify-self-end">
            <Flex gap="2">
              Display into porftolio
              <Checkbox checked={ showable } onClick={() => setShowable(prev => !prev)}/>

            </Flex>
          </Text>
        </div>

        <Card className="max-w-3xl w-full mx-auto p-6 shadow-md rounded-2xl min-h-[500px] mt-2">
          <Flex direction="column" gap="5" align="center">
            <Heading size="5" className="w-full text-center pt-2">
              {!title ? (
                <Skeleton>this is the skeleton of the title</Skeleton>
              ) : (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-center text-2xl font-semibold outline-none bg-transparent"
                />
              )}
            </Heading>

            <Separator size="4" />

            {!content ? (
              <Text>
                <Skeleton>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </Skeleton>
              </Text>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[300px] max-h-[450px] resize-none text-base bg-transparent outline-none"
              />
            )}

            {title && content && (
              <Flex justify="end" className="w-full gap-x-2 pt-4">
                <Button
                  type="reset"
                  variant="surface"
                  onClick={() => {
                    setTitle(defaultData.title);
                    setContent(defaultData.content);
                  }}
                  disabled={
                    defaultData.title === title &&
                    defaultData.content === content &&
                    defaultData.showable === showable
                  }
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  loading={isSaving}
                  type="submit"
                  disabled={
                    defaultData.title === title &&
                    defaultData.content === content &&
                    defaultData.showable === showable
                  }
                >
                  <BookmarkIcon size={"20"} /> Save Changes
                </Button>
              </Flex>
            )}
          </Flex>
        </Card>
      </form>
    </Container>
  );
}
