import React, { useEffect } from "react";
import { Center, Stack, Text } from "@chakra-ui/react";
import { useGetSuccessfulScanCountQuery } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";

import { ScanRecord } from "app/api/type";

interface DetectionGraphComponentProps {}

export const DetectionGraphComponent: React.FC<DetectionGraphComponentProps> = (
  props: DetectionGraphComponentProps
) => {
  const getScanCountResult = useGetSuccessfulScanCountQuery(
    {},
    { pollingInterval: 2000 }
  );

  const [scanCount, setScanCount] = React.useState<
    { date: string; count: number }[]
  >([]);

  useEffect(() => {
    if (getScanCountResult.data) {
      setScanCount(
        getScanCountResult.data.result.map((item) => {
          return {
            date: dayjs(item.date).format("MMM DD, YYYY"),
            count: item.count
          };
        })
      );
    }
  }, [getScanCountResult.data]);

  return (
    <Stack spacing="6" py="12">
      <Center py="6">
        <Text fontSize="2xl" fontWeight="bold" color="gray.600">
          Detection Graph
        </Text>
      </Center>

      <Center>
        <LineChart
          width={1000}
          height={300}
          data={scanCount.slice(0, 10)}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis
            dataKey="count"
            domain={[0, "dataMax"]}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />

          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="count"
            label="Successful Scans"
            stroke="#777"
            dot={true}
            radius={12}
            fill="#777"
          />
        </LineChart>
      </Center>
    </Stack>
  );
};
