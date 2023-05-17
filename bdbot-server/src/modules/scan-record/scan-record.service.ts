import { databaseClient } from "database";
import dayjs from "dayjs";

export const scanRecordService = {
  // Start scan record
  startScanRecord: async () => {
    return await databaseClient.scanRecord.create({
      data: {
        startTime: dayjs().toISOString(),
        date: dayjs().format("YYYY-MM-DD")
      }
    });
  },

  // Edit scan record
  editScanRecord: async (id: number, isSuccess: boolean) => {
    return await databaseClient.scanRecord.update({
      where: {
        id
      },
      data: {
        isSuccess
      }
    });
  },

  // End scan record
  endScanRecord: async (id: number) => {
    return await databaseClient.scanRecord.update({
      where: {
        id
      },
      data: {
        endTime: dayjs().toISOString()
      }
    });
  },

  // Delete scan record
  deleteScanRecord: async (id: number) => {
    return await databaseClient.scanRecord.update({
      where: {
        id
      },
      data: {
        isDeleted: true
      }
    });
  },

  // Restore deleted scan record
  restoreScanRecord: async (id: number) => {
    return await databaseClient.scanRecord.update({
      where: {
        id
      },
      data: {
        isDeleted: false
      }
    });
  },

  // Get scan records in reverse order of id
  getScanRecords: async () => {
    return await databaseClient.scanRecord.findMany({
      where: {
        AND: [
          {
            isDeleted: false
          },
          {
            NOT: {
              endTime: null
            }
          }
        ]
      },
      orderBy: {
        id: "desc"
      }
    });
  },

  // Get deleted scan records by reverse order of id
  getDeletedScanRecords: async () => {
    return await databaseClient.scanRecord.findMany({
      where: {
        isDeleted: true
      },
      orderBy: {
        id: "desc"
      }
    });
  },

  // Get currently active scan record
  getActiveScanRecord: async () => {
    return await databaseClient.scanRecord.findFirst({
      where: {
        AND: [
          {
            isDeleted: false
          },
          {
            endTime: null
          }
        ]
      }
    });
  },

  // Get successful scan count grouped by date
  getSuccessfulScanCountByDate: async () => {
    const result = await databaseClient.scanRecord.groupBy({
      by: ["date"],
      where: {
        isSuccess: true
      },
      _count: {
        id: true
      },
      orderBy: {
        date: "desc"
      }
    });

    const formattedResult = result.map((item) => {
      return {
        date: item.date,
        count: item._count.id
      };
    });

    return formattedResult;
  }
};
