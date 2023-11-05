import React from 'react';
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const baseClassName = 'min-h-screen';

function App() {
  return (
    <div className={baseClassName}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path={'login'} element={<Login />} />
          <Route path="two" element={<h1>asfasfasfas</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
