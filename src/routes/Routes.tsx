import { Route, Routes as ReactRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "@components/loading-page/LoadingPage";
import Settings from "@components/settings/Settings";
import ActivityList from "@components/activity-list/ActivityList";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path='loading' element={<LoadingPage />}/>
      <Route path='*' element={<PrivateRoute />}>
        <Route index element={<ActivityList />}/>
        <Route path={'settings'} element={<Settings />}/>
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
