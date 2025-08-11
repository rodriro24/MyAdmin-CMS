"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Heading,
  IconButton,
  Separator,
  Skeleton,
  Text,
  Select,
} from "@radix-ui/themes";
import axios from "axios";
import { ArrowLeft, BookmarkIcon, Plus } from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type BackendLinks = {
  deploy?: { url: string };
  github?: { url: string };
  other?: Record<string, string>;
};

type Link = {
  platform: "deploy" | "github" | "other";
  url: string;
  customName?: string;
};

export default function ProjectPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [content, setContent] = useState("");
  const [showable, setShowable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [defaultData, setDefaultData] = useState<{
    title: string;
    content: string;
    showable: boolean;
    links: Link[] ;
  }>({ title: "", content: "", showable: false, links: [] });

  const [defaultMedia, setDefaultMedia] = useState<string[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [newMediaFiles, setNewMediaFiles] = useState<File[]>([]);
  const [newMediaPreviews, setNewMediaPreviews] = useState<string[]>([]);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(true);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        const { title, content, showable, media, links } = res.data;

        const loadedLinks: Link[] = [];

        if (links && typeof links === "object") {
          const backendLinks = links as BackendLinks;

          if (backendLinks.deploy?.url) {
            loadedLinks.push({
              platform: "deploy",
              url: backendLinks.deploy.url,
            });
          }

          if (backendLinks.github?.url) {
            loadedLinks.push({
              platform: "github",
              url: backendLinks.github.url,
            });
          }

          if (backendLinks.other) {
            for (const [customName, url] of Object.entries(
              backendLinks.other
            )) {
              loadedLinks.push({ platform: "other", url, customName });
            }
          }
        }

        if (loadedLinks.length === 0) {
          loadedLinks.push({ platform: "deploy", url: "" });
        }

        setLinks(loadedLinks);
        setTitle(title);
        setContent(content);
        setShowable(showable);
        setMediaUrls(media || []);
        setDefaultMedia(media || []);
        setDefaultData({ title, content, showable, links: loadedLinks });
        setIsLoadingPreviews(false);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    getProject();
  }, [id]);

  const mediaChanged = () => {
    if (newMediaFiles.length > 0) return true;
    if (mediaUrls.length !== defaultMedia.length) return true;
    return mediaUrls.some((url, i) => url !== defaultMedia[i]);
  };

  const linksChanged = () => {
    if (Array.isArray(links) && links.length !== defaultData.links.length)
      return true;

    if (Array.isArray(links)) {
      for (let i = 0; i < links.length; i++) {
        if (
          links[i].platform !== defaultData.links[i]?.platform ||
          links[i].url !== defaultData.links[i]?.url ||
          links[i].customName !== defaultData.links[i]?.customName
        ) {
          return true;  
        }
      }
    }
    return false;
  };

  const formatLinksForBackend = (links: Link[]): BackendLinks => {
    const result: BackendLinks = {};
    links.forEach((link) => {
      if (link.platform === "deploy") {
        result.deploy = { url: link.url };
      } else if (link.platform === "github") {
        result.github = { url: link.url };
      } else if (link.platform === "other" && link.customName) {
        if (!result.other) result.other = {};
        result.other[link.customName] = link.url;
      }
    });
    return result;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let uploadedUrls: string[] = [];

      if (newMediaFiles.length > 0) {
        uploadedUrls = await sendMedia(newMediaFiles);
      }

      const allMediaUrls = [...mediaUrls, ...uploadedUrls];

      const res = await axios.put(`/api/projects/${id}`, {
        title,
        content,
        showable,
        media: allMediaUrls,
        links: formatLinksForBackend(links),
      });

      if (res.status === 200) {
        setDefaultData({ title, content, showable, links });
        setMediaUrls(allMediaUrls);
        setNewMediaFiles([]);
        setNewMediaPreviews([]);
        setDefaultMedia(allMediaUrls);
        toast.success("Changes saved!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsLoadingPreviews(true);
    setNewMediaFiles(files);
    setNewMediaPreviews([]);

    Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    ).then((previews) => {
      setNewMediaPreviews(previews);
      setIsLoadingPreviews(false);
    });
  };

  const removeSavedImage = (index: number) => {
    setMediaUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setNewMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const sendMedia = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset!);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return res.data.secure_url;
    });

    return Promise.all(uploadPromises);
  };

  const handleLinkChange = (
    index: number,
    field: "platform" | "url" | "customName",
    value: string
  ) => {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks[index] = { ...newLinks[index], [field]: value };
      if (field === "platform" && value !== "other") {
        delete newLinks[index].customName;
      }
      return newLinks;
    });
  };

  const addNewLink = () => {
    setLinks((prev) => [...prev, { platform: "deploy", url: "" }]);
  };

  const removeLink = (index: number) => {
    if (index === 0) return;
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const platformOptions = [
    { value: "deploy", label: "Direct" },
    { value: "github", label: "GitHub" },
    { value: "other", label: "Other" },
  ];

  return (
    <Container className="h-[calc(100vh-4rem)] pt-10 px-4">
      <Toaster />
      <form onSubmit={handleSave} className="max-w-3xl mx-auto mb-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl py-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <ArrowLeft
              color="lightblue"
              onClick={() => redirect("/dashboard")}
            />
            <Heading>Edit Project</Heading>
            {title && content && (
              <Badge
                color={defaultData.showable ? "green" : "red"}
                size={"1"}
                className="rounded-2xl"
              >
                {defaultData.showable ? "Active" : "Inactive"}
              </Badge>
            )}
          </div>
          <Text as="label" size="2">
            <Flex gap="2" align="center">
              Display into portfolio
              <Checkbox
                checked={showable}
                onClick={() => setShowable((prev) => !prev)}
              />
            </Flex>
          </Text>
        </div>

        <Card className="max-w-3xl w-full mx-auto p-6 shadow-md rounded-2xl min-h-[500px] mt-2">
          <Flex direction="column" gap="5" align="center">
            {/* Title */}
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

            {/* Content */}
            {!content ? (
              <Text>
                <Skeleton>
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
                className="w-full min-h-[120px] resize-none text-base bg-transparent outline-none"
                placeholder="Project content"
              />
            )}

            <Separator size={"4"} />

            {/* Links */}
            {links.length >= 1 ? (
              <div className="w-full">
                <Text weight="medium" size="4">
                  Project Links
                </Text>

                {links.map((link, i) => (
                  <Flex key={i} gap="3" align="center" className="my-3">
                    <Select.Root
                      value={link.platform}
                      onValueChange={(val) =>
                        handleLinkChange(i, "platform", val)
                      }
                    >
                      <Select.Trigger aria-label="Platform select" />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Platforms</Select.Label>
                          {platformOptions.map(({ value, label }) => (
                            <Select.Item key={value} value={value}>
                              {label}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>

                    {link.platform === "other" && (
                      <input
                        type="text"
                        placeholder="Custom name"
                        value={link.customName || ""}
                        onChange={(e) =>
                          handleLinkChange(i, "customName", e.target.value)
                        }
                        className="flex-1 px-2 py-1 rounded border border-gray-500 outline-none text-sm"
                      />
                    )}

                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(i, "url", e.target.value)
                      }
                      className="flex-1 px-2 py-1 rounded border border-gray-500 outline-none text-sm"
                      required
                    />

                    {i === 0 && (
                      <IconButton
                        radius="full"
                        type="button"
                        onClick={addNewLink}
                        className="ml-auto"
                      >
                        <Plus size={20} />
                      </IconButton>
                    )}

                    {i > 0 && (
                      <IconButton
                        radius="full"
                        type="button"
                        onClick={() => removeLink(i)}
                        className="ml-2"
                      >
                        <Cross1Icon width={15} />
                      </IconButton>
                    )}
                  </Flex>
                ))}
              </div>
            ) : (
              <Text>
                <Skeleton>
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </Skeleton>
              </Text>
            )}

            <Separator size={"4"} />

            {/* Media */}
            {/* preview de las imagenes */}
            <div className="w-full min-h-[90px]">
              <input
                type="file"
                id="image-upload"
                accept=".png, .jpg, .jpeg, .webp"
                multiple
                className="hidden"
                onChange={handleNewFilesChange}
              />

              {isLoadingPreviews ? (
                <Flex gap="3" justify={"center"}>
                  <Skeleton width={"160px"} height={"160px"} />
                  <Skeleton width={"160px"} height={"160px"} />
                  <Skeleton width={"160px"} height={"160px"} />
                  <Skeleton width={"160px"} height={"160px"} />
                </Flex>
              ) : mediaUrls.length === 0 && newMediaPreviews.length === 0 ? (
                <>
                  <IconButton
                    radius="full"
                    className="rounded-full flex items-center justify-center"
                    type="button"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <Plus size={"20px"} />
                  </IconButton>
                  <Text
                    align="center"
                    className="mt-4 text-gray-500 flex justify-center py-15"
                  >
                    No images to preview.
                  </Text>
                </>
              ) : (
                // Mostrar imágenes reales
                <>
                  <IconButton
                    radius="full"
                    className="rounded-full flex items-center justify-center"
                    type="button"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <Plus size={"20px"} />
                  </IconButton>
                  <Flex
                    wrap="wrap"
                    gap="3"
                    justify={"center"}
                    className="-mt-4"
                  >
                    {/* Imágenes guardadas */}
                    {mediaUrls.map((url, i) => (
                      <div
                        key={`saved-${i}`}
                        className="relative rounded overflow-hidden size-40"
                      >
                        <Image
                          src={url}
                          alt={`Saved image ${i}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeSavedImage(i)}
                          className="absolute top-1 right-1 text-white rounded-full p-1 text-xs bg-blue-600 cursor-pointer"
                          aria-label="Remove image"
                        >
                          <Cross1Icon color="white" width={"15"} />
                        </button>
                      </div>
                    ))}

                    {/* Previews nuevas imágenes */}
                    {newMediaPreviews.map((src, i) => (
                      <div
                        key={`new-${i}`}
                        className="relative rounded overflow-hidden size-40"
                      >
                        <Image
                          src={src}
                          alt={`New preview ${i}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute top-1 right-1 text-white rounded-full p-1 text-xs bg-blue-600 cursor-pointer"
                          aria-label="Remove image"
                        >
                          <Cross1Icon color="white" width={"15"} />
                        </button>
                      </div>
                    ))}
                  </Flex>
                </>
              )}
            </div>

            {/* Buttons */}
            {title && content && (
              <Flex justify="end" className="w-full gap-x-2 pt-3">
                <Button
                  type="reset"
                  variant="surface"
                  onClick={() => {
                    setTitle(defaultData.title);
                    setContent(defaultData.content);
                    setMediaUrls(defaultMedia);
                    setShowable(defaultData.showable);
                    setLinks(defaultData.links);
                  }}
                  disabled={
                    (defaultData.title === title &&
                      defaultData.content === content &&
                      defaultData.showable === showable &&
                      !mediaChanged() &&
                      !linksChanged()) ||
                    isSaving
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
                    defaultData.showable === showable &&
                    !mediaChanged() &&
                    !linksChanged()
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
