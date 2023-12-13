import {getMonthName} from "@utils/convertTimeFormat";

function convertDateFormat(inputDate: string): string {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const day = date.getDate();
  const month = getMonthName(date.getMonth());

  return `${day} ${month} ${year}`;
}

export default convertDateFormat;
