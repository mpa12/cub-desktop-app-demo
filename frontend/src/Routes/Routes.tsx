import { Route, Routes as ReactRoutes } from "react-router-dom";
import Login from "../components/login/Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path='login' element={<Login />} />
      <Route path='*' element={<PrivateRoute />}>
        <Route index element={<h1>Индексаная страница</h1>} />
        <Route path='*' element={<h1>Упс...<br/>Страница не найдена</h1>} />
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
