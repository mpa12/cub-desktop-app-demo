import React, {useEffect, useState} from "react";
import ITask from "@cub-types/task/ITask";
import TaskModel from "@models/TaskModel";
import Icon from "../ui/Icon";
import cn from "classnames";
import User from "../user/User";
import IProfileData from "@cub-types/IProfileData";
import AuthService from "@services/AuthService";
import ProfileModel from "@models/ProfileModel";
import {Link} from "react-router-dom";

interface TaskViewProps {
  data: ITask;
  startHandler: () => void;
  pauseHandler: () => void;
  completeHandler: () => void;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px] lg:flex-row flex-col-reverse';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow flex flex-col';
const rightContentWrapperClassName ='bg-light rounded-[10px] lg:w-[300px] w-full';
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

const taskDetailToolbar = 'w-full p-[10px] flex gap-[5px] items-center';
const taskDetailToolbarButton = cn(
  'group w-[30px] h-[30px] rounded-[3px] border-[1px] border-gray hover:bg-gray-hover cursor-pointer',
  'flex items-center justify-center active:bg-gray select-none'
);
const taskDetailToolbarButtonIcon = 'h-[20px] text-gray group-active:text-gray-hover';

const TaskView = ({
  data,
  startHandler,
  pauseHandler,
  completeHandler,
}: TaskViewProps) => {
  const [profileData, setProfileData] = useState<IProfileData>();

  const taskDto = new TaskModel(data);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.profileData();
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then();
  }, []);

  const userModel = new ProfileModel(profileData);

  return (
    <div className={wrapperClassName}>
      <h1 className={titleClassName}>{taskDto.data.title}</h1>
      <div className={contentClassName}>
        <div className={leftContentWrapperClassName}>
          <div className={taskDetailHeader}>
            <span className={'text-[13px] text-gray'}>Задача № {taskDto.data.id} - {taskDto.getStatusText()}</span>
          </div>
          <div className={taskDetailContent}>
            <div dangerouslySetInnerHTML={{ __html: taskDto.data.description }}/>
          </div>
          <div className={taskDetailButtons}>
            <span className={'text-[12px] flex gap-[5px] items-center'}>
              <Icon iconName={'clock'} className={'text-[10px] h-[13px]'} />
              {taskDto.getLeadTimeWithDelta(taskDto.canPause() ? timeDelta: 0)}
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
          {(
            userModel.data?.id &&
            userModel.data.id === taskDto.data?.project_manager_info?.id
          ) && (
            <div className={taskDetailToolbar}>
              <Link to={`/tasks/update/${taskDto.data.id}`}>
                <div className={taskDetailToolbarButton} title={'Редактировать'}>
                  <Icon iconName={'pencil'} className={taskDetailToolbarButtonIcon} />
                </div>
              </Link>
            </div>
          )}
          <div className={taskDetailContent}>
            <table className={'w-full'}>
              <tbody className={'w-full'}>
              <tr className={taskDetailSidebarTr}>
                <th>Затрачено:</th>
                <td>{taskDto.getLeadTimeWithDelta(taskDto.canPause() ? timeDelta: 0)}</td>
              </tr>
              </tbody>
            </table>
            <div>
              <div key={'Постановщик'}>
                <div className={userRoleClassName}>
                  <span>Постановщик</span>
                </div>
                <User
                  imageUrl={taskDto.getProjectManagerPhotoSrc()}
                  username={taskDto.getProjectManagerName()}
                />
              </div>
              <div key={'Ответственный'}>
                <div className={userRoleClassName}>
                  <span>Ответственный</span>
                </div>
                <User
                  imageUrl={taskDto.getExecutorPhotoSrc()}
                  username={taskDto.getExecutorName()}
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
