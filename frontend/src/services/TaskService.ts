import { instance } from "../api.config";

class TaskService {
  index() {
    return instance.get('/tasks/api/v1/user/tasks/');
  }
}

export default new TaskService();
