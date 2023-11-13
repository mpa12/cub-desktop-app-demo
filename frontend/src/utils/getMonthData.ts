import ICalendarDay from "@cub-types/ICalendarDay";

function getMonthData(month: number, year: number): ICalendarDay[] {
  const result = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // День недели первого числа месяца

  // Заполнение предыдущего месяца
  let prevMonth = month - 1;
  let prevYear = year;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear--;
  }
  const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
  const startDay = daysInPrevMonth - firstDayOfWeek + 2; // +2, чтобы первый день был понедельник

  for (let day = startDay; day <= daysInPrevMonth; day++) {
    result.push({ day, weekDay: (result.length) % 7, isCurrentMonth: false });
  }

  // Заполнение текущего месяца
  for (let day = 1; day <= daysInMonth; day++) {
    result.push({ day, weekDay: (result.length) % 7, isCurrentMonth: true });
  }

  // Заполнение следующего месяца
  let nextMonth = month + 1;
  let nextYear = year;
  if (nextMonth === 13) {
    nextYear++;
  }
  const daysToAdd = 6 - result[result.length - 1].weekDay; // Дни, которые нужно добавить из следующего месяца

  for (let day = 1; day <= daysToAdd; day++) {
    result.push({ day, weekDay: (result.length) % 7, isCurrentMonth: false });
  }

  return result;
}

export default getMonthData;
