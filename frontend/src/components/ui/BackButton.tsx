import React from "react";
import {Link} from "react-router-dom";
import Icon from "./Icon";
import cn from "classnames";

interface BackButtonProps {
  to: string;
}

const backWrapperClassName = 'w-full';
const backButtonClassName = cn(
  'border-[1px] border-gray px-[15px] py-[7px] rounded-[7px] hover:bg-gray-hover flex w-fit',
  'items-center justify-center gap-[10px] group'
);
const arrowClassName = 'relative group-hover:left-[-5px]'

const BackButton = ({ to }: BackButtonProps) => {
  return (
    <div className={backWrapperClassName}>
      <Link to={to} className={backButtonClassName}>
        <Icon iconName={'arrowLeft'} className={arrowClassName} />
        Назад
      </Link>
    </div>
  );
};

export default BackButton;
