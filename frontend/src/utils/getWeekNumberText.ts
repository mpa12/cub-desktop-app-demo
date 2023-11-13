function getWeekNumberText(weekNumber: number): string {
  return [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ][weekNumber];
}

export default getWeekNumberText;
