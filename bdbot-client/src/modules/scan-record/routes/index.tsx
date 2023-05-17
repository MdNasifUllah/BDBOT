import { IPage } from "app/types";
import { TabViewComponent } from "../pages/tab-view.component";

export const scanRecordRoutes: IPage[] = [
  {
    name: "Home",
    link: "/",
    content: <TabViewComponent />
  }
];
