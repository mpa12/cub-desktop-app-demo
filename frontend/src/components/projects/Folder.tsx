import React from "react";
import Icon from "@ui/Icon";
import cn from "classnames";

interface FolderProps {
  name: string;
}

const folderClassName = cn('flex items-center flex-col rounded cursor-pointer',
  'p-[5px] hover:bg-gray-hover self-start max-w-[100px]');

const Folder = ({name}: FolderProps) => {
  return (
    <div className={folderClassName}>
      <Icon iconName={'folderImg'} className={'w-[50px]'}/>
      <p className={'text-[12px] text-center'}>{name}</p>
    </div>
  )
};

export default Folder;
