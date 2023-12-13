import { Route, Routes as ReactRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "@components/loading-page/LoadingPage";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path='loading' element={<LoadingPage/>}/>
      <Route path='*' element={<PrivateRoute/>}>
        <Route index element={<h1>Index page</h1>}/>
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
