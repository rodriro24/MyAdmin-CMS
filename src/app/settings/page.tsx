"use client";
import {
  CopyIcon,
  InfoCircledIcon,
  ReloadIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Callout,
  Card,
  Code,
  Container,
  DataList,
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Text,
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

          {/* DATA LIST AND STATUS */}
          <Callout.Root mt={"4"}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              This key lets you connect your portfolio to other apps and manage
              your projects remotely—just like a CMS. Treat it like a password:
              keep it safe and don’t share it.
            </Callout.Text>
          </Callout.Root>
        </section>

        <Section className="w-full flex flex-col mx-auto max-w-200 ">
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

        <Section className="w-full flex flex-col mx-auto max-w-200 -mt-15">
          <Text weight="medium" size="4" mb="2">
            How to consume your API
          </Text>

          <Callout.Root role="region" className="mb-4">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              To use your API key, follow these simple steps:
            </Callout.Text>
          </Callout.Root>

          <Text as="p" size="2" color="gray" mb="3">
            Your API key allows you to interact with your personal CMS to fetch
            or manage your projects from other platforms or apps. Here is how to
            use it:
          </Text>

          <Flex direction="column" gap="2" mb="4">
            <Text as="p" size="2">
              <strong className="text-white">1. Get your API key:</strong> Click
              the <Code>Request</Code> button above to generate one.
            </Text>
            <Text as="p" size="2">
              <strong className="text-white">
                2. Use the key in your requests:
              </strong>{" "}
              Send it as a header called <Code>x-api-key</Code> in your API
              calls.
            </Text>
            <Text as="p" size="2">
              <strong className="text-white">3. Call your endpoint:</strong> Use{" "}
              <Code>fetch</Code>, <Code>axios</Code> or any HTTP client to hit
              your API at:{" "}
              <Code>https://myadmin-cms-personal.vercel.app/api/projects</Code>
            </Text>
            <Text as="p" size="2">
              <strong className="text-white">4. Keep it secret:</strong> Never
              expose your key publicly. Store it in environment variables or
              secure configs.
            </Text>
          </Flex>

          <Text weight="medium" mb="2">
            See an example of implementation
          </Text>

          <Card className="bg-[#292D3E] rounded-xl p-4 text-sm font-mono overflow-x-auto whitespace-pre">
            <code>
              <span className="text-[#C792EA]">const</span>{" "}
              <span className="text-[#82AAFF]">API_URL</span> ={" "}
              <span className="text-[#C3E88D]">
                &quot;https://myadmin-cms-personal.vercel.app/api/public/projects&quot;
              </span>
              ;{"\n"}
              <span className="text-[#C792EA]">const</span>{" "}
              <span className="text-[#82AAFF]">API_KEY</span> ={" "}
              <span className="text-[#C3E88D]">
                &quot;your-api-key-here&quot;
              </span>
              ; {/* replace with your actual key */}
              {"\n\n"}
              <span className="text-[#C792EA]">async function</span>{" "}
              <span className="text-[#82AAFF]">fetchProjects</span>() {"{"}
              {"\n  "}
              <span className="text-[#C792EA]">try</span> {"{"}
              {"\n    "}
              <span className="text-[#C792EA]">const</span>{" "}
              <span className="text-[#82AAFF]">res</span> ={" "}
              <span className="text-[#C792EA]">await</span>{" "}
              <span className="text-[#89DDFF]">fetch</span>(
              <span className="text-[#82AAFF]">API_URL</span>, {"{"}
              {"\n      "}
              method: {""}
              <span className="text-[#C3E88D]">&quot;GET&quot;</span>
              {",\n      "}
              headers: {"{"}
              {"\n        "}
              <span className="text-[#C3E88D]">
                &quot;x-api-key&quot;
              </span>: <span className="text-[#82AAFF]">API_KEY</span>
              {"\n      "}
              {"}"}
              {"\n    "}
              {"}"});
              {"\n\n    "}
              <span className="text-[#C792EA]">if</span> (!res.ok) {"{"}
              {"\n      "}
              <span className="text-[#C792EA]">throw</span>{" "}
              <span className="text-[#C3E88D]">new Error</span>(
              <span className="text-[#C3E88D]">
                &quot;Failed to fetch projects&quot;
              </span>
              );
              {"\n    "}
              {"}"}
              {"\n\n    "}
              <span className="text-[#C792EA]">const</span>{" "}
              <span className="text-[#82AAFF]">data</span> ={" "}
              <span className="text-[#C792EA]">await</span> res.
              <span className="text-[#89DDFF]">json</span>();
              {"\n    "}
              <span className="text-[#89DDFF]">console</span>.
              <span className="text-[#89DDFF]">log</span>(
              <span className="text-[#C3E88D]">&quot;Projects:&quot;</span>,
              data);
              {"\n  "}
              {"}"} <span className="text-[#C792EA]">catch</span> (err) {"{"}
              {"\n    "}
              <span className="text-[#89DDFF]">console</span>.
              <span className="text-[#89DDFF]">error</span>(
              <span className="text-[#C3E88D]">&quot;Error:&quot;</span>, err);
              {"\n  "}
              {"}"}
              {"\n"}
              {"}"}
              {"\n\n"}
              <span className="text-[#82AAFF]">fetchProjects</span>();
            </code>
          </Card>
        </Section>
      </Flex>
    </Container>
  );
};

export default Settings;
