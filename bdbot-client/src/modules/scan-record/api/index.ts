import { api } from "app/api";
import * as ApiTypes from "./type";

const scanRecordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startScanRecord: builder.mutation<
      ApiTypes.StartScanRecordResponse,
      ApiTypes.StartScanRecordRequest
    >({
      query: () => ({
        url: `/scan-record/start`,
        method: `POST`
      })
    }),

    editScanRecord: builder.mutation<
      ApiTypes.EditScanRecordResponse,
      ApiTypes.EditScanRecordRequest
    >({
      query: (body) => ({
        url: `/scan-record/edit`,
        method: `PUT`,
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Scan Record", id: arg.data.id }
      ]
    }),

    endScanRecord: builder.mutation<
      ApiTypes.EndScanRecordResponse,
      ApiTypes.EndScanRecordRequest
    >({
      query: (body) => ({
        url: `/scan-record/end`,
        method: `PUT`,
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Scan Record", id: arg.data.id }
      ]
    }),

    deleteScanRecord: builder.mutation<
      ApiTypes.DeleteScanRecordResponse,
      ApiTypes.DeleteScanRecordRequest
    >({
      query: (body) => ({
        url: `/scan-record/delete`,
        method: `DELETE`,
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Scan Record", id: arg.data.id }
      ]
    }),

    restoreScanRecord: builder.mutation<
      ApiTypes.RestoreScanRecordResponse,
      ApiTypes.RestoreScanRecordRequest
    >({
      query: (body) => ({
        url: `/scan-record/restore`,
        method: `PUT`,
        body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Scan Record", id: arg.data.id }
      ]
    }),

    getScanRecords: builder.query<
      ApiTypes.GetScanRecordsResponse,
      ApiTypes.GetScanRecordsRequest
    >({
      query: () => ({
        url: `/scan-record/list/get`,
        method: `GET`
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.scanRecords.map(({ id }) => ({
                type: "Scan Record" as const,
                id
              }))
            ]
          : []
    }),

    getDeletedScanRecords: builder.query<
      ApiTypes.GetDeletedScanRecordsResponse,
      ApiTypes.GetDeletedScanRecordsRequest
    >({
      query: () => ({
        url: `/scan-record/deleted/list/get`,
        method: `GET`
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.scanRecords.map(({ id }) => ({
                type: "Scan Record" as const,
                id
              }))
            ]
          : []
    }),

    getActiveScanRecord: builder.query<
      ApiTypes.GetActiveScanRecordResponse,
      ApiTypes.GetActiveScanRecordRequest
    >({
      query: () => ({
        url: `/scan-record/active/get`,
        method: `GET`
      })
    }),

    getSuccessfulScanCount: builder.query<
      ApiTypes.GetSuccessfulScanCountResponse,
      ApiTypes.GetSuccessfulScanCountRequest
    >({
      query: () => ({
        url: `/scan-record/successful/count/get`,
        method: `GET`
      })
    })
  }),

  overrideExisting: false
});

export const {
  useStartScanRecordMutation,
  useEditScanRecordMutation,
  useEndScanRecordMutation,
  useDeleteScanRecordMutation,
  useRestoreScanRecordMutation,
  useGetScanRecordsQuery,
  useGetDeletedScanRecordsQuery,
  useGetActiveScanRecordQuery,
  useGetSuccessfulScanCountQuery
} = scanRecordApi;
