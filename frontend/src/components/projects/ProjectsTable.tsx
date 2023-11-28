import React from "react";
import IProject from "@cub-types/IProject";
import Table, {IField} from "@ui/Table";
import {Link} from "react-router-dom";
import convertTimeFormat from "@utils/convertTimeFormat";

interface ProjectsTableProps {
  data: IProject[];
}

const wrapperClassName = 'w-full h-full grow self-stretch';
const linkClassName = 'text-blue hover:text-blue-hover'

const ProjectsTable = ({data}: ProjectsTableProps) => {
  const fields: IField[] = [
    {
      label: 'Название',
      getValue: (data: IProject) => {
        const linkPath = `/projects/${data.id}`;
        return (
          <Link to={linkPath} className={linkClassName}>{data.title}</Link>
        )
      }
    },
    {
      label: 'Руководитель',
      getValue: (data: IProject) => {
        const {
          last_name,
          first_name,
        } = data.leader_info;

        return `${last_name} ${first_name}`;
      }
    },
    {
      label: 'Заказчик',
      getValue: (data: IProject) => {
        if (!data.customer_info) return;

        return `${data.customer_info?.title} (${data.customer_info?.header_name})`;
      }
    },
    {
      label: 'Дата начала',
      getValue: (data: IProject) => {
        return convertTimeFormat(data.start_date)
      }
    },
    {
      label: 'Дата конца',
      getValue: (data: IProject) => {
        return convertTimeFormat(data.stop_date)
      }
    },
  ];

  return (
    <div className={wrapperClassName}>
      <Table data={data} fields={fields}/>
    </div>
  );
};

export default ProjectsTable;
