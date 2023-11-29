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
import TaskComments from "@components/tasks/TaskComments";

interface TaskViewProps {
  data: ITask;
  startHandler: () => void;
  pauseHandler: () => void;
  completeHandler: () => void;
  getTaskData: () => Promise<void>;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px] lg:flex-row flex-col-reverse';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow flex flex-col';
const rightContentWrapperClassName ='bg-light rounded-[10px] lg:w-[300px] w-full h-fit';
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
  getTaskData,
}: TaskViewProps) => {
  const [profileData, setProfileData] = useState<IProfileData>();

  const taskModel = new TaskModel(data);

  const [timeDelta, setTimeDelta] = useState(0);

  useEffect(() => {
    let interval = null;
    if (taskModel.canPause()) {
      interval = setInterval(() => {
        setTimeDelta(taskModel.getStartDelta());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [taskModel, timeDelta]);

  const getProfileData = async () => {
    try {
      const response = await AuthService.profileData();
      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileData().then();
  }, []);

  const userModel = new ProfileModel(profileData);

  return (
    <div className={wrapperClassName}>
      <h1 className={titleClassName}>{taskModel.data.title}</h1>
      <div className={contentClassName}>
        <div className={'grow flex flex-col gap-[14px]'}>
          <div className={leftContentWrapperClassName}>
            <div className={taskDetailHeader}>
              <span className={'text-[13px] text-gray'}>Задача № {taskModel.data.id} - {taskModel.getStatusText()}</span>
            </div>
            <div className={taskDetailContent}>
              <div dangerouslySetInnerHTML={{ __html: taskModel.data.description }}/>
            </div>
            <div className={taskDetailButtons}>
            <span className={'text-[12px] flex gap-[5px] items-center'}>
              <Icon iconName={'clock'} className={'text-[10px] h-[13px]'} />
              {taskModel.getLeadTimeWithDelta(taskModel.canPause() ? timeDelta: 0)}
            </span>
              {taskModel.canStart() && (
                <button
                  className={taskViewButtonGreenClassName}
                  onClick={startHandler}
                >Начать учет времени</button>
              )}
              {taskModel.canPause() && (
                <button
                  className={taskViewButtonGreenClassName}
                  onClick={pauseHandler}
                >Поставить на паузу</button>
              )}
              {taskModel.canComplete() && (
                <button
                  className={taskViewButtonGreenClassName}
                  onClick={completeHandler}
                >Завершить задачу</button>
              )}
            </div>
          </div>

          <TaskComments taskModel={taskModel} getTaskData={getTaskData} />
        </div>

        <div className={rightContentWrapperClassName}>
          <div className={taskDetailSidebarHeader}>
            <span className={'text-[13px] text-light'}>Крайний срок - {taskModel.getDeadline()}</span>
          </div>
          {(
            userModel.data?.id &&
            userModel.data.id === taskModel.data?.project_manager_info?.id
          ) && (
            <div className={taskDetailToolbar}>
              <Link to={`/tasks/update/${taskModel.data.id}`}>
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
                <td>{taskModel.getLeadTimeWithDelta(taskModel.canPause() ? timeDelta: 0)}</td>
              </tr>
              </tbody>
            </table>
            <div>
              <div key={'Постановщик'}>
                <div className={userRoleClassName}>
                  <span>Постановщик</span>
                </div>
                <User
                  imageUrl={taskModel.getProjectManagerPhotoSrc()}
                  username={taskModel.getProjectManagerName()}
                />
              </div>
              <div key={'Ответственный'}>
                <div className={userRoleClassName}>
                  <span>Ответственный</span>
                </div>
                <User
                  imageUrl={taskModel.getExecutorPhotoSrc()}
                  username={taskModel.getExecutorName()}
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
