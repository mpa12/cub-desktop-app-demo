import {instance} from "../api.config";
import getCookie from "@utils/getCookie";

class CalendarService {
  index() {
    return instance.get('/calendars/api/v1/user/events/');
  }

  create({
    title,
    description,
    start_datetime,
    bg_color,
    text_color
  }: {
    title: string;
    description: string;
    start_datetime: string;
    bg_color: string;
    text_color: string;
  }) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post('/calendars/api/v1/event/create/', {
      title,
      description,
      start_datetime,
      bg_color,
      text_color
    });
  }

  delete(eventId: number) {
    return instance.post('/calendars/api/v1/events/delete/', { events_ids: eventId.toString() });
  }
}

export default new CalendarService();
