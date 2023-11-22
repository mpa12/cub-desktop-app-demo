import React from "react";
import Icon from "@ui/Icon";

interface FileProps {
  name: string;
}

const fileClassName = 'flex items-center flex-col rounded cursor-pointer p-[5px] hover:bg-gray-hover self-start';

const File = ({name}: FileProps) => {
  return (
    <div className={fileClassName}>
      <Icon iconName={'file'} className={'w-[50px]'}/>
      <p className={'text-[12px]'}>{name}</p>
    </div>
  )
};

export default File;
