import { instance } from "../api.config";

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
}

export default new TaskService();
