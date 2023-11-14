import {instance} from "../api.config";

class CalendarService {
  index() {
    return instance.get('/calendars/api/v1/user/events/');
  }
}

export default new CalendarService();
