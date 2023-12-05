import {ICONS} from "@assets/icons";
import {Link} from "react-router-dom";
import Icon from "@ui/Icon";
import React from "react";

export interface ServicePanProps {
  title: string;
  iconName: keyof typeof ICONS;
  path: string;
}

const ServicePan = ({
  title,
  iconName,
  path,
}: ServicePanProps) => {
  return (
    <Link to={path} className={'bg-white rounded-[10px] p-[20px] h-[150px] relative hover:shadow-md hover:top-[-5px] transition cursor-pointer'}>
      <h3>{title}</h3>
      <div className={'w-[50px] h-[50px] rounded-[5px] bg-gray-hover flex items-center justify-center absolute bottom-[20px] right-[20px]'}>
        <Icon iconName={iconName} className={'text-gray'} />
      </div>
    </Link>
  );
};

export default ServicePan;
