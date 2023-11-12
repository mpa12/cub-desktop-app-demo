import React from "react";
import ITask from "../../types/ITask";
import TaskDTO from "../../dto/TaskDTO";
import Icon from "../ui/Icon";
import cn from "classnames";

interface TaskViewProps {
  data: ITask;
  startHandler: () => void;
  pauseHandler: () => void;
  completeHandler: () => void;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px]';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow';
const rightContentWrapperClassName ='bg-light rounded-[10px] w-[300px]';
const taskDetailHeader = 'py-[20px] px-[10px] border-b-gray-hover border-b-[1px]';
const taskDetailContent = 'py-[20px] px-[10px]';
const taskDetailButtons = 'py-[20px] px-[10px] border-t-gray-hover border-t-[1px] flex flex-wrap gap-[10px]';
// Кнопка без цвета
const taskViewButtonClassName = 'px-[15px] py-[7px] rounded-[7px]';
// Зеленая кнопка
const taskViewButtonGreenClassName = cn(
  taskViewButtonClassName,
  'bg-green hover:bg-green-hover text-light'
);
// Серая кнопка
const taskViewButtonGrayClassName = cn(
  taskViewButtonClassName,
  'bg-light-gray hover:bg-light-gray-hover text-dark-gray border-gray border-[1px]'
);

const TaskView = ({
  data,
  startHandler,
  pauseHandler,
  completeHandler,
}: TaskViewProps) => {
  const taskDto = new TaskDTO(data);

  return (
    <div className={wrapperClassName}>
      <h1 className={titleClassName}>{taskDto.data.title}</h1>
      <div className={contentClassName}>
        <div className={leftContentWrapperClassName}>
          <div className={taskDetailHeader}>
            <span className={'text-[14x] text-gray'}>Задача № {taskDto.data.id} - {taskDto.getStatusText()}</span>
          </div>
          <div className={taskDetailContent}>
            {taskDto.data.description}
          </div>
          <div className={taskDetailButtons}>
            <span className={'text-[12px] flex gap-[5px] items-center'}>
              <Icon iconName={'clock'} className={'text-[10px] h-[13px]'} />
              {taskDto.getLeadTime()}
            </span>
            {taskDto.canStart() && (
              <button
                className={taskViewButtonGreenClassName}
                onClick={startHandler}
              >Начать учет времени</button>
            )}
            {taskDto.canPause() && (
              <button
                className={taskViewButtonGreenClassName}
                onClick={pauseHandler}
              >Поставить на паузу</button>
            )}
            {taskDto.canComplete() && (
              <button
                className={taskViewButtonGreenClassName}
                onClick={completeHandler}
              >Завершить задачу</button>
            )}
          </div>
        </div>

        <div className={rightContentWrapperClassName}></div>
      </div>
    </div>
  );
};

export default TaskView;
