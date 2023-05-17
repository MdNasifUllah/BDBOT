import { z } from "zod";

export const scanRecordService = {
  editScanRecordSchema: z.object({
    body: z.object({
      data: z.object({
        id: z.number().int(),
        isSuccess: z.boolean()
      })
    })
  }),
  endScanRecordSchema: z.object({
    body: z.object({
      data: z.object({
        id: z.number().int()
      })
    })
  }),

  deleteScanRecordSchema: z.object({
    body: z.object({
      data: z.object({
        id: z.number().int()
      })
    })
  })
};

export type EditScanRecordBody = z.infer<
  typeof scanRecordService.editScanRecordSchema
>["body"];

export type EndScanRecordBody = z.infer<
  typeof scanRecordService.endScanRecordSchema
>["body"];

export type DeleteScanRecordBody = z.infer<
  typeof scanRecordService.deleteScanRecordSchema
>["body"];
