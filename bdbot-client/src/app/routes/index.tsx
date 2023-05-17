import { IPage } from "app/types";
import { scanRecordRoutes } from "modules/scan-record/routes";

// Routes that are always available (both authenticated or not authenticated)
export const publicRoutes: IPage[] = [...scanRecordRoutes];

// Starting route
export const rootRoute = "/";
