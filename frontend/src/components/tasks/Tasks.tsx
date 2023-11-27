import React, {useState, useEffect} from "react";
import TasksService from "@services/TaskService";
import TasksNotFound from "@components/tasks/TasksNotFound";
import TasksTable from "@components/tasks/TasksTable";
import LoaderSpinner from "@ui/LoaderSpinner";
import cn from "classnames";
import ITask from "@cub-types/task/ITask";
import {Link} from "react-router-dom";
import Button from "@ui/Button";
import AuthService from "@services/AuthService";
import IProfileData from "@cub-types/IProfileData";
import ProfileModel from "@models/ProfileModel";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const dataWrapperClassName = cn(
  'w-full min-h-[300px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);

const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [profile, setProfile] = useState<IProfileData>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await AuthService.profileData();
        setProfile(profileData.data);

        const userModel = new ProfileModel(profileData.data);

        // TODO: Сделать разделение на запросы
        if (userModel.isAdmin()) {
          const response = await TasksService.index();
          setTasks(response.data);
        } else if (userModel.isManager()) {
          const response = await TasksService.index();
          setTasks(response.data);
        } else {
          const response = await TasksService.index();
          setTasks(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(() => {});
  }, []);

  const profileModel = new ProfileModel(profile);

  return (
    <>
      <h1 className={titleClassName}>Список задач</h1>
      {profileModel.canCreateTask() && (
        <Link to={`/tasks/create`}>
          <Button
            title={'Создать задачу'}
            colorType={'green'}
            onClick={() => {}}
            className={'mb-[15px]'}
          />
        </Link>
      )}
      <div className={dataWrapperClassName}>
        {isLoading && <LoaderSpinner loading={isLoading} />}
        {(!isLoading && !tasks.length) && <TasksNotFound />}
        {(!isLoading && !!tasks.length) && <TasksTable data={tasks} />}
      </div>
    </>
  );
};

export default Tasks;
