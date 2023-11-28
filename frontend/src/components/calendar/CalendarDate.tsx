import React from "react";
import cn from "classnames";
import Icon from "@ui/Icon";
import CalendarEvent from "@components/calendar/CalendarEvent";
import ICalendarData from "@cub-types/ICalendarData";
import ICalendarDay from "@cub-types/ICalendarDay";

interface CalendarDateProps {
  day: ICalendarDay;
  dayIndex: number;
  events: ICalendarData[];
  weekDataIndex: number;
  isLastWeek: boolean;
  openCreateEventModal: () => void;
  openUpdateEventModal: () => void;
  setSelectedDate: (newDate: Date) => void;
  updateEventList: () => Promise<void>;
  setUpdateModalData: (data: {
    id: number;
    date: Date;
    title?: string;
    description?: string;
    bgColor: string;
    textColor: string;
  }) => void;
}

const calendarDayClassName = cn(
  'group/day w-[calc(100%/7)] border-[1px] border-t-0 border-gray-hover p-[10px] min-h-[100px] font-semibold',
  'relative hover:bg-gray-hover',
);
const calendarDayNumberClassName = 'select-none absolute';
const calendarEventsWrapperClassName = 'relative top-[30px] mb-[30px] flex flex-col gap-[5px]';
const plusButtonClassName = cn(
  'absolute invisible group-hover/day:visible top-[10px] right-[10px]',
  '[&>svg]:text-dark-gray [&>svg]:cursor-pointer hover:[&>svg]:text-gray'
);

const CalendarDate = ({
  day,
  dayIndex,
  events,
  weekDataIndex,
  isLastWeek,
  openCreateEventModal,
  openUpdateEventModal,
  setSelectedDate,
  updateEventList,
  setUpdateModalData,
}: CalendarDateProps) => {
  const currentEvents = events
    .filter(event => {
      const date = new Date(event.start_datetime);
      const isoDate = date.toISOString().split('T')[0];
      return isoDate === day.isoDate;
    });

  const onAdd = () => {
    setSelectedDate(new Date(day.isoDate));
    openCreateEventModal();
  };

  return (
    <div
      className={cn(calendarDayClassName, {
        ['border-r-0']: dayIndex !== 6,
        ['rounded-bl-[10px]']: isLastWeek && dayIndex === 0,
        ['rounded-br-[10px]']: isLastWeek && dayIndex === 6,
        ['bg-light-green']: day.isCurrentMonth && dayIndex >= 5,
        ['bg-light-green-hover']: !day.isCurrentMonth && dayIndex >= 5,
      })}
      key={`week-${weekDataIndex}-${dayIndex}`}
    >
      <span
        className={cn(calendarDayNumberClassName, {
          ['text-gray']: !day.isCurrentMonth,
        })}
      >{day.day.toString()}</span>
      <div className={plusButtonClassName}>
        <Icon
          iconName={'plusCircle'}
          title={'Добавить событие'}
          onClick={onAdd}
        />
      </div>
      {
        (!!currentEvents.length && (
          <div className={calendarEventsWrapperClassName}>
            {currentEvents.map(event => {
              return <CalendarEvent
                event={event}
                modalPosition={dayIndex > 4 ? 'left' : 'right'}
                updateEventList={updateEventList}
                openUpdateEventModal={openUpdateEventModal}
                setUpdateModalData={setUpdateModalData}
                key={`CalendarEvent-${event.id}`}
              />;
            })}
          </div>
        ))
      }
    </div>
  );
};

export default CalendarDate;
