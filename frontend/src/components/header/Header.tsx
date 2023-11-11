import React from "react";
import logo from "../../assets/logo.png";
import Input from "../ui/Input";
import Icon from "../ui/Icon";
import cn from "classnames";
import HeaderLink from "../header/HeaderLink";
import { Link } from "react-router-dom";
import menuItems from "../../constants/menuItems";
import Profile from "../profile/Profile";

interface HeaderProps {
  children: React.ReactNode;
}

const baseClassName = 'min-h-screen w-full bg-white flex flex-col';
const headerClassName = 'h-[80px] w-full flex justify-between gap-[120px] items-center px-[20px]';
const menuClassName = 'w-[100px] h-full pt-[60px] flex flex-col items-center gap-[20px]';
const childrenWrapperClassName = 'grow bg-light-gray p-[60px] rounded-tl-[60px]';
const logoBlockClassName = 'h-[50px]';
const logoClassName = 'h-full';
const inputBlockClassName = 'h-[35px] relative grow';
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
          <Link to={''}>
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
      <div className={'w-full flex grow'}>
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
