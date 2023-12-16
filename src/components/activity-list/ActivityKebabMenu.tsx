import React, {MouseEvent, useEffect, useRef, useState} from "react";
import Icon from "@ui/Icon";
import cn from "classnames";
import { Activity } from "@stores/ActivityStore";

interface ActivityKebabMenuProps {
  data: Activity;
  updateComment: () => void;
  updateTime: () => void;
}

const menuClassName = cn(
  'fixed flex flex-col bg-white border-gray-hover border-[1px] top-[20px] right-[5px]',
  'rounded-[5px] py-[5px] w-fit z-50'
);
const menuItemClassName = cn(
  'w-full py-[5px] px-[10px] hover:bg-light-gray active:bg-light-gray-hover select-none cursor-pointer'
);

const ActivityKebabMenu = ({ data, updateComment, updateTime }: ActivityKebabMenuProps) => {
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

  const button = ref.current?.children[0]?.getBoundingClientRect();
  const menu = ref.current?.children[1]?.getBoundingClientRect();

  const _updateComment = () => {
    updateComment();
    setIsOpened(false);
  };

  const _updateTime = () => {
    updateTime();
    setIsOpened(false);
  };

  return (
    <div className={'relative'} ref={ref}>
      <Icon
        iconName={'threeDotsVertical'}
        className={'h-[15px] ml-auto cursor-pointer select-none'}
        onClick={() => {setIsOpened(!isOpened)}}
      />
      <div className={cn(menuClassName, {
        ['invisible']: !isOpened,
      })} style={{
        top: (button?.y + button?.height) || 0,
        left: (button?.x - menu?.width) || 0,
      }}>
        <span className={menuItemClassName} onClick={_updateComment}>Редактировать описание</span>
        <span className={menuItemClassName} onClick={_updateTime}>Редактировать время</span>
      </div>
    </div>
  );
};

export default ActivityKebabMenu;
