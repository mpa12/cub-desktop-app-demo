import googleIcon from "@assets/apps/google.webp";
import telegramIcon from "@assets/apps/telegram.webp";
import telemostIcon from "@assets/apps/telemost.png";
import phpstormIcon from "@assets/apps/phpstorm.svg";
import excelIcon from "@assets/apps/excel.svg";
import {action, makeObservable, observable} from "mobx";

export interface ActivityApp {
  name: string;
  image: string;
  isChecked: boolean;
}

class ActivityAppsStorage {
  constructor() {
    makeObservable(this, {
      apps: observable,
      setIsChecked: action,
      setApps: action,
    });
  }

  apps: ActivityApp[] = [
    {
      name: 'Google',
      image: googleIcon,
      isChecked: true,
    },
    {
      name: 'Telegram',
      image: telegramIcon,
      isChecked: true,
    },
    {
      name: 'Яндекс.Телемост',
      image: telemostIcon,
      isChecked: true,
    },
    {
      name: 'PHPStorm',
      image: phpstormIcon,
      isChecked: true,
    },
    {
      name: 'MS Excel',
      image: excelIcon,
      isChecked: true,
    },
  ];

  setIsChecked(name: string, isChecked = true) {
    this.apps = this.apps.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        isChecked,
      };
    });
  }

  setApps(apps: ActivityApp[]) {
    this.apps = apps;
  }
}

export default new ActivityAppsStorage();
