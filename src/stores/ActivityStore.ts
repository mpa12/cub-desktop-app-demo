import googleIcon from "@assets/apps/google.webp";
import telegramIcon from "@assets/apps/telegram.webp";
import telemostIcon from "@assets/apps/telemost.png";
import phpstormIcon from "@assets/apps/phpstorm.svg";
import excelIcon from "@assets/apps/excel.svg";

import {action, makeObservable, observable} from "mobx";

export interface Activity {
  name: string;
  image: string;
  isChecked: boolean;
  comment: string;
  time: string;
  timeIsUpdatedManual: boolean;
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
      isChecked: false,
      comment: 'Изучение Excel',
      time: '01:23:01',
      timeIsUpdatedManual: false,
    },
    {
      name: 'Telegram',
      image: telegramIcon,
      isChecked: false,
      comment: '',
      time: '04:33:20',
      timeIsUpdatedManual: false,
    },
    {
      name: 'Яндекс.Телемост',
      image: telemostIcon,
      isChecked: false,
      comment: 'Встреча с заказчиком',
      time: '02:32:10',
      timeIsUpdatedManual: false,
    },
    {
      name: 'PHPStorm',
      image: phpstormIcon,
      isChecked: false,
      comment: 'Работа в IDE',
      time: '03:25:07',
      timeIsUpdatedManual: false,
    },
    {
      name: 'MS Excel',
      image: excelIcon,
      isChecked: false,
      comment: 'Работа с Excel',
      time: '03:25:07',
      timeIsUpdatedManual: false,
    },
  ];

  setIsChecked(name: string, isChecked = true) {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        isChecked,
      };
    });
  }

  setComment(name: string, comment = '') {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        comment,
      };
    });
  }

  setTime(name: string, time = '') {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        time,
      };
    });
  }

  setTimeIsUpdatedManual(name: string, timeIsUpdatedManual = true) {
    this.list = this.list.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        timeIsUpdatedManual,
      };
    });
  }

  setList(list: Activity[]) {
    this.list = list;
  }

  addActivity(activity: Activity) {
    this.list.push(activity);
  }
}

export default new ActivityStore();
