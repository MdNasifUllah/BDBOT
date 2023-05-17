import { Router } from "express";
import { scanRecordController } from "./scan-record.controller";
import { validate } from "middlewares/validate.middleware";
import { scanRecordService } from "./scan-record.schema";

export const scanRecordRouter = Router();

scanRecordRouter.post(
  "/scan-record/start",
  scanRecordController.startScanRecord
);

scanRecordRouter.put(
  "/scan-record/edit",
  validate(scanRecordService.editScanRecordSchema),
  scanRecordController.editScanRecord
);

scanRecordRouter.put(
  "/scan-record/end",
  validate(scanRecordService.endScanRecordSchema),
  scanRecordController.endScanRecord
);

scanRecordRouter.delete(
  "/scan-record/delete",
  validate(scanRecordService.deleteScanRecordSchema),
  scanRecordController.deleteScanRecord
);

scanRecordRouter.put(
  "/scan-record/restore",
  validate(scanRecordService.deleteScanRecordSchema),
  scanRecordController.restoreScanRecord
);

scanRecordRouter.get(
  "/scan-record/list/get",
  scanRecordController.getScanRecords
);

scanRecordRouter.get(
  "/scan-record/deleted/list/get",
  scanRecordController.getDeletedScanRecords
);

scanRecordRouter.get(
  "/scan-record/active/get",
  scanRecordController.getActiveScanRecord
);

scanRecordRouter.get(
  "/scan-record/successful/count/get",
  scanRecordController.getSuccessfulScanCountByDate
);
