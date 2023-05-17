import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "app/config";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiEndpoint,
  credentials: "include"
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Scan Record"],
  endpoints: (builder) => ({})
});
