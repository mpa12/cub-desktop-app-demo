import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

class AuthStore {
  isAuth = false;
  isAuthInProgress = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(login: string, password: string) {
    this.isAuthInProgress = true;

    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      this.isAuth = true;
    } catch (err) {
      console.log("login error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;

    try {
      const refreshToken = localStorage.getItem('refreshToken') as string;
      const response = await AuthService.refreshToken(refreshToken);
      localStorage.setItem("accessToken", response.data.access);
      this.isAuth = true;
    } catch (err) {
      return this.logout();
    } finally {
      this.isAuthInProgress = false;
    }
  }

  logout() {
    this.isAuthInProgress = true;

    try {
      this.isAuth = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
      window.location.replace('/login');
    }
  }

}

export default new AuthStore();