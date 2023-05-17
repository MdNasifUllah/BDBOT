import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardSkeletonComponent } from "modules/core/components/dashboard-skeleton.component";
import { PageContainerComponent } from "modules/core/components/page-container.component";
import { MissingPage } from "modules/core/pages/missing.page";

import { publicRoutes, rootRoute } from "../routes";

import { PublicRouteComponent } from "./public-route.component";

export const AppRouteComponent: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRouteComponent />}>
        {publicRoutes.map((page) => {
          return (
            <Route key={page.name} path={page.link} element={page.content} />
          );
        })}
      </Route>

      {/* Root route */}
      <Route path="/" element={<Navigate to={rootRoute} />} />
      {/* 404 Page */}
      <Route path="*" element={<MissingPage />} />
    </Routes>
  );
};
