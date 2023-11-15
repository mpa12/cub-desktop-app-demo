import {Navigate, Outlet, Route, Routes as ReactRoutes} from "react-router-dom";
import Login from "../components/login/Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import Tasks from "../components/tasks/Tasks";
import Projects from "../components/projects/Projects";
import Employees from "../components/employees/Employees";
import Calendar from "../components/calendar/Calendar";
import Task from "../components/tasks/Task";
import Project from "@components/projects/Project";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path='login' element={<Login/>}/>
      <Route path='*' element={<PrivateRoute/>}>
        <Route index element={<Navigate to='/tasks'/>}/>
        <Route path='tasks' element={<Outlet/>}>
          <Route index element={<Tasks/>}/>
          <Route path=':id' element={<Task/>}/>
        </Route>
        <Route path='projects' element={<Outlet/>}>
          <Route index element={<Projects/>}/>
          <Route path=':id' element={<Project/>}/>
        </Route>
        <Route path='employees' element={<Employees/>}/>
        <Route path='calendar' element={<Calendar/>}/>
        <Route path='*' element={<h1>Упс...<br/>Страница не найдена</h1>}/>
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
