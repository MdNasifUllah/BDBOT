import React from "react";
import { DetectionHistoryComponent } from "../components/detection-history.component";

interface DetectionHistoryTabProps {}

export const DetectionHistoryTab: React.FC<DetectionHistoryTabProps> = (
  props: DetectionHistoryTabProps
) => {
  return <DetectionHistoryComponent />;
};
