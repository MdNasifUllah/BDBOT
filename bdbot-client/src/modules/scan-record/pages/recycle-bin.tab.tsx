import React from "react";
import { Stack } from "@chakra-ui/react";
import { DeletedScanHistoryComponent } from "../components/deleted-scan-history.component";

interface RecycleBinTabProps {}

export const RecycleBinTab: React.FC<RecycleBinTabProps> = (
  props: RecycleBinTabProps
) => {
  return <DeletedScanHistoryComponent />;
};
