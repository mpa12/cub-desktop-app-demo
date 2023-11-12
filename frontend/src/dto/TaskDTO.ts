import ITask from "../types/ITask";

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

  /**
   * Получение времени выполнения задачи.
   */
  getLeadTime(): string {
    return this.data.time && this.data.time.split('.')[0] || '00:00:00'
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
}

export default TaskDTO;
