import React from "react";

interface OptionProps {
  data: any;
  title: string;
  value: any;
}

interface SelectProps {
  optionComponent?: ({data, title, value}: OptionProps) => React.JSX.Element;
  items: OptionProps[];
}

const Select = ({
  optionComponent = Option,
  items,
} : SelectProps) => {
  return (
    <div>

    </div>
  );
};

const Option = ({data, title, value}: OptionProps) => {
  return (
    <div></div>
  )
}

export default Select;
