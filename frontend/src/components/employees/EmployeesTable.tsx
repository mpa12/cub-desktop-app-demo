import React from "react";
import IProfileData from "@cub-types/IProfileData";
import Table, {IField} from "@ui/Table";
import ProfileModel from "@models/ProfileModel";
import Icon from "@ui/Icon";
import EmployeesKebabMenu from "@components/employees/EmployeesKebabMenu";

interface EmployeesTableProps {
  data: IProfileData[];
}

const wrapperClassName = 'w-full h-full grow self-stretch';

const EmployeesTable = ({ data }: EmployeesTableProps) => {
  const fields: IField[] = [
    {
      label: 'Фамилия и имя',
      getValue: (data: IProfileData) => {
        const model = new ProfileModel(data);

        if (!model.data.first_name && !model.data.last_name) {
          return <span className={'text-red'}>Нет данных</span>
        }

        return model.getName();
      }
    },
    {
      label: 'E-mail',
      getValue: (data: IProfileData) => {
        return data.email || <span className={'text-red'}>Нет данных</span>;
      }
    },
    {
      label: 'Должность',
      getValue: (data: IProfileData) => {
        const model = new ProfileModel(data);

        return model.getRoleName();
      }
    },
    {
      label: 'Пол',
      getValue: (data: IProfileData) => {
        const model = new ProfileModel(data);

        return model.getSex();
      }
    },
    {
      label: '',
      getValue: (data: IProfileData) => {
        return <EmployeesKebabMenu data={data} />;
      }
    },
  ];

  return (
    <div className={wrapperClassName}>
      <Table data={data} fields={fields} />
    </div>
  );
};

export default EmployeesTable;
