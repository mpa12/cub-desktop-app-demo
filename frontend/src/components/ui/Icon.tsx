import React from "react";
import { getIcon, ICONS } from "../../assets/icons";

interface IconProps {
  iconName: keyof typeof ICONS;
  [key: string]: any;
}

const Icon = ({ iconName, ...props }: IconProps) => {
  return <React.Fragment>{(getIcon(iconName, props))}</React.Fragment>
};

export default Icon;
