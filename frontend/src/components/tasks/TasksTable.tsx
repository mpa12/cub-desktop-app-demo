import React from "react";
import ITask from "../../types/ITask";
import Table, { IField } from "../ui/Table";
import {Link} from "react-router-dom";
import convertTimeFormat from "../../utils/convertTimeFormat";

interface TasksTableProps {
  data: ITask[];
}

const wrapperClassName = 'w-full h-full grow self-stretch';
const linkClassName = 'text-blue hover:text-blue-hover'

const TasksTable = ({
  data
}: TasksTableProps) => {
  const fields: IField[] = [
    {
      label: 'Название',
      getValue: (data: ITask) => {
        const linkPath = `/tasks/${data.id}`;
        return (
          <Link to={linkPath} className={linkClassName}>{data.title}</Link>
        )
      }
    },
    {
      label: 'Крайний срок',
      getValue: (data: ITask) => convertTimeFormat(data.due_date)
    },
    {
      label: 'Проект',
      getValue: (data: ITask) => data.project_info.title
    },
    {
      label: 'Время выполнения',
      getValue: (data: ITask) => data.time && data.time.split('.')[0] || '00:00:00'
    },
  ];

  return (
    <div className={wrapperClassName}>
      <Table data={data} fields={fields} />
    </div>
  );
};

export default TasksTable;
