"use client"

import { Button, Flex, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

const HeaderDashboard = () => {
    const router = useRouter();
  
  return (
    <Flex justify={"between"}>
        <Heading ml={"8rem"}>Projects</Heading>
        <Button
          mr={"8rem"}
          onClick={() => router.push("/dashboard/task/create")}
        >
          Add project
        </Button>
      </Flex>
  )
}

export default HeaderDashboard