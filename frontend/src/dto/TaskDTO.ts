import ITask from "../types/ITask";
import convertTimeFormat from "../utils/convertTimeFormat";

class TaskDTO {
  constructor(public data: ITask) {
  }

  getStatusText(): string {
    const ENUMS = {
      'stopped': 'Завершена',
      'paused': 'Остановлена',
      'new': 'Новая',
      'in_work': 'В работе',
    };

    return ENUMS[this.data.status] || 'Статус не определен';
  }

  getStatusColor(): string {
    const ENUMS = {
      'stopped': '#c45b5b',
      'paused': '#e7ab3f',
      'new': '#d5d55b',
      'in_work': '#56b956',
    };

    return ENUMS[this.data.status] || '#c0bcbc';
  }

  /**
   * Получение времени выполнения задачи.
   */
  getLeadTime(): string {
    return this.data.time && this.data.time.split('.')[0] || '00:00:00'
  }

  getLeadTimeWithDelta(secondsToAdd) {
    const timeString = this.getLeadTime();

    const timeComponents = timeString.split(':').map(Number);

    // Распаковываем компоненты времени
    const [hours, minutes, seconds] = timeComponents;

    // Преобразуем время в секунды
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    // Добавляем секунды
    const newTotalTimeInSeconds = totalTimeInSeconds + secondsToAdd;

    // Рассчитываем новые значения часов, минут и секунд
    const newHours = Math.floor(newTotalTimeInSeconds / 3600) % 24;
    const newMinutes = Math.floor((newTotalTimeInSeconds % 3600) / 60);
    const newSeconds = Math.floor(newTotalTimeInSeconds % 60);

    const hoursStr = String(newHours).padStart(2, '0');
    const minutesStr = String(newMinutes).padStart(2, '0');
    const secondsStr = String(newSeconds).padStart(2, '0');

    // Форматируем результат
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  canStart(): boolean {
    return ['paused', 'new'].includes(this.data.status)
      && !['in_work', 'stopped'].includes(this.data.status);
  }

  canComplete(): boolean {
    return this.data.status !== 'stopped';
  }

  canPause(): boolean {
    return this.data.status === 'in_work';
  }

  getStartDelta(): number {
    if (!this.data?.start_timestamp) return 0;

    // Парсим строку с целевым временем
    const targetDate  = new Date('2023-11-12T06:46:01.069Z');

    // Получаем текущее время в миллисекундах
    const currentTime: Date = new Date();

    // Рассчитываем разницу в миллисекундах
    const timeDifference: number = targetDate.getTime() - currentTime.getTime();

    // Переводим разницу в секунды
    const secondsDifference: number = Math.floor(timeDifference / 1000);

    return Math.abs(secondsDifference);
  }

  getDeadline(): string {
    return convertTimeFormat(this.data.due_date);
  }

  getProjectManagerName(): string {
    return `${this.data.project_manager_info.first_name} ${this.data.project_manager_info.last_name}`
  }

  getProjectManagerPhotoSrc(): string {
    if (!this.data.project_manager_info.photo) return;

    const url = this.data.project_manager_info.photo.substring(1);

    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }

  getExecutorName(): string {
    return `${this.data.executor_info.first_name} ${this.data.executor_info.last_name}`
  }

  getExecutorPhotoSrc(): string {
    if (!this.data.executor_info.photo) return;

    const url = this.data.executor_info.photo.substring(1);

    return `${process.env.REACT_APP_API_BASE_URL}${url}`
  }
}

export default TaskDTO;
