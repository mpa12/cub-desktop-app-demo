import React, {useEffect, useState} from "react";
import getMonthData from "@utils/getMonthData";
import chunkArray from "@utils/chunkArray";
import getMonthName from "@utils/getMonthName";
import cn from "classnames";
import Icon from "@ui/Icon";
import getWeekNumberText from "@utils/getWeekNumberText";
import ICalendarData from "@cub-types/ICalendarData";
import CalendarRow from "@components/calendar/CalendarRow";
import CreateEventModal from "@components/calendar/CreateEventModal";
import CalendarService from "@services/CalendarService";
import LoaderSpinner from "@ui/LoaderSpinner";

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
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<ICalendarData[]>([]);
  const [modalData, setModalData] = useState<{
    date: Date;
    title?: string;
    description?: string;
    bgColor: string;
    textColor: string;
  }>({
    date: new Date(),
    title: '',
    description: '',
    bgColor: '#86e7af',
    textColor: '#0d592c',
  });

  const setSelectedDate = date => {
    setModalData({
      ...modalData,
      date
    })
  };

  const updateEventList = async () => {
    setLoading(true);

    try {
      const response = await CalendarService.index();
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateEventList().then(() => {});
  }, []);

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

  if (isLoading) {
    return (
      <div className={'w-full h-full flex items-center justify-center'}>
        <LoaderSpinner loading={isLoading} />
      </div>
    )
  }

  return (
    <>
      <CreateEventModal
        isOpen={createModalIsOpen}
        setIsOpen={setCreateModalIsOpen}
        data={modalData}
        setData={setModalData}
        updateEventList={updateEventList}
      />
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
          setSelectedDate={setSelectedDate}
          updateEventList={updateEventList}
        />
      })}
    </>
  );
};

export default Calendar;
