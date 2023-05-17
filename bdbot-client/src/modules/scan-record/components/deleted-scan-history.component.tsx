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
import {
  useGetDeletedScanRecordsQuery,
  useRestoreScanRecordMutation
} from "../api";
import { ScanRecord } from "app/api/type";
import dayjs from "dayjs";

interface DeletedScanHistoryComponentProps {}

export const DeletedScanHistoryComponent: React.FC<
  DeletedScanHistoryComponentProps
> = (props: DeletedScanHistoryComponentProps) => {
  const getScanRecordsResult = useGetDeletedScanRecordsQuery(
    {},
    { pollingInterval: 2000 }
  );
  const [restoreScanRecord, restoreScanRecordResult] =
    useRestoreScanRecordMutation();

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
                Deleted Scans
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
                    isLoading={restoreScanRecordResult.isLoading}
                    colorScheme="green"
                    onClick={() => {
                      restoreScanRecord({
                        data: { id: scanRecord.id }
                      });
                    }}
                  >
                    Restore
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
