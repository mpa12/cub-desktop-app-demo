import {Navigate, Outlet, Route, Routes as ReactRoutes} from "react-router-dom";
import Login from "@components/login/Login";
import PrivateRoute from "./PrivateRoute";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import Tasks from "@components/tasks/Tasks";
import Projects from "@components/projects/Projects";
import Employees from "@components/employees/Employees";
import Calendar from "@components/calendar/Calendar";
import Task from "@components/tasks/Task";
import Project from "@components/projects/Project";
import PageNotFound from "@components/page-not-found/PageNotFound";
import CreateTask from "@components/tasks/CreateTask";
import UpdateTask from "@components/tasks/UpdateTask";
import ProfilePage from "@components/profile/ProfilePage";
import Services from "@components/services/Services";

const Routes = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path='login' element={<Login/>}/>
      <Route path='*' element={<PrivateRoute/>}>
        <Route index element={<Navigate to='/tasks'/>}/>
        <Route path='tasks' element={<Outlet/>}>
          <Route index element={<Tasks/>}/>
          <Route path='create' element={<CreateTask/>}/>
          <Route path='update/:id' element={<UpdateTask/>}/>
          <Route path=':id' element={<Task/>}/>
        </Route>
        <Route path='projects' element={<Outlet/>}>
          <Route index element={<Projects/>}/>
          <Route path=':id' element={<Project/>}/>
        </Route>
        <Route path='employees' element={<Employees/>}/>
        <Route path='calendar' element={<Calendar/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='services' element={<Services/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Route>
    </ReactRoutes>
  </BrowserRouter>
);

export default Routes;
