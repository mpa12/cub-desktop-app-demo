import { instance } from "../api.config";

class AuthService {
  login(username: string, password: string) {
    return instance.post('/users/api/v1/token/', { username, password })
  }

  refreshToken(refresh: string) {
    return instance.post('/users/api/v1/token/refresh/', { refresh });
  }

  profileData() {
    return instance.get('/users/api/v1/user/profile/');
  }
}

export default new AuthService();
