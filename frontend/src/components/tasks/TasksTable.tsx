import React from "react";
import ITask from "@cub-types/task/ITask";
import Table, { IField } from "@ui/Table";
import {Link} from "react-router-dom";
import TaskModel from "@models/TaskModel";

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
      getValue: (data: ITask) => {
        const taskDto = new TaskModel(data);
        return taskDto.getDeadline();
      }
    },
    {
      label: 'Проект',
      getValue: (data: ITask) => data.project_info.title
    },
    {
      label: 'Постановщик',
      getValue: (data: ITask) => {
        const taskDto = new TaskModel(data);
        return taskDto.getProjectManagerName();
      }
    },
    {
      label: 'Исполнитель',
      getValue: (data: ITask) => {
        const taskDto = new TaskModel(data);
        return taskDto.getExecutorName();
      }
    },
    {
      label: 'Статус',
      getValue: (data: ITask) => {
        const taskDto = new TaskModel(data);

        const text = taskDto.getStatusText();
        const color = taskDto.getStatusColor();

        return <span
          style={{background: color}}
          className={'px-[5px] py-[2px] rounded-[11px] text-white'}
        >{text}</span>;
      }
    },
    {
      label: 'Время выполнения',
      getValue: (data: ITask) => {
        const taskDto = new TaskModel(data);
        return taskDto.getLeadTime();
      }
    },
  ];

  return (
    <div className={wrapperClassName}>
      <Table data={data} fields={fields} />
    </div>
  );
};

export default TasksTable;
