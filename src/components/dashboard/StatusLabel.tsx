import { HoverCard, Text } from "@radix-ui/themes";
import { MonitorCheck, MonitorX } from "lucide-react";
import React from "react";

const StatusLabel = ({ showable }: { showable: boolean }) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        {/*  */}
        {showable ? (
          <MonitorCheck
            color="#2f9fe4"
            opacity="70%"
            cursor="pointer"
            className="absolute right-4 top-[40%]"
          />
        ) : (
          <MonitorX
            color="#9b9c9d"
            opacity="70%"
            cursor="pointer"
            className="absolute right-4 top-[40%]"
          />
        )}
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Text as="div">{showable ? "Project active" : "Project inactive"}</Text>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default StatusLabel;
