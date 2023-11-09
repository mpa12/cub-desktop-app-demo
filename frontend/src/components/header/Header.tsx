import React from "react";
import logo from "../../assets/logo.png";
import Input from "../ui/Input";
import Icon from "../ui/Icon";
import cn from "classnames";

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
          <img src={logo} alt={'Логотип Эником Невада групп'} className={logoClassName} />
        </div>
        <div className={inputBlockClassName}>
          <Icon iconName={'search'} className={inputIconClassName} />
          <Input className={inputClassName} />
        </div>
        <div>
          Профиль
        </div>
      </header>
      <div className={'w-full flex grow'}>
        <div className={menuClassName}>
          <span>Item#1</span>
          <span>Item#2</span>
          <span>Item#3</span>
        </div>
        <div className={childrenWrapperClassName}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Header;
