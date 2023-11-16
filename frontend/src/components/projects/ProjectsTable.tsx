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
    // {
    //   label: 'Крайний срок',
    //   getValue: (data: IProject) => {
    //     const projectDto = new ProjectModel(data);
    //     return projectDto.getDeadline();
    //   }
    // },
    // // {
    // //   label: 'Проект',
    // //   getValue: (data: IProject) => data.project_info.title
    // // },
    // {
    //   label: 'Статус',
    //   getValue: (data: IProject) => {
    //     const projectDto = new ProjectModel(data);
    //
    //     const text = projectDto.getStatusText();
    //     const color = projectDto.getStatusColor();
    //
    //     return <span
    //       style={{background: color}}
    //       className={'px-[5px] py-[2px] rounded-[11px] text-white'}
    //     >{text}</span>;
    //   }
    // },
    // {
    //   label: 'Время выполнения',
    //   getValue: (data: IProject) => {
    //     const projectDto = new ProjectModel(data);
    //     return projectDto.getLeadTime();
    //   }
    // },
  ];

  return (
    <div className={wrapperClassName}>
      <Table data={data} fields={fields}/>
    </div>
  );
};

export default ProjectsTable;
