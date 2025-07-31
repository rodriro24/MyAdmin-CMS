"use client";

import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false); // solo para el botón
  const [defaultData, setDefaultData] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        const { title, content } = res.data;

        setTitle(title);
        setContent(content);
        setDefaultData({ title, content }); // ahora sí, bien
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
      });
      if (res.status === 200) {
        setDefaultData({
          title,
          content,
        });
        toast.success("Changes saved!", {
          style: {
            border: "1px solid #2596be",
            padding: "10px",
            color: "#fff",
            background: '#555',
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
    <Container className="h-[calc(100vh-4rem)] pt-16 px-4">
      <Toaster />
      <form onSubmit={handleSave} className="">
        <Card className="max-w-3xl w-full mx-auto p-6 shadow-md rounded-2xl min-h-[500px]">
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
                  consectetur adipisicing elit Lorem ipsum dolor sit amet Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit Lorem ipsum
                  dolor sit amet Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit Lorem ipsum dolor sit amet Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit Lorem ipsum dolor sit
                  amet Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  Lorem ipsum dolor sit amet Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit Lorem ipsum dolor sit amet Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit Lorem ipsum
                  dolor sit amet Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit Lorem ipsum dolor sit amet Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit Lorem ipsum dolor sit
                  amet Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  Lorem ipsum dolor sit amet Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit Lorem ipsum dolor sit amet Lorem
                  ipsum, dolor sit amet
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
                    defaultData.content === content
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
                    defaultData.content === content
                  }
                >
                  Save Changes
                </Button>
              </Flex>
            )}
          </Flex>
        </Card>
      </form>
    </Container>
  );
}
