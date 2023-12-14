import {Navigate, Route, Routes as ReactRoutes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "@components/loading-page/LoadingPage";
import Settings from "@components/settings/Settings";
import ActivityList from "@components/activity-list/ActivityList";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route index element={<Navigate to={'cub-desktop-app-demo'} />}/>
      <Route path='cub-desktop-app-demo/loading' element={<LoadingPage />}/>
      <Route path='*' element={<PrivateRoute />}>
        <Route path={'cub-desktop-app-demo'} element={<ActivityList />}/>
        <Route path={'cub-desktop-app-demo/settings'} element={<Settings />}/>
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
