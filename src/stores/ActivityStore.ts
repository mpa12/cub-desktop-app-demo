import googleIcon from "@assets/apps/google.webp";
import telegramIcon from "@assets/apps/telegram.webp";
import telemostIcon from "@assets/apps/telemost.png";
import {action, autorun, makeObservable, observable} from "mobx";

export interface Activity {
  name: string;
  image: string;
  isChecked: boolean;
  comment: string;
  time: string;
}

class ActivityStore {
  constructor() {
    makeObservable(this, {
      list: observable,
      setIsChecked: action,
      setList: action,
    });
  }

  list: Activity[] = [
    {
      name: 'Google',
      image: googleIcon,
      isChecked: true,
      comment: 'Изучение Excel',
      time: '01:23:01',
    },
    {
      name: 'Telegram',
      image: telegramIcon,
      isChecked: false,
      comment: '',
      time: '04:33:20',
    },
    {
      name: 'Яндекс.Телемост',
      image: telemostIcon,
      isChecked: true,
      comment: 'Встреча с заказчиком',
      time: '02:32:10',
    },
  ];

  setIsChecked(name, isChecked = true) {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        isChecked,
      };
    });
  }

  setComment(name, comment = '') {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        comment,
      };
    });
  }

  setList(list: Activity[]) {
    this.list = list;
  }
}

export default new ActivityStore();
