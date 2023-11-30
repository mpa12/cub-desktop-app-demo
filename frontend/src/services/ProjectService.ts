import {instance} from "../api.config";
import getCookie from "@utils/getCookie";

class ProjectService {
  index() {
    return instance.get('/projects/api/v1/projects/');
  }

  view(projectId: string | number) {
    return instance.get(`/projects/api/v1/project/${projectId}`);
  }

  // delete(eventId: number) {
  //   instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
  //   return instance.post('/projects/api/v1/events/delete/', {events_ids: [eventId.toString()]});
  // }
}

export default new ProjectService();
