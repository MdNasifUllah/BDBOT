import { ScanRecord } from "app/api/type";

export interface StartScanRecordRequest {}
export interface StartScanRecordResponse {
  scanRecord: ScanRecord;
}

export interface EditScanRecordRequest {
  data: {
    id: number;
    isSuccess: boolean;
  };
}
export interface EditScanRecordResponse {
  scanRecord: ScanRecord;
}

export interface EndScanRecordRequest {
  data: {
    id: number;
  };
}
export interface EndScanRecordResponse {
  scanRecord: ScanRecord;
}

export interface DeleteScanRecordRequest {
  data: {
    id: number;
  };
}
export interface DeleteScanRecordResponse {
  scanRecord: ScanRecord;
}

export interface RestoreScanRecordRequest {
  data: {
    id: number;
  };
}
export interface RestoreScanRecordResponse {
  scanRecord: ScanRecord;
}

export interface GetScanRecordsRequest {}
export interface GetScanRecordsResponse {
  scanRecords: ScanRecord[];
}

export interface GetDeletedScanRecordsRequest {}
export interface GetDeletedScanRecordsResponse {
  scanRecords: ScanRecord[];
}

export interface GetActiveScanRecordRequest {}
export interface GetActiveScanRecordResponse {
  scanRecord: ScanRecord | null;
}

export interface GetSuccessfulScanCountRequest {}
export interface GetSuccessfulScanCountResponse {
  result: {
    date: string;
    count: number;
  }[];
}
