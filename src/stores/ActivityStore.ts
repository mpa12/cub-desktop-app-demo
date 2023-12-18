import { action, makeObservable, observable } from "mobx";

export interface Activity {
  id: number;
  serviceName: string;
  projectName?: string;
  comment: string;
  time: string;
  timeIsUpdatedManual: boolean;
}

class ActivityStore {
  constructor() {
    makeObservable(this, {
      list: observable,
      setList: action,
    });
  }

  list: Activity[] = [
    {
      id: 0,
      serviceName: 'Google',
      projectName: '',
      comment: 'Просмотр: https://learn.microsoft.com/, https://stackoverflow.com/, https://github.com/',
      time: '01:23:01',
      timeIsUpdatedManual: false,
    },
    {
      id: 1,
      serviceName: 'Telegram',
      projectName: '',
      comment: '',
      time: '04:33:20',
      timeIsUpdatedManual: false,
    },
    {
      id: 2,
      serviceName: 'Яндекс.Телемост',
      projectName: 'Сайт ТОГУ',
      comment: 'Встреча с заказчиком. Участники: Полякова Елизавета, Носов Даниил, Малышев Павел',
      time: '02:32:10',
      timeIsUpdatedManual: false,
    },
    {
      id: 3,
      serviceName: 'PHPStorm',
      projectName: 'Сайт ТОГУ',
      comment: 'Работа в директории: /home/projects/togu',
      time: '03:25:07',
      timeIsUpdatedManual: false,
    },
    {
      id: 4,
      serviceName: 'MS Excel',
      projectName: 'Сайт ТОГУ',
      comment: 'Работа в документе: список_студентов.xlsx',
      time: '03:25:07',
      timeIsUpdatedManual: false,
    },
    {
      id: 5,
      serviceName: 'Яндекс.Телемост',
      projectName: 'КУБ 2.0',
      comment: 'Встреча с командой. Участники: Максим Пиголицын, Никита Музыко, Михаил Карпухин',
      time: '02:32:10',
      timeIsUpdatedManual: false,
    },
    {
      id: 6,
      serviceName: 'PHPStorm',
      projectName: 'КУБ 2.0',
      comment: 'Работа в директории: /home/projects/cube',
      time: '03:25:07',
      timeIsUpdatedManual: false,
    },
  ];

  setComment(id: number, comment = '') {
    this.list = this.list.map(activity => {
      if (activity.id !== id) return activity;

      return {
        ...activity,
        comment,
      };
    });
  }

  setTime(id: number, time = '') {
    this.list = this.list.map(activity => {
      if (activity.id !== id) return activity;

      return {
        ...activity,
        time,
      };
    });
  }

  setTimeIsUpdatedManual(id: number, timeIsUpdatedManual = true) {
    this.list = this.list.map(activity => {
      if (activity.id !== id) return activity;

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
