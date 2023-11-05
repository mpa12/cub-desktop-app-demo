import { Navigate, Outlet } from "react-router-dom";
import authStore from "../stores/AuthStore";
import { observer } from "mobx-react-lite";

const PrivateRoute = () => {
  if (authStore.isAuthInProgress) {
    return <div>Проверка авторизации...</div>;
  }

  if (authStore.isAuth) {
    return <Outlet/>
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);