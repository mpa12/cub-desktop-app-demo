import React from "react";
import {Link} from "react-router-dom";
import Icon from "./Icon";
import cn from "classnames";

interface FromFolderBackToProjectButtonProps {
  to: string;
  onClick?: () => void;
}

const backButtonClassName = cn(
  'bg-white px-[15px] py-[7px] rounded-[7px] hover:bg-gray-hover flex w-fit',
  'items-center justify-center gap-[10px] group'
);
const arrowClassName = 'relative group-hover:left-[-5px]'

const FromFolderBackToProjectButton = ({to, onClick}: FromFolderBackToProjectButtonProps) => {
  return (
    <div className={'mb-[10px]'}>
      <Link to={to} onClick={onClick} className={backButtonClassName}>
        <Icon iconName={'arrowLeft'} className={arrowClassName}/>
        Назад к проекту
      </Link>
    </div>
  );
};

export default FromFolderBackToProjectButton;
