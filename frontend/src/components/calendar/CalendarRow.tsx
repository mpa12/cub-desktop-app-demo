import React from "react";
import cn from "classnames";
import Icon from "@ui/Icon";
import CalendarEvent from "@components/calendar/CalendarEvent";
import ICalendarData from "@cub-types/ICalendarData";
import ICalendarDay from "@cub-types/ICalendarDay";
import CalendarDate from "@components/calendar/CalendarDate";

interface CalendarRowProps {
  weekData: ICalendarDay[];
  weekDataIndex: number;
  isLastWeek: boolean;
  events: ICalendarData[];
  openCreateEventModal: () => void;
}

const CalendarRow = ({
  weekData,
  weekDataIndex,
  isLastWeek,
  events,
  openCreateEventModal,
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
        />;
      })}
    </div>
  );
};

export default CalendarRow;
