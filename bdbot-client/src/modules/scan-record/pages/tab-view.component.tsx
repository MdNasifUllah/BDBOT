import React from "react";
import {
  Center,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { RecordScanTab } from "./record-scan.tab";
import { DetectionGraphTab } from "./scan-graph.tab";
import { RecycleBinTab } from "./recycle-bin.tab";
import { DetectionHistoryTab } from "./detection-history.tab";

interface TabViewComponentProps {}

export const TabViewComponent: React.FC<TabViewComponentProps> = (
  props: TabViewComponentProps
) => {
  return (
    <Center padding={6} width="100vw" height="100vh">
      <Stack width={{ base: "95%", lg: "75%", xl: "1200px" }} height="100%">
        <Center p="12">
          <Heading>Bomb Disposal BOT</Heading>
        </Center>
        <Tabs variant={"solid-rounded"} isFitted isLazy>
          <TabList>
            <Tab>Record Scan</Tab>
            <Tab>Detection History</Tab>
            <Tab>Detection Graph</Tab>
            <Tab>Recycle Bin</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0} m={0} width="100%" height="100%">
              <RecordScanTab />
            </TabPanel>
            <TabPanel p={0} m={0} width="100%" height="100%">
              <DetectionHistoryTab />
            </TabPanel>
            <TabPanel p={0} m={0} width="100%" height="100%">
              <DetectionGraphTab />
            </TabPanel>
            <TabPanel p={0} m={0} width="100%" height="100%">
              <RecycleBinTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Center>
  );
};
