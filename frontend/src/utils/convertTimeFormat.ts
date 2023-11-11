export function getMonthName(month: number): string {
  const monthNames = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
  ];

  return monthNames[month];
}

function convertTimeFormat(inputTime: string): string {
  const date = new Date(inputTime);

  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${day} ${month}, ${hours}:${minutes}`;
}

export default convertTimeFormat;
