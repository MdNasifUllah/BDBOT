import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Text,
  Button
} from "@chakra-ui/react";
import { useDeleteScanRecordMutation, useGetScanRecordsQuery } from "../api";
import { ScanRecord } from "app/api/type";
import dayjs from "dayjs";

interface DetectionHistoryComponentProps {}

export const DetectionHistoryComponent: React.FC<
  DetectionHistoryComponentProps
> = (props: DetectionHistoryComponentProps) => {
  const getScanRecordsResult = useGetScanRecordsQuery(
    {},
    { pollingInterval: 2000 }
  );
  const [deleteScanRecord, deleteScanRecordResult] =
    useDeleteScanRecordMutation();

  const [scanRecords, setScanRecords] = useState<ScanRecord[]>([]);

  useEffect(() => {
    if (getScanRecordsResult.data) {
      setScanRecords(getScanRecordsResult.data.scanRecords);
    }
  }, [getScanRecordsResult.data]);

  const toHoursMinutesSeconds = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, "0")} h, ${minutes
      .toString()
      .padStart(2, "0")} m, ${seconds.toString().padStart(2, "0")} s`;
  };

  return (
    <Stack spacing={12}>
      <TableContainer borderRadius={"lg"}>
        <Table variant="simple">
          <TableCaption placement="top">
            <Center py="12">
              <Text fontSize={"2xl"} fontWeight="bold">
                Completed Scans with Detections
              </Text>
            </Center>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Serial</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Duration</Th>
              <Th>Detected?</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {scanRecords.map((scanRecord, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  {dayjs(scanRecord.startTime).format(
                    "MMM DD, YYYY hh:mm:ss A"
                  )}
                </Td>
                <Td>
                  {dayjs(scanRecord.endTime).format("MMM DD, YYYY hh:mm:ss A")}
                </Td>
                <Td>
                  {toHoursMinutesSeconds(
                    dayjs(scanRecord.endTime).diff(
                      dayjs(scanRecord.startTime),
                      "second"
                    )
                  )}
                </Td>
                <Td>{scanRecord.isSuccess ? "Yes" : "No"}</Td>
                <Td>
                  <Button
                    isLoading={deleteScanRecordResult.isLoading}
                    colorScheme="red"
                    onClick={() => {
                      deleteScanRecord({
                        data: { id: scanRecord.id }
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>{" "}
    </Stack>
  );
};
