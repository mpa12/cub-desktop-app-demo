import React from 'react';
import Routes from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const baseClassName = 'min-h-screen';

function App() {
  return (
    <div className={baseClassName}>
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
