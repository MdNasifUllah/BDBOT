import React from "react";
import { Stack } from "@chakra-ui/react";
import { ActiveScanRecordComponent } from "../components/active-scan-record.component";

interface RecordScanTabProps {}

export const RecordScanTab: React.FC<RecordScanTabProps> = (
  props: RecordScanTabProps
) => {
  return (
    <Stack width="100%" height="100%" spacing="12" py={12}>
      {/* Active Scan Record */}
      <ActiveScanRecordComponent />

      {/* Old Scan Records */}
    </Stack>
  );
};
