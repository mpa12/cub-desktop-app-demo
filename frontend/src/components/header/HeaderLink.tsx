import React from "react";
import { ICONS } from "../../assets/icons";
import Icon from "../ui/Icon";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";

export interface HeaderLinkProps {
  title: string;
  path: string;
  iconName: keyof typeof ICONS;
}

const wrapperClassName = cn(
  'group w-[40px] h-[40px] flex justify-center items-center rounded-full',
  'hover:bg-green-hover transition-all cursor-pointer',
);
const iconClassName = cn(
  'group-hover:scale-[1.1] transition-all group-hover:text-light text-gray',
  'w-[20px] h-[20px]'
);
const wrapperClassNameActive = 'bg-green-hover';
const iconClassNameActive = 'text-light scale-[1.1]';

const HeaderLink = ({
  title,
  path,
  iconName,
}: HeaderLinkProps) => {
  const location = useLocation();

  const isCurrentRoute = location.pathname === path;

  return (
    <Link to={path} key={`HeaderLink-${title}`} title={title}>
      <div className={cn(wrapperClassName, {
        [wrapperClassNameActive]: isCurrentRoute
      })}>
        <Icon iconName={iconName} className={cn(iconClassName, {
          [iconClassNameActive]: isCurrentRoute
        })} />
      </div>
    </Link>
  )
};

export default HeaderLink;
