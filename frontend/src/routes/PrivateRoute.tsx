import { Navigate, Outlet } from "react-router-dom";
import authStore from "../stores/AuthStore";
import { observer } from "mobx-react-lite";
import Header from "../components/header/Header";

/**
 * Проверка пользователя на вхождение в аккаунт.
 *
 * @constructor
 */
const PrivateRoute = () => {
  if (!authStore.isAuth && !authStore.isAuthInProgress && localStorage.getItem('refreshToken')) {
    authStore.checkAuth().then(() => {})
  }

  if (authStore.isAuthInProgress) {
    return <div>Проверка авторизации...</div>;
  }

  if (authStore.isAuth || localStorage.getItem('refreshToken')) {
    return (
      <Header>
        <Outlet />
      </Header>
    )
  } else {
    return <Navigate to='/login' />;
  }
};

export default observer(PrivateRoute);