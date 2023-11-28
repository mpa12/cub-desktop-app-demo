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

const CalendarRow = ({
  weekData,
  weekDataIndex,
  isLastWeek,
  events,
  openCreateEventModal,
  openUpdateEventModal,
  setSelectedDate,
  updateEventList,
  setUpdateModalData,
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
          openUpdateEventModal={openUpdateEventModal}
          setSelectedDate={setSelectedDate}
          updateEventList={updateEventList}
          setUpdateModalData={setUpdateModalData}
          key={`CalendarDate-${dayIndex}`}
        />;
      })}
    </div>
  );
};

export default CalendarRow;
