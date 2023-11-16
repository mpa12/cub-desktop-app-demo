import React from "react";
import ICalendarData from "@cub-types/ICalendarData";
import ICalendarDay from "@cub-types/ICalendarDay";
import CalendarDate from "@components/calendar/CalendarDate";

interface CalendarRowProps {
  weekData: ICalendarDay[];
  weekDataIndex: number;
  isLastWeek: boolean;
  events: ICalendarData[];
  openCreateEventModal: () => void;
  setSelectedDate: (newDate: Date) => void;
  updateEventList: () => Promise<void>;
}

const CalendarRow = ({
  weekData,
  weekDataIndex,
  isLastWeek,
  events,
  openCreateEventModal,
  setSelectedDate,
  updateEventList,
}: CalendarRowProps) => {
  return (
    <div className={'flex'} key={`week-${weekDataIndex}`}>
      {weekData.map((day, dayIndex) => {
        return <CalendarDate
          day={day}
          dayIndex={dayIndex}
          weekDataIndex={weekDataIndex}
          isLastWeek={isLastWeek}
          events={events}
          openCreateEventModal={openCreateEventModal}
          setSelectedDate={setSelectedDate}
          updateEventList={updateEventList}
        />;
      })}
    </div>
  );
};

export default CalendarRow;
