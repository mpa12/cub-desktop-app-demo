import React from "react";
import ICalendarData from "@cub-types/ICalendarData";
import cn from "classnames";
import Icon from "@ui/Icon";
import CalendarService from "@services/CalendarService";

interface CalendarEventProps {
  event: ICalendarData;
  modalPosition?: 'left' | 'right';
  updateEventList?: () => Promise<void>;
  openUpdateEventModal?: () => void;
  setUpdateModalData?: (data: {
    id: number;
    date: Date;
    title?: string;
    description?: string;
    bgColor: string;
    textColor: string;
  }) => void;
}

const calendarEventWrapperClassName = 'group border-l-[2px] px-[4px] relative';
const calendarEventClassName = 'text-xs select-none';
const modalInvisibleWrapperClassName = 'z-50 absolute invisible group-hover:visible px-[5px] top-0';
const modalWrapperClassName = cn(
  'rounded-[5px] border-[1px] bg-light-gray border-gray w-[200px] p-[5px]',
);
const eventTitle = 'text-xs mb-[5px]';
const eventDescription = 'text-xs text-gray';
const deleteButtonClassName = 'ml-auto hover:text-gray cursor-pointer h-[15px]';

const CalendarEvent = ({
  event,
  modalPosition = 'right',
  updateEventList,
  openUpdateEventModal,
  setUpdateModalData,
}: CalendarEventProps) => {
  const removeHandler = async () => {
    await CalendarService.delete(event.id);
    updateEventList().then();
  };

  const updateHandler = async () => {
    const response = await CalendarService.view(event.id);
    const data = response.data[0] as ICalendarData;

    setUpdateModalData({
      id: event.id,
      date: new Date(data.start_datetime),
      title: data.title,
      description: data.description,
      bgColor: data.bg_color,
      textColor: data.text_color,
    });
    openUpdateEventModal();
  };

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
          <div className={'flex gap-[5px] w-fit ml-auto'}>
            {event?.id && (
              <Icon
                iconName={'pencil'}
                className={deleteButtonClassName}
                onClick={updateHandler}
                title={'Редактировать'}
              />
            )}
            {event?.id && (
              <Icon
                iconName={'trash'}
                className={deleteButtonClassName}
                onClick={removeHandler}
                title={'Удалть'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEvent;
