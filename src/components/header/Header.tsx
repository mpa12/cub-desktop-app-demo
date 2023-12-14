import React from "react";
import logo from "@assets/logo.png";
import Input from "@ui/Input";
import Icon from "@ui/Icon";
import cn from "classnames";
import HeaderLink from "./HeaderLink";
import { Link } from "react-router-dom";
import menuItems from "../../constants/menuItems";
import Profile from "../profile/Profile";

interface HeaderProps {
  children: React.ReactNode;
}

const baseClassName = 'min-h-screen w-full bg-white flex flex-col';
const headerClassName = 'h-[80px] w-full flex justify-between gap-[10px] lg:gap-[120px] items-center px-[20px]';
const menuClassName = cn(
  'w-full lg:w-[100px] p-[20px] lg:p-0 lg:pt-[60px] flex items-center gap-[20px] min-w-[100px]',
  'lg:flex-col flex-row justify-around sticky bottom-0 lg:static bg-white lg:h-full h-[80px] z-[999]'
);
const childrenWrapperClassName = cn(
  'grow bg-light-gray rounded-tl-0 lg:h-[calc(100vh-80px)] overflow-y-auto',
  'lg:rounded-tl-[60px] h-[calc(100vh-160px)] lg:px-[60px] py-[60px] px-[20px]'
);
const logoBlockClassName = 'h-[50px] shrink-0';
const logoClassName = 'h-full select-none';
const inputBlockClassName = 'h-[35px] relative grow lg:block hidden';
const inputClassName = cn(
  'pl-[35px] pr-[5px] border h-full w-[300px]',
  'bg-light !border-0 focus:!border-gray focus:!border-[1px]'
);
const inputIconClassName = cn(
  'absolute top-1/2 transform -translate-y-1/2 left-[10px]',
  'text-gray',
);

const Header = ({
  children,
}: HeaderProps) => {
  return (
    <div className={baseClassName}>
      <header className={headerClassName}>
        <div className={logoBlockClassName}>
          <Link to={'/cub-desktop-app-demo'}>
            <img src={logo} alt={'Логотип Эником Невада групп'} className={logoClassName} />
          </Link>
        </div>
        <div className={inputBlockClassName}>
          <Icon iconName={'search'} className={inputIconClassName} />
          <Input className={inputClassName} />
        </div>
        <div>
          <Profile/>
        </div>
      </header>
      <div className={'w-full flex grow lg:flex-row flex-col-reverse'}>
        <div className={menuClassName}>
          {menuItems.map(HeaderLink)}
        </div>
        <div className={childrenWrapperClassName}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Header;
