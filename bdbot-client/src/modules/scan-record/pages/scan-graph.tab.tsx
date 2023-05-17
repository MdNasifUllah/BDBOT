import React from "react";
import { Stack } from "@chakra-ui/react";
import { DetectionGraphComponent } from "../components/detection-graph.component";

interface DetectionGraphTabProps {}

export const DetectionGraphTab: React.FC<DetectionGraphTabProps> = (
  props: DetectionGraphTabProps
) => {
  return <DetectionGraphComponent />;
};
