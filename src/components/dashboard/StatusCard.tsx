import { Badge, DataList, Flex, IconButton, Link, Code } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import React from 'react'

type StatusCardProps = {
  className?: string;
};

const StatusCard: React.FC<StatusCardProps> = ({ className }) => {
  return (
    <Flex className='absolute right-20 top-20'>
      <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Status</DataList.Label>
        <DataList.Value>
          <Badge color="jade" variant="soft" radius="full">
            Active
          </Badge>
        </DataList.Value>
        </DataList.Item>
        
        
      <DataList.Item>
        <DataList.Label minWidth="88px">Owner</DataList.Label>
        <DataList.Value>Vlad Moroz</DataList.Value>
      </DataList.Item>
 
        
      </DataList.Root>
    </Flex>
  );
};

export default StatusCard