import ICalendarDay from "@cub-types/ICalendarDay";

function getMonthData(month: number, year: number): ICalendarDay[] {
  const calendarData = [];
  const firstDay = new Date(year, month - 1, 1, 12);
  const lastDay = new Date(year, month, 0);
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Начинаем с понедельника
  const daysInMonth = lastDay.getDate();

  // Добавляем дни предыдущего месяца, если начало месяца не с понедельника
  const prevMonthLastDay = new Date(year, month - 1, 0, 12).getDate();
  for (let i = startDay; i > 0; i--) {
    const prevMonthDate = new Date(year, month - 2, prevMonthLastDay - i + 1);
    calendarData.push({
      day: prevMonthDate.getDate(),
      weekDay: prevMonthDate.getDay(),
      isCurrentMonth: false,
      isoDate: prevMonthDate.toISOString().split('T')[0],
    });
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month - 1, i, 12);
    calendarData.push({
      day: i,
      weekDay: currentDate.getDay(),
      isCurrentMonth: true,
      isoDate: currentDate.toISOString().split('T')[0],
    });
  }

  // Добавляем дни следующего месяца, если конец месяца не на воскресенье
  const endDay = lastDay.getDay() === 0 ? 0 : 7 - lastDay.getDay();
  for (let i = 1; i <= endDay; i++) {
    const nextMonthDate = new Date(year, month, i, 12);
    calendarData.push({
      day: nextMonthDate.getDate(),
      weekDay: nextMonthDate.getDay(),
      isCurrentMonth: false,
      isoDate: nextMonthDate.toISOString().split('T')[0],
    });
  }

  return calendarData;
}

export default getMonthData;
