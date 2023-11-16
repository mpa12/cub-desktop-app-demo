import React, {useEffect, useState} from "react";
import IProject from "../../types/IProject";
import ProjectDTO from "../../dto/ProjectDTO";
import Icon from "../ui/Icon";
import cn from "classnames";
import User from "../user/User";
import defaultProfile from "@assets/default_profile.png";

interface ProjectViewProps {
  data: IProject;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px]';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow flex flex-col';
const rightContentWrapperClassName = 'bg-light rounded-[10px] w-[300px]';
const projectDetailHeader = 'py-[20px] px-[10px] border-b-gray-hover border-b-[1px]';
const projectDetailContent = 'py-[20px] px-[10px] grow';
const projectDetailButtons = 'py-[20px] px-[10px] border-t-gray-hover border-t-[1px] flex flex-wrap gap-[10px]';
// Кнопка без цвета
const projectViewButtonClassName = 'px-[15px] py-[7px] rounded-[7px]';
// Зеленая кнопка
const projectViewButtonGreenClassName = cn(
  projectViewButtonClassName,
  'bg-green hover:bg-green-hover text-light'
);
// Серая кнопка
const projectViewButtonGrayClassName = cn(
  projectViewButtonClassName,
  'bg-light-gray hover:bg-light-gray-hover text-dark-gray border-gray border-[1px]'
);
const projectDetailSidebarHeader = cn(projectDetailHeader, 'bg-green-hover rounded-t-[10px] border-b-[0]');
const projectDetailSidebarTr = cn(
  'text-[14px] border-b-[1px] border-b-gray-hover w-full text-left [&>th]:py-[7px] [&>td]:py-[7px]'
);
const userRoleClassName = 'w-full border-b-[1px] border-b-gray-hover [&>span]:text-[12px] my-[10px]';

const ProjectView = ({
                       data
                     }: ProjectViewProps) => {
  const projectDto = new ProjectDTO(data);

  const [timeDelta, setTimeDelta] = useState(0);

  // useEffect(() => {
  //   let interval = null;
  //   if (projectDto.canPause()) {
  //     interval = setInterval(() => {
  //       setTimeDelta(projectDto.getStartDelta());
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [projectDto, timeDelta]);

  return (
    <div className={wrapperClassName}>
      <h1 className={titleClassName}>{projectDto.data.title}</h1>
      <div className={contentClassName}>
        <div className={leftContentWrapperClassName}>
          <div className={projectDetailHeader}>
            {/*<span className={'text-[13px] text-gray'}>Задача № {projectDto.data.id} - {projectDto.getStatusText()}</span>*/}
          </div>
          {/*<div className={projectDetailContent}>*/}
          {/*  {projectDto.data.description}*/}
          {/*</div>*/}
          <div className={projectDetailButtons}>
            <span className={'text-[12px] flex gap-[5px] items-center'}>
              <Icon iconName={'clock'} className={'text-[10px] h-[13px]'}/>
              {/*{projectDto.getLeadTimeWithDelta(timeDelta)}*/}
            </span>
          </div>
        </div>

        <div className={rightContentWrapperClassName}>
          <div className={projectDetailSidebarHeader}>
            {/*<span className={'text-[13px] text-light'}>Крайний срок - {projectDto.getDeadline()}</span>*/}
          </div>
          <div className={projectDetailContent}>
            {/*<table className={'w-full'}>*/}
            {/*  <tbody className={'w-full'}>*/}
            {/*  <tr className={projectDetailSidebarTr}>*/}
            {/*    <th>Затрачено:</th>*/}
            {/*    <td>{projectDto.getLeadTimeWithDelta(timeDelta)}</td>*/}
            {/*  </tr>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
            <div>
              <div key={'Руководитель'}>
                <div className={userRoleClassName}>
                  <span>Руководитель</span>
                </div>
                <div className={wrapperClassName}>
                  <div>
                    <p>{data.leader_info.last_name + ' ' + data.leader_info.first_name + ' ' + data.leader_info.midl_name}</p>
                    <p>({data.leader_info.username})</p>
                  </div>
                </div>
                {/*<User*/}
                {/*  imageUrl={projectDto.getProjectManagerPhotoSrc()}*/}
                {/*  username={projectDto.getProjectManagerName()}*/}
                {/*/>*/}
              </div>
              <div key={'Заказчик'}>
                <div className={userRoleClassName}>
                  <span>Заказчик</span>
                </div>
                <div className={wrapperClassName}>
                  <div>
                    <p>{data.customer_info.header_name}</p>
                    <p>{data.customer_info.email}</p>
                    <p>{data.customer_info.phone_number}</p>
                  </div>
                </div>
                {/*<User*/}
                {/*  imageUrl={projectDto.getExecutorPhotoSrc()}*/}
                {/*  username={projectDto.getExecutorName()}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
