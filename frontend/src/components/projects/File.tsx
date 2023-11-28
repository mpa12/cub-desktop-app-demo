import React from "react";
import Icon from "@ui/Icon";
import cn from "classnames";

interface FileProps {
  name: string;
  fileUrl: string;
}

const fileClassName = cn('flex items-center flex-col rounded cursor-pointer',
  'p-[5px] hover:bg-gray-hover self-start max-w-[100px] gap-[2px]');

const File = ({name, fileUrl}: FileProps) => {
  const baseUrl = 'http://localhost:8000';

  return (
    <div>
      <a className={fileClassName} href={`${baseUrl}${fileUrl}`} target="_blank" rel="noopener noreferrer">
        <Icon iconName={'file'} className={'w-[50px]'}/>
        <p className={'text-[12px] text-center'}>{name}</p>
      </a>
    </div>
  )
};

export default File;
