import { instance } from "../api.config";

class AuthService {
  login (login: string, password: string) {
    return instance.post("/api/login", { login, password })
  }

  refreshToken() {
    return instance.get("/api/refresh");
  }

  logout() {
    return instance.post("/api/logout")
  }
}

export default new AuthService();
