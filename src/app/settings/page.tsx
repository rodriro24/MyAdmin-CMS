"use client";
import { CopyIcon, InfoCircledIcon, ReloadIcon ,CheckIcon} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Callout,
  Code,
  Container,
  DataList,
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ArrowUpIcon } from "lucide-react";

const Settings = () => {
  const { data: session } = useSession();
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState(false);

  //esto verifica cada vez que entra si tiene ya una apikey
  useEffect(() => {
    const getApiKey = async () => {
      try {
        const res = await axios.get("/api/auth/user");
        setApiKey(res.data.apiKey);
      } catch (e) {
        console.error("Something went wrong getting the apikey", e);
      }
    };
    getApiKey();
  }, []);

  //esto solicita una apikey nueva
  const handleRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/apikey");
      if (res?.status === 201) {
        setApiKey(res.data.apiKey);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //esto copia en el portapapeles la clave
  const copyToClipboard = async () => {
    if (!apiKey) return;

    await navigator.clipboard.writeText(apiKey);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000); // vuelve al ícono original luego de 1 segundo
  };

  const [copied, setCopied] = useState(false);

  return (
    <Container className="h-[calc(100vh-4rem)] pt-16 px-4">
      <Flex direction={"column"}>
        <section className="w-full flex flex-col mx-auto max-w-200">
          {/* HEADER */}
          <Heading>SETTINGS</Heading>

          <Separator size={"4"} className="my-3" />

          {/* <Text>Manege your personal Api Key</Text> */}

          {/* DATA LIST AND STATUS */}
          <Callout.Root mt={"4"}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              This will issue you a personal apikey, wich it will let you
              consume within other projects to manage your portofolio´s projects
              section as an CMS, keep this key private.
            </Callout.Text>
          </Callout.Root>
        </section>

        <Section className="w-full flex flex-col mx-auto max-w-200 -mt-5">
          <DataList.Root>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Status</DataList.Label>
              <DataList.Value>
                <Badge
                  color={apiKey ? "jade" : "red"}
                  variant="soft"
                  radius="full"
                >
                  {!apiKey ? "Unmanaged" : "Issued"}
                </Badge>
              </DataList.Value>
            </DataList.Item>

            {apiKey && (
              <DataList.Item>
      <DataList.Label minWidth="88px">Key</DataList.Label>
      <DataList.Value>
        <Flex align="center" gap="2">
          <Code variant="ghost">{apiKey || "xxxxxxxx"}</Code>
          <IconButton
            size="1"
            aria-label="Copy value"
            color={copied ? "green" : "gray"}
            variant="ghost"
            onClick={copyToClipboard}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </IconButton>
        </Flex>
      </DataList.Value>
    </DataList.Item>
            )}

            <DataList.Item>
              <DataList.Label minWidth="88px">Name</DataList.Label>
              <DataList.Value>
                {session?.user?.name || "unknown"}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Email</DataList.Label>
              <DataList.Value>
                {session?.user?.email || "unknown"}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <div className="mt-6">
            <Button onClick={handleRequest} loading={loading}>
              {" "}
              {apiKey ? (
                <>
                  <ReloadIcon /> Change key
                </>
              ) : (
                <>
                  <ArrowUpIcon />
                  Request
                </>
              )}{" "}
            </Button>
          </div>
        </Section>
      </Flex>
    </Container>
  );
};

export default Settings;
