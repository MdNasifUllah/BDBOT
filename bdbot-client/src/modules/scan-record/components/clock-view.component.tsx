import React from "react";
import { Stack, Text } from "@chakra-ui/react";

interface ClockViewComponentProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const ClockViewComponent: React.FC<ClockViewComponentProps> = (
  props: ClockViewComponentProps
) => {
  return (
    <Stack direction="row" align={"center"} spacing="6">
      <Stack align={"center"}>
        <Text fontSize="4xl" fontWeight="bold" color="gray.700">
          {props.time.hours.toString().padStart(2, "0")}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="gray.500">
          Hours
        </Text>
      </Stack>
      <Text fontSize="4xl" fontWeight="bold" color="gray.500">
        :
      </Text>
      <Stack align={"center"}>
        <Text fontSize="4xl" fontWeight="bold" color="gray.700">
          {props.time.minutes.toString().padStart(2, "0")}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="gray.500">
          Minutes
        </Text>
      </Stack>
      <Text fontSize="4xl" fontWeight="bold" color="gray.500">
        :
      </Text>
      <Stack align={"center"}>
        <Text fontSize="4xl" fontWeight="bold" color="gray.700">
          {props.time.seconds.toString().padStart(2, "0")}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color="gray.500">
          Seconds
        </Text>
      </Stack>
    </Stack>
  );
};
