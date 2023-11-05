import React from 'react';
import Login from "./components/login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

const baseClassName = 'min-h-screen';

function App() {
  return (
    <div className={baseClassName}>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PrivateRoute />}>
            <Route path='two' element={<h1>asfasfasfas</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
