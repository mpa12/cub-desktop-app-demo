import React from "react";
import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  [key: string]: any;
}

const baseClassName = cn(
  'border-[1px] border-dark-gray rounded-[4px]',
  'focus:outline-none focus:border-purple focus:border-[2px]'
)

/**
 * Компонент Input.
 *
 * @param className дополнительные стимли
 * @param props
 * @constructor
 */
const Input = ({
  className,
  ...props
}: InputProps) => {
  return (
    <input
      type={'text'}
      className={cn(baseClassName, className)}
      placeholder={'Пароль'}
      {...props}
    />
  );
};

export default Input
