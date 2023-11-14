import {instance} from "../api.config";

class CalendarService {
  index() {
    return instance.get('/calendars');
  }
}

export default new CalendarService();
