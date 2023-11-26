import React, {MouseEvent, useEffect, useRef, useState} from "react";
import IProfileData from "@cub-types/IProfileData";
import Icon from "@ui/Icon";
import cn from "classnames";

interface EmployeesKebabMenuProps {
  data: IProfileData;
}

const menuClassName = cn(
  'absolute flex flex-col bg-white border-gray-hover border-[1px] top-[20px] right-[5px]',
  'rounded-[5px] py-[5px] w-[200px] z-50'
);
const menuItemClassName = cn(
  'w-full py-[5px] px-[10px] hover:bg-light-gray active:bg-light-gray-hover select-none cursor-pointer'
);

const EmployeesKebabMenu = ({ data }: EmployeesKebabMenuProps) => {
  const ref = useRef<HTMLDivElement | null>();
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOutside = (event: MouseEvent | Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    const handleClickOutsideEventListener = (event: MouseEvent | Event) => handleClickOutside(event);

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutsideEventListener);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideEventListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEventListener);
    };
  }, [isOpened]);

  return (
    <div className={'relative'} ref={ref}>
      <Icon
        iconName={'threeDotsVertical'}
        className={'h-[15px] ml-auto cursor-pointer select-none'}
        onClick={() => {setIsOpened(!isOpened)}}
      />
      {isOpened && (
        <div className={menuClassName}>
          <span className={menuItemClassName}>Задачи сотрудника</span>
        </div>
      )}
    </div>
  );
};

export default EmployeesKebabMenu;
