import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  IconButton,
  Spinner,
  Stack,
  Text
} from "@chakra-ui/react";
import {
  useEditScanRecordMutation,
  useEndScanRecordMutation,
  useGetActiveScanRecordQuery,
  useStartScanRecordMutation
} from "../api";
import dayjs from "dayjs";
import { FaMinus, FaPlus, FaToggleOn } from "react-icons/fa";
import { ScanRecord } from "app/api/type";
import { ClockViewComponent } from "./clock-view.component";

interface ActiveScanRecordComponentProps {}

export const ActiveScanRecordComponent: React.FC<
  ActiveScanRecordComponentProps
> = (props: ActiveScanRecordComponentProps) => {
  const getActiveScanRecordResult = useGetActiveScanRecordQuery({});
  const [startScanRecord, startScanRecordResult] = useStartScanRecordMutation();
  const [editScanRecord, editScanRecordResult] = useEditScanRecordMutation();
  const [endScanRecord, endScanRecordResult] = useEndScanRecordMutation();

  const [activeScanRecord, setActiveScanRecord] = useState<ScanRecord | null>(
    null
  );
  const [timeSinceStart, setTimeSinceStart] = useState(0);

  useEffect(() => {
    if (
      getActiveScanRecordResult.data &&
      getActiveScanRecordResult.data.scanRecord
    ) {
      setActiveScanRecord(getActiveScanRecordResult.data.scanRecord);
    }
  }, [getActiveScanRecordResult.data]);

  useEffect(() => {
    if (editScanRecordResult.data) {
      setActiveScanRecord(editScanRecordResult.data.scanRecord);
    }
  }, [editScanRecordResult.data]);

  useEffect(() => {
    if (startScanRecordResult.data) {
      setActiveScanRecord(startScanRecordResult.data.scanRecord);
    }
  }, [startScanRecordResult.data]);

  useEffect(() => {
    if (endScanRecordResult.data) {
      setActiveScanRecord(null);
      setTimeSinceStart(0);
    }
  }, [endScanRecordResult.data]);

  useEffect(() => {
    if (activeScanRecord) {
      setTimeSinceStart(
        dayjs().diff(dayjs(activeScanRecord.startTime), "second")
      );

      const interval = setInterval(() => {
        setTimeSinceStart(
          dayjs().diff(dayjs(activeScanRecord.startTime), "second")
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeScanRecord]);

  const toHoursMinutesSeconds = (totalSeconds: number) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes, seconds };
  };

  return (
    <Stack spacing={12}>
      {/* Stopwatch */}
      <Center>
        <ClockViewComponent time={toHoursMinutesSeconds(timeSinceStart)} />
      </Center>

      {getActiveScanRecordResult.data &&
      !getActiveScanRecordResult.isLoading ? (
        activeScanRecord ? (
          <Stack spacing={6}>
            {/* Object Count */}
            <Center>
              <Stack
                shadow={"md"}
                p="8"
                maxWidth="600px"
                maxHeight="600px"
                borderRadius={"xl"}
              >
                <Center>
                  <Text fontSize="2xl" color="gray.00">
                    Detected?
                  </Text>
                </Center>

                <Center>
                  <Text fontSize="6xl" color="gray.600" fontWeight={"bold"}>
                    {activeScanRecord.isSuccess ? "Yes" : "No"}
                  </Text>
                </Center>

                <Center>
                  <Stack direction="row">
                    <Button
                      colorScheme={activeScanRecord.isSuccess ? "red" : "green"}
                      isLoading={editScanRecordResult.isLoading}
                      onClick={() =>
                        editScanRecord({
                          data: {
                            id: activeScanRecord.id,
                            isSuccess: !activeScanRecord.isSuccess
                          }
                        })
                      }
                    >
                      Toggle Detection
                    </Button>
                  </Stack>
                </Center>
              </Stack>
            </Center>

            {/* Start Time */}
            <Center>
              <Text fontSize="2xl" color="gray.400">
                Scan started at{" "}
                {dayjs(activeScanRecord.startTime).format(
                  "MMM DD, YYYY hh:mm:ss A"
                )}
              </Text>
            </Center>

            {/* End Scan Button */}
            <Button
              isLoading={endScanRecordResult.isLoading}
              onClick={() =>
                endScanRecord({
                  data: {
                    id: activeScanRecord.id
                  }
                })
              }
            >
              End Scan
            </Button>
          </Stack>
        ) : (
          <Stack spacing={6}>
            <Center>
              <Text fontSize="2xl" color="gray.400">
                No active scanning is present.
              </Text>
            </Center>

            {/*  Start Scan Button */}
            <Button
              isLoading={startScanRecordResult.isLoading}
              onClick={() => startScanRecord({})}
            >
              Start New Scan
            </Button>
          </Stack>
        )
      ) : (
        <Center width="100%" height="256px">
          <Spinner />
        </Center>
      )}
    </Stack>
  );
};
