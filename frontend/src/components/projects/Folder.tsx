import React from "react";
import Icon from "@ui/Icon";

interface FolderProps {
  name: string;
}

const folderClassName = 'flex items-center flex-col rounded cursor-pointer p-[5px] hover:bg-gray-hover self-start';

const Folder = ({name}: FolderProps) => {
  return (
    <div className={folderClassName}>
      <Icon iconName={'folderImg'} className={'w-[50px]'}/>
      <p className={'text-[12px]'}>{name}</p>
    </div>
  )
};

export default Folder;
