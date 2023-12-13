import googleIcon from "@assets/apps/google.webp";
import telegramIcon from "@assets/apps/telegram.webp";
import telemostIcon from "@assets/apps/telemost.png";

class ActivityStore {
  defaultValue = [
    {
      name: 'Google',
      image: googleIcon,
      isChecked: true,
      comment: '',
      time: '01:23:01',
    },
    {
      name: 'Telegram',
      image: telegramIcon,
      isChecked: true,
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
}

export default new ActivityStore();
