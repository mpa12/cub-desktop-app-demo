import React, {useState} from "react";
import IProject from "@cub-types/IProject";
import ProjectModel from "@models/ProjectModel";
import cn from "classnames";
import Folder from "@components/projects/Folder";
import File from "@components/projects/File";
import FromFolderBackToProjectButton from "@ui/FromFolderBackToProjectButton";
import convertTimeFormat from "@utils/convertTimeFormat";
import Breadcrumbs from "@components/projects/Breadcrumbs";

interface ProjectViewProps {
  data: IProject;
}

const wrapperClassName = 'w-full h-full self-stretch';
const titleClassName = 'font-bold text-[25px] mb-[10px]';
const contentClassName = 'flex items-stretch gap-[14px] lg:flex-row flex-col-reverse';
const leftContentWrapperClassName = 'bg-light rounded-[10px] grow flex flex-col';
const rightContentWrapperClassName = 'bg-light rounded-[10px] lg:w-[300px] w-full';
const projectDetailHeader = 'py-[20px] px-[10px] border-b-gray-hover border-b-[1px]';
const projectDetailContent = 'py-[20px] px-[20px] grow flex flex-wrap gap-[20px]';
const projectDetailContentRight = 'pb-[10px] px-[20px] grow flex flex-wrap gap-[20px]';
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

const backButtonClassName = cn(
  'absolute right-0 top-0 mr-[10px] mt-[10px]',
  projectViewButtonGrayClassName
);

const titleWithButtonClassName = cn('flex gap-[20px] pb-[10px]');


const ProjectView = (
  {
    data
  }: ProjectViewProps) => {
  const projectDto = new ProjectModel(data);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const folderName = selectedFolderId ? projectDto.data.folders.find(f => f.id === selectedFolderId)?.name : null;

  const handleProjectClick = () => {
    setSelectedFolderId(null);
  };

  const selectFolder = (folderId) => {
    setSelectedFolderId(folderId);
  };

  const isFolderSelected = selectedFolderId !== null;
  const selectedFolderFiles = isFolderSelected
    ? projectDto.data.files.filter(file => file.folder === selectedFolderId)
    : [];

  return (
    <div className={wrapperClassName}>
      <div className={titleWithButtonClassName}>
        <Breadcrumbs projectName={projectDto.data.title} folderName={folderName} onProjectClick={handleProjectClick} />
      </div>
      <div className={contentClassName}>
        <div className={leftContentWrapperClassName}>
          <div className={wrapperClassName}>
            <div className={projectDetailContent}>
              {isFolderSelected ? (
                <>
                  {selectedFolderFiles.map(file => <File fileUrl={file.file} key={file.id} name={file.name}/>)}
                </>
              ) : (
                <>
                  {projectDto.data.folders.map(folder => (
                    <div key={folder.id} onClick={() => selectFolder(folder.id)}>
                      <Folder name={folder.name}/>
                    </div>
                  ))}
                  {projectDto.data.files.filter(file => file.folder == null).map(file => (
                    <File fileUrl={file.file} key={file.id} name={file.name}/>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={rightContentWrapperClassName}>
          <div className={projectDetailContentRight}>
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
              </div>
              <div key={'Заказчик'}>
                <div className={userRoleClassName}>
                  <span>Заказчик</span>
                </div>
                <div className={wrapperClassName}>
                  <div>
                    <p>{data.customer_info?.header_name}</p>
                    <p>{data.customer_info?.email}</p>
                    <p>{data.customer_info?.phone_number}</p>
                  </div>
                </div>
              </div>
              <div key={'Дата начала'}>
                <div className={userRoleClassName}>
                  <span>Дата начала</span>
                </div>
                <div className={wrapperClassName}>
                  <div>
                    <p>{convertTimeFormat(data?.start_date)}</p>
                  </div>
                </div>
              </div>
              <div key={'Дата завершения'}>
                <div className={userRoleClassName}>
                  <span>Дата завершения</span>
                </div>
                <div className={wrapperClassName}>
                  <div>
                    <p>{convertTimeFormat(data?.stop_date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
