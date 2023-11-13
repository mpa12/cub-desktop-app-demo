import React, {useState} from "react";
import getMonthData from "@utils/getMonthData";
import chunkArray from "@utils/chunkArray";
import ICalendarDay from "@cub-types/ICalendarDay";
import getMonthName from "@utils/getMonthName";
import cn from "classnames";
import Icon from "@ui/Icon";
import getWeekNumberText from "@utils/getWeekNumberText";

interface CalendarRowProps {
  weekData: ICalendarDay[];
  weekDataIndex: number;
  isLastWeek: boolean;
}

const calendarDayClassName = cn(
  'w-[calc(100%/7)] border-[1px] border-t-0 border-gray-hover p-[10px] min-h-[100px] font-semibold',
);
const calendarHeader = cn(
  'p-[10px] rounded-t-[10px] border-[1px] border-gray-hover flex items-center justify-between'
);
const calendarHeaderButtons = 'flex items-center justify-between gap-[10px]';
const calendarHeaderButton = cn(
  'w-[30px] h-[30px] rounded-full border-[1px] border-gray text-gray hover:bg-gray hover:text-white',
  'cursor-pointer transition-all overflow-hidden flex items-center justify-center select-none'
);
const weekTitleWrapper = cn(
  'w-[calc(100%/7)] border-[1px] border-t-0 border-t-0 border-gray-hover p-[10px] text-xs text-gray',
  'overflow-hidden'
);

const Calendar = () => {
  const [calendarData, setCalendarData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const monthData = getMonthData(calendarData.month, calendarData.year);
  const chunkedMonthData = chunkArray(monthData, 7);

  const prevMonth = () => {
    let updatedMonth = calendarData.month - 1;
    let updatedYear = calendarData.year;

    if (updatedMonth < 1) {
      updatedMonth = 12;
      updatedYear--;
    }

    setCalendarData({
      month: updatedMonth,
      year: updatedYear,
    })
  }
  const nextMonth = () => {
    let updatedMonth = calendarData.month + 1;
    let updatedYear = calendarData.year;

    if (updatedMonth > 12) {
      updatedMonth = 1;
      updatedYear++;
    }

    setCalendarData({
      month: updatedMonth,
      year: updatedYear,
    })
  }

  const weekTitles = [0, 1, 2, 3, 4, 5, 6].map(getWeekNumberText);

  return (
    <>
      <div className={calendarHeader}>
        <div>
          <h3 className={'font-bold'}>Календарь событий</h3>
          <span className={'text-[14px] text-gray'}>{getMonthName(calendarData.month)} {calendarData.year}</span>
        </div>
        <div className={calendarHeaderButtons}>
          <div className={calendarHeaderButton} onClick={prevMonth}>
            <Icon iconName={'chevronLeft'} />
          </div>
          <div className={calendarHeaderButton} onClick={nextMonth}>
            <Icon iconName={'chevronRight'} />
          </div>
        </div>
      </div>
      <div className={'flex'}>
        {weekTitles.map(weekTitle => {
          return (
            <div className={weekTitleWrapper}>
              <span>{weekTitle}</span>
            </div>
          )
        })}
      </div>
      {chunkedMonthData.map((weekData, weekDataIndex) => {
        return <CalendarRow
          weekData={weekData}
          weekDataIndex={weekDataIndex}
          isLastWeek={weekDataIndex === (chunkedMonthData.length - 1)}
        />
      })}
    </>
  );
};

const CalendarRow = ({
  weekData,
  weekDataIndex,
  isLastWeek,
}: CalendarRowProps) => {
  return (
    <div className={'flex'} key={`week-${weekDataIndex}`}>
      {weekData.map((day, dayIndex) => {
        return (
          <div
            className={cn(calendarDayClassName, {
              ['border-r-0']: dayIndex !== 6,
              ['rounded-bl-[10px]']: isLastWeek && dayIndex === 0,
              ['rounded-br-[10px]']: isLastWeek && dayIndex === 6,
            })}
            key={`week-${weekDataIndex}-${dayIndex}`}
          >
            <span
              className={cn('select-none', {
                ['text-gray']: !day.isCurrentMonth,
              })}
            >{day.day.toString()}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Calendar;
