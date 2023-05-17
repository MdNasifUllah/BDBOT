import { Request, Response } from "express";
import { scanRecordService } from "./scan-record.service";
import { handleClientError, handleLibraryError } from "utils/error/error.util";
import {
  DeleteScanRecordBody,
  EditScanRecordBody,
  EndScanRecordBody
} from "./scan-record.schema";
import { ScanRecord } from "@prisma/client";

export const scanRecordController = {
  startScanRecord: async (req: Request<{}, {}, {}>, res: Response) => {
    let scanRecord: ScanRecord | null = null;
    try {
      scanRecord = await scanRecordService.startScanRecord();
    } catch (error) {
      return handleLibraryError(error, res);
    }

    if (!scanRecord) {
      return handleClientError(500, "Scan record could not be created", res);
    }

    return res.status(201).json({
      scanRecord
    });
  },

  editScanRecord: async (
    req: Request<{}, {}, EditScanRecordBody>,
    res: Response
  ) => {
    const { data } = req.body;

    let scanRecord: ScanRecord | null = null;

    try {
      scanRecord = await scanRecordService.editScanRecord(
        data.id,
        data.isSuccess
      );
    } catch (error) {
      return handleLibraryError(error, res);
    }

    if (!scanRecord) {
      return handleClientError(500, "Scan record could not be edited", res);
    }

    return res.status(201).json({
      scanRecord
    });
  },

  endScanRecord: async (
    req: Request<{}, {}, EndScanRecordBody>,
    res: Response
  ) => {
    const { data } = req.body;

    let scanRecord: ScanRecord | null = null;

    try {
      scanRecord = await scanRecordService.endScanRecord(data.id);
    } catch (error) {
      return handleLibraryError(error, res);
    }

    if (!scanRecord) {
      return handleClientError(500, "Scan record could not be ended", res);
    }

    return res.status(201).json({
      scanRecord
    });
  },

  deleteScanRecord: async (
    req: Request<{}, {}, DeleteScanRecordBody>,
    res: Response
  ) => {
    const { data } = req.body;

    let scanRecord: ScanRecord | null = null;

    try {
      scanRecord = await scanRecordService.deleteScanRecord(data.id);
    } catch (error) {
      return handleLibraryError(error, res);
    }

    if (!scanRecord) {
      return handleClientError(500, "Scan record could not be deleted", res);
    }

    return res.status(201).json({
      scanRecord
    });
  },

  restoreScanRecord: async (
    req: Request<{}, {}, DeleteScanRecordBody>,
    res: Response
  ) => {
    const { data } = req.body;

    let scanRecord: ScanRecord | null = null;

    try {
      scanRecord = await scanRecordService.restoreScanRecord(data.id);
    } catch (error) {
      return handleLibraryError(error, res);
    }

    if (!scanRecord) {
      return handleClientError(500, "Scan record could not be restored", res);
    }

    return res.status(201).json({
      scanRecord
    });
  },

  getScanRecords: async (req: Request, res: Response) => {
    let scanRecords: ScanRecord[] = [];

    try {
      scanRecords = await scanRecordService.getScanRecords();
    } catch (error) {
      return handleLibraryError(error, res);
    }

    return res.status(200).json({
      scanRecords
    });
  },

  getDeletedScanRecords: async (req: Request, res: Response) => {
    let scanRecords: ScanRecord[] = [];

    try {
      scanRecords = await scanRecordService.getDeletedScanRecords();
    } catch (error) {
      return handleLibraryError(error, res);
    }

    return res.status(200).json({
      scanRecords
    });
  },

  getActiveScanRecord: async (req: Request, res: Response) => {
    let scanRecord: ScanRecord | null = null;

    try {
      scanRecord = await scanRecordService.getActiveScanRecord();
    } catch (error) {
      return handleLibraryError(error, res);
    }

    return res.status(200).json({
      scanRecord
    });
  },

  getSuccessfulScanCountByDate: async (req: Request, res: Response) => {
    let result: { date: string; count: number }[] = [];

    try {
      result = await scanRecordService.getSuccessfulScanCountByDate();
    } catch (error) {
      return handleLibraryError(error, res);
    }

    return res.status(200).json({
      result
    });
  }
};
