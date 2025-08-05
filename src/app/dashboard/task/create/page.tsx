"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
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
import { ArrowLeft, Plus } from "lucide-react";
import Image from "next/image";
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
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequested(true);

    try {
      // Primero subir imágenes y obtener URLs
      const mediaUrls =
        mediaFiles.length > 0 ? await sendMedia(mediaFiles) : [];

      // Luego enviar resto de datos junto con el array de URLs
      const payload = {
        title,
        content,
        media: mediaUrls, // el array de URLs para guardar en prisma
      };

      const res = await axios.post("/api/projects", payload);
      if (res.status === 201) {
        setTitle("");
        setContent("");
        setMediaFiles([]);
        setMediaPreviews([]);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRequested(false);
    }
  };

  const sendMedia = async (files: File[]): Promise<string[]> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary configuration is missing in environment variables."
      );
    }

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      return res.data.secure_url as string;
    });

    return Promise.all(uploadPromises);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    const selectedPreviews = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      return url;
    });

    setMediaFiles((prev) => [...prev, ...selectedFiles]);
    setMediaPreviews((prev) => [...prev, ...selectedPreviews]);
  };

  // Al remover una imagen también limpiá el object URL:
  const removeImage = (index: number) => {
    URL.revokeObjectURL(mediaPreviews[index]);
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container className="h-[calc(100vh-4rem)] flex items-center justify-center">
      <form className="space-y-6 max-w-xl mx-auto" onSubmit={onSubmit}>
        <Card size={"3"}>
          <Flex direction="column" gap="5">
            <ArrowLeft
              color="lightblue"
              onClick={() => redirect("/dashboard")}
            />
            <Heading>New Project</Heading>
            <div className="relative mb-2">
              <Controller
                control={control}
                name="title"
                render={() => {
                  return (
                    <TextField.Root
                      id="title"
                      value={title}
                      onFocus={() => setTitleFocused(true)}
                      onBlur={() => setTitleFocused(false)}
                      onChange={(e) => setTitle(e.target.value)}
                      className="pt-5"
                    />
                  );
                }}
              />
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
              <Controller
                control={control}
                name="content"
                render={() => {
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
                  );
                }}
              />
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

            <div>
              <input
                type="file"
                multiple
                accept=".png, .jpg, .jpeg, .webp"
                id="image-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Plus size={"20px"} />Add Images
              </Button>

              <div className="flex flex-wrap gap-3 mt-3 justify-center">
                {mediaPreviews.map((src, i) => {
                  const isCompact = mediaPreviews.length > 3;
                  const sizeClass = isCompact ? "size-30" : "size-40";

                  return (
                    <div
                      key={i}
                      className={`relative rounded overflow-hidden ${sizeClass}`}
                    >
                      <Image
                        src={src}
                        alt={`New preview ${i}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 text-white rounded-full p-1 text-xs bg-blue-600 cursor-pointer"
                        aria-label="Remove image"
                      >
                        <Cross1Icon color="white" width={"15"} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button className="mt-4" loading={requested}>
              Save Project
            </Button>
          </Flex>
        </Card>
      </form>
    </Container>
  );
};

export default Page;
