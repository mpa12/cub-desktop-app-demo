import { Navigate, Outlet } from "react-router-dom";
import Header from "@components/header/Header";

const PrivateRoute = () => {
  if (localStorage.getItem('firstSignIn') !== '1') {
    return <Navigate to={'/loading'} />;
  }

  return (
    <Header>
      <Outlet />
    </Header>
  );
};

export default PrivateRoute;