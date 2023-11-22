import axios, {HttpStatusCode} from "axios";
import AuthStore from "@stores/AuthStore";

export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL,
});


// Создаем перехватчик запросов
// Который к каждому запросу добавляет accessToken из localStorage
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config
  }
);

/**
 * Перехватчик ответов.
 *
 * В случае невалидного accessToken попытается его обновить,
 * И переотправить запрос с обновленным accessToken
 */
instance.interceptors.response.use(
  // В случае валидного accessToken ничего не делаем:
  (config) => {
    return config;
  },

  // В случае просроченного accessToken пытаемся его обновить:
  async (error) => {
    // Предотвращаем зацикленный запрос, добавляя свойство _isRetry
    const originalRequest = {...error.config};
    originalRequest._isRetry = true;

    if (
      // Проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === HttpStatusCode.Unauthorized &&
      // Проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry &&
      originalRequest.url !== '/users/api/v1/token/'
    ) {
      try {
        // Запрос на обновление токенов
        const refresh = localStorage.getItem('refreshToken') as string;

        if (!refresh) {
          return AuthStore.logout();
        }

        const resp = await axios.post('/users/api/v1/token/refresh/', { refresh })
          .then(resp => resp)
          .catch(error => error);


        if (resp?.data?.access) {
          return AuthStore.logout();
        }

        // Сохраняем новый accessToken в localStorage
        localStorage.setItem('accessToken', resp.data.access);

        // Переотправляем запрос с обновленным accessToken
        return instance.request(originalRequest);
      } catch (error) {
        return AuthStore.logout();
      }
    }

    // На случай, если возникла другая ошибка (не связанная с авторизацией)
    // Пробросим эту ошибку
    throw error;
  }
);