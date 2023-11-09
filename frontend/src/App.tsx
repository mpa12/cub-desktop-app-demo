import React from 'react';
import Routes from "./routes/Routes";

const baseClassName = 'min-h-screen';

function App() {
  return (
    <div className={baseClassName}>
      <Routes />
    </div>
  );
}

export default App;
