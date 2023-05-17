/**
 * Model ScanRecord
 *
 */
export type ScanRecord = {
  id: number;
  date: string;
  startTime: Date;
  endTime: Date | null;
  isSuccess: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
