import React from "react";
import { Heading, Tag, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface ChangeLocationComponentProps {}

export const ChangeLocationComponent: React.FC<ChangeLocationComponentProps> = (
  props: ChangeLocationComponentProps
) => {
  const navigate = useNavigate();

  return (
    <Tooltip label="Click to change location">
      <Tag
        p="2"
        size="md"
        colorScheme={"blue"}
        cursor="pointer"
        onClick={() => {
          navigate("/location/select");
        }}
      >
        <Heading fontSize={"sm"}>
          {window.localStorage.getItem("locationName") || "Unknown"}
        </Heading>
      </Tag>
    </Tooltip>
  );
};
