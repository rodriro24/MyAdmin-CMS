"use client";
import {
  AlertDialog,
  Button,
  Card,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatusLabel from "./StatusLabel";

type Task = {
  id: number;
  title: string;
  content: string;
  showable: boolean;
};

const ListItems = () => {
  const [data, setData] = useState<Task[] | null>(null);
  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get("/api/projects");
        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTask();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setData((prev) => (prev ? prev.filter((task) => task.id !== id) : []));
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();

  return (
    <Flex direction={"column"} gap={"3"} className="mt-4 mb-10 ">
      {data && data.length > 0 ? (
        data.map((task, idx) => {
          return (
            <Card
              size="1"
              key={idx}
              className="relative max-w-[80%] mx-auto w-full flex justify-between items-start p-4 gap-4"
            >
              <div className="flex flex-col py-1">
                <Heading
                  className="cursor-pointer w-fit "
                  onClick={() => router.push(`/dashboard/task/${task.id}`)}
                  size="4"
                >
                  {task.title}
                </Heading>
                <Text
                  onClick={() => router.push(`/dashboard/task/${task.id}`)}
                  size="2"
                  className="w-full max-w-[85%] cursor-pointer text-gray-500 overflow-hidden text-ellipsis line-clamp-2 "
                >
                  {task.content}
                </Text>
              </div>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Trash2
                    color="red"
                    opacity="70%"
                    cursor="pointer"
                    className="absolute right-13 top-[40%]"
                  />
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Remove Project</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Are you sure you want to delete this item? This application
                    will no longer be accessible
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button
                        variant="soft"
                        color="gray"
                        className="cursor-pointer"
                      >
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="red"
                        onClick={() => handleDelete(task.id)}
                        className="cursor-pointer"
                      >
                        Remove
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>

              <Pencil
                opacity="70%"
                cursor="pointer"
                className="absolute right-22 top-[40%]"
                onClick={() => router.push(`/dashboard/task/${task.id}`)}
              />
              <StatusLabel showable={ task.showable }/>
            </Card>
          );
        })
      ) : data && data.length === 0 ? (
        <Text className="text-center py-10 font-bold">No projects yet</Text>
      ) : (
        <>
          <Skeleton width="80%" height="67px" className="mx-auto" />
          <Skeleton width="80%" height="67px" className="mx-auto" />
          <Skeleton width="80%" height="67px" className="mx-auto" />
        </>
      )}
    </Flex>
  );
};

export default ListItems;
