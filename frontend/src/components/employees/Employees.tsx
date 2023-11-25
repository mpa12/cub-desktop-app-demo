import React from "react";
import useAllUsers from "@stores/useAllUsers";
import LoaderSpinner from "@ui/LoaderSpinner";
import cn from "classnames";
import EmployeesTable from "@components/employees/EmployeesTable";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const dataWrapperClassName = cn(
  'w-full min-h-[300px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);
const Employees = () => {
  const { allUsersState } = useAllUsers();

  return (
    <div>
      <h1 className={titleClassName}>Список сотрудников</h1>
      <div className={dataWrapperClassName}>
        {allUsersState.isLoading && <LoaderSpinner loading={allUsersState.isLoading} />}
        {!allUsersState.isLoading && <EmployeesTable data={allUsersState.data} />}
      </div>
    </div>
  );
};

export default Employees;
