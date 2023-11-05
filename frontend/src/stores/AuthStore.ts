import { makeAutoObservable } from "mobx";
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
      localStorage.setItem("token", response.data.accessToken);
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
      const response = await AuthService.refreshToken();
      localStorage.setItem("token", response.data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.log("login error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async logout() {
    this.isAuthInProgress = true;

    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

}

export default new AuthStore();