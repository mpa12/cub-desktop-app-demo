import React from "react";
import ICalendarData from "@cub-types/ICalendarData";
import cn from "classnames";

interface CalendarEventProps {
  event: ICalendarData;
  modalPosition?: 'left' | 'right';
}

const calendarEventWrapperClassName = 'group border-l-[2px] px-[4px] relative';
const calendarEventClassName = 'text-xs select-none';
const modalInvisibleWrapperClassName = 'z-50 absolute invisible group-hover:visible px-[5px] top-0';
const modalWrapperClassName = cn(
  'rounded-[5px] border-[1px] bg-light-gray border-gray w-[200px] p-[5px]',
);
const eventTitle = 'text-xs mb-[5px]';
const eventDescription = 'text-xs text-gray';

const CalendarEvent = ({
  event,
  modalPosition = 'right',
}: CalendarEventProps) => {
  return (
    <div
      className={calendarEventWrapperClassName}
      style={{
        background: event.bg_color,
        borderColor: event.text_color,
      }}
      key={`event-${event.title}`}
    >
      <span className={calendarEventClassName} style={{
        color: event.text_color
      }}>{event.title}</span>
      <div className={cn(modalInvisibleWrapperClassName, {
        ['left-full']: modalPosition === 'right',
        ['right-full']: modalPosition === 'left'
      })}>
        <div className={modalWrapperClassName}>
          <h5 className={eventTitle}>{event.title}</h5>
          <p className={eventDescription}>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
