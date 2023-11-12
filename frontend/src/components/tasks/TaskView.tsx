import React, {useEffect, useState} from "react";
import ITask from "../../types/ITask";
import TaskDTO from "../../dto/TaskDTO";
import Icon from "../ui/Icon";
import cn from "classnames";
import User from "../user/User";

interface TaskViewProps {
  data: ITask;
  startHandler: () => void;
  pauseHandler: () => void;
  completeHandler: () => void;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px]';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow flex flex-col';
const rightContentWrapperClassName ='bg-light rounded-[10px] w-[300px]';
const taskDetailHeader = 'py-[20px] px-[10px] border-b-gray-hover border-b-[1px]';
const taskDetailContent = 'py-[20px] px-[10px] grow';
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
const taskDetailSidebarHeader = cn(taskDetailHeader, 'bg-green-hover rounded-t-[10px] border-b-[0]');
const taskDetailSidebarTr = cn(
  'text-[14px] border-b-[1px] border-b-gray-hover w-full text-left [&>th]:py-[7px] [&>td]:py-[7px]'
);
const userRoleClassName = 'w-full border-b-[1px] border-b-gray-hover [&>span]:text-[12px] my-[10px]';

const TaskView = ({
  data,
  startHandler,
  pauseHandler,
  completeHandler,
}: TaskViewProps) => {
  const taskDto = new TaskDTO(data);

  const [timeDelta, setTimeDelta] = useState(0);

  useEffect(() => {
    let interval = null;
    if (taskDto.canPause()) {
      interval = setInterval(() => {
        setTimeDelta(taskDto.getStartDelta());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [taskDto, timeDelta]);

  return (
    <div className={wrapperClassName}>
      <h1 className={titleClassName}>{taskDto.data.title}</h1>
      <div className={contentClassName}>
        <div className={leftContentWrapperClassName}>
          <div className={taskDetailHeader}>
            <span className={'text-[13px] text-gray'}>Задача № {taskDto.data.id} - {taskDto.getStatusText()}</span>
          </div>
          <div className={taskDetailContent}>
            {taskDto.data.description}
          </div>
          <div className={taskDetailButtons}>
            <span className={'text-[12px] flex gap-[5px] items-center'}>
              <Icon iconName={'clock'} className={'text-[10px] h-[13px]'} />
              {taskDto.getLeadTimeWithDelta(timeDelta)}
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

        <div className={rightContentWrapperClassName}>
          <div className={taskDetailSidebarHeader}>
            <span className={'text-[13px] text-light'}>Крайний срок - {taskDto.getDeadline()}</span>
          </div>
          <div className={taskDetailContent}>
            <table className={'w-full'}>
              <tbody className={'w-full'}>
              <tr className={taskDetailSidebarTr}>
                <th>Затрачено:</th>
                <td>{taskDto.getLeadTimeWithDelta(timeDelta)}</td>
              </tr>
              </tbody>
            </table>
            <div>
              <div key={'Постановщик'}>
                <div className={userRoleClassName}>
                  <span>Постановщик</span>
                </div>
                <User
                  imageUrl={taskDto.data.project_manager_info.photo}
                  username={taskDto.getProjectManagerInfo()}
                />
              </div>
              <div key={'Ответственный'}>
                <div className={userRoleClassName}>
                  <span>Ответственный</span>
                </div>
                <User
                  imageUrl={taskDto.data.project_manager_info.photo}
                  username={taskDto.getExecutorInfo()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
