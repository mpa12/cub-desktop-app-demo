import React, {useState, useEffect} from "react";
import TasksService from "@services/TaskService";
import TasksNotFound from "@components/tasks/TasksNotFound";
import TasksTable from "@components/tasks/TasksTable";
import LoaderSpinner from "@ui/LoaderSpinner";
import cn from "classnames";
import ITask from "@cub-types/task/ITask";
import {Link} from "react-router-dom";
import Button from "@ui/Button";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const dataWrapperClassName = cn(
  'w-full min-h-[300px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TasksService.index();
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(() => {});
  }, []);

  return (
    <>
      <h1 className={titleClassName}>Список задач</h1>
      <Link to={`/tasks/create`}>
        <Button
          title={'Создать задачу'}
          type={'green'}
          onClick={() => {}}
          className={'mb-[15px]'}
        />
      </Link>
      <div className={dataWrapperClassName}>
        {isLoading && <LoaderSpinner loading={isLoading} />}
        {(!isLoading && !tasks.length) && <TasksNotFound />}
        {(!isLoading && !!tasks.length) && <TasksTable data={tasks} />}
      </div>
    </>
  );
};

export default Tasks;
