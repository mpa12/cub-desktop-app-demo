import React, {useState} from "react";
import getMonthData from "@utils/getMonthData";
import chunkArray from "@utils/chunkArray";
import getMonthName from "@utils/getMonthName";
import cn from "classnames";
import Icon from "@ui/Icon";
import getWeekNumberText from "@utils/getWeekNumberText";
import ICalendarData from "@cub-types/ICalendarData";
import CalendarRow from "@components/calendar/CalendarRow";
import CreateEventModal from "@components/calendar/CreateEventModal";

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
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const events: ICalendarData[] = [
    {
      title: 'Meeting 1',
      description: 'Discuss project details',
      start_datetime: '2023-11-15T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#c52a2a',
      bg_color: '#e1a2a2',
    },
    {
      title: 'Meeting 2',
      description: 'Discuss project details',
      start_datetime: '2023-11-15T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#5631e1',
      bg_color: '#9d90c4',
    },
    {
      title: 'Meeting 3',
      description: 'Discuss project details',
      start_datetime: '2023-11-18T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#3eaf00',
      bg_color: '#b7ceaa',
    },
    {
      title: 'Meeting 4',
      description: 'Discuss project details',
      start_datetime: '2023-11-15T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#66be34',
      bg_color: '#b7ceaa',
    },
    {
      title: 'Meeting 5',
      description: 'Discuss project details',
      start_datetime: '2023-11-19T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#66be34',
      bg_color: '#b7ceaa',
    },
    {
      title: 'Meeting 6',
      description: 'Discuss project details',
      start_datetime: '2023-11-15T10:00:00.000Z',
      end_datetime: '2023-11-15T12:00:00.000Z',
      text_color: '#66be34',
      bg_color: '#b7ceaa',
    },
    {
      title: 'Lunch with Team Lunch with Team Lunch with Team',
      description: 'Informal team gathering',
      start_datetime: '2023-11-16T12:30:00.000Z',
      end_datetime: '2023-11-16T13:30:00.000Z',
      text_color: '#632bb7',
      bg_color: '#8572a2',
    },
    {
      title: 'Workshop',
      description: 'Training session on new tools',
      start_datetime: '2023-11-17T09:00:00.000Z',
      end_datetime: '2023-11-17T16:00:00.000Z',
      text_color: '#6c5c0d',
      bg_color: '#beb37a',
    },
  ]

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
      <CreateEventModal isOpen={createModalIsOpen} setIsOpen={setCreateModalIsOpen} />
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
            <div className={weekTitleWrapper} key={`weekTitle-${weekTitle}`}>
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
          events={events}
          openCreateEventModal={setCreateModalIsOpen.bind(null, true)}
        />
      })}
    </>
  );
};

export default Calendar;
