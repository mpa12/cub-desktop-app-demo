import {instance} from "../api.config";
import getCookie from "@utils/getCookie";

class CalendarService {
  index() {
    return instance.get('/calendars/api/v1/user/events/');
  }

  create(data: {
    title: string;
    description: string;
    start_datetime: string;
    bg_color: string;
    text_color: string;
  }) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post('/calendars/api/v1/event/create/', data);
  }

  delete(eventId: number) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post('/calendars/api/v1/events/delete/', { events_ids: [eventId.toString()] });
  }

  update(eventId: number, data: {
    title: string;
    description: string;
    start_datetime: string;
    bg_color: string;
    text_color: string;
  }) {
    instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
    return instance.post(`/calendars/api/v1/events/${eventId}/update/`, data);
  }

  view(eventId: number) {
    return instance.get(`/calendars/api/v1/user/event/${eventId}/`);
  }
}

export default new CalendarService();
