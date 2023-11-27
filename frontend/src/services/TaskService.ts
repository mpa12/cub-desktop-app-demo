import { instance } from "../api.config";
import getCookie from "@utils/getCookie";

class TaskService {
  index() {
    return instance.get('/tasks/api/v1/user/tasks/');
  }

  view(taskId: string | number) {
    return instance.get(`/tasks/api/v1/user/task/${taskId}`);
  }

  start(taskId: string | number) {
    return instance.post(`/tasks/api/v1/tasks/${taskId}/start_continue/`);
  }

  pause(taskId: string | number) {
    return instance.post(`/tasks/api/v1/tasks/${taskId}/pause/`);
  }

  complete(taskId: string | number) {
    return instance.post(`/tasks/api/v1/tasks/${taskId}/stop/`);
  }

  create(data: {
    title: string;
    description: string;
    executor: number;
    project: number;
    project_manager: number;
    due_date?: string;
  }) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post(`/tasks/api/v1/tasks/create/`, data);
  }

  update(id: number, data: {
    title: string;
    description: string;
    executor: number;
    project: number;
    project_manager: number;
    due_date?: string;
  }) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.put(`/tasks/api/v1/tasks/${id}/update/`, data);
  }
}

export default new TaskService();
