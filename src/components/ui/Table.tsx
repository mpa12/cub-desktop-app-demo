import React from "react";
import cn from "classnames";

export interface IField {
  label: string;
  getValue: ({}) => string | React.JSX.Element
}

interface TableProps {
  data: {}[];
  fields: IField[];
}

const tableClassName = 'w-full text-sm text-left rtl:text-right text-gray-500';
const theadClassName = 'text-xs text-gray-700 uppercase bg-gray-50';
const thClassName = 'px-6 py-3';
const trClassName = 'border-t border-t-gray-hover hover:bg-gray-hover';
const tdClassName = 'px-6 py-4';

const Table = ({
  data,
  fields
}: TableProps) => {
  return (
    <table className={tableClassName}>
      <thead className={theadClassName}>
      <tr>
        {(fields).map((field, index) => (
          <th
            className={thClassName}
            key={`item-th-${index}`}
          >{field.label}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((item, index) => {
        return (
          <tr className={trClassName} key={`item-tr-${index}`}>
            {(fields).map((field, fieldIndex) => {
              const value = field.getValue(item);

              return <td
                key={`item-td-${index}-${fieldIndex}`}
                className={tdClassName}
              >{value}</td>
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  );
};

export default Table;
