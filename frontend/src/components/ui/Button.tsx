import React from "react";
import cn from "classnames";

interface ButtonProps {
  type?: 'green' | 'light-gray';
  onClick: () => void;
  title: string;
  className?: string;
}

// Кнопка без цвета
const taskViewButtonClassName = 'px-[15px] py-[7px] rounded-[7px]';
// Зеленая кнопка
const taskViewButtonGreenClassName = cn(
  taskViewButtonClassName,
  'bg-green hover:bg-green-hover text-light'
);
// Серая кнопка
const taskViewButtonGrayClassName = cn(
  taskViewButtonClassName,
  'bg-light-gray hover:bg-light-gray-hover text-dark-gray border-gray border-[1px]'
);

const Button = ({ type = 'light-gray', onClick, title, className = '' }: ButtonProps) => {
  const buttonClassName = {
    green: taskViewButtonGreenClassName,
    'light-gray': taskViewButtonGrayClassName,
  }[type];

  return (
    <button
      className={cn(buttonClassName, className)}
      onClick={onClick}
    >{title}</button>
  );
};

export default Button;
