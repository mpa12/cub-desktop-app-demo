import { instance } from "../api.config";

class ProjectService {
  index() {
    return instance.get('/projects/api/v1/projects/');
  }

  view(projectId: string | number) {
    return instance.get(`/projects/api/v1/project/${projectId}`);
  }
}

export default new ProjectService();
