import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ITask from "../../types/ITask";
import TasksService from "../../services/TaskService";
import LoaderSpinner from "../ui/LoaderSpinner";
import BackButton from "../ui/BackButton";
import TaskView from "../tasks/TaskView";

const wrapperClassName = 'flex items-center justify-center min-h-full flex-col gap-[20px]';
const notFoundLabel = 'font-bold text-[20px]';
const contentWrapperClassName = 'grow flex items-center justify-center w-full';

const Task = () => {
  const { id: taskId } = useParams();

  const [task, setTask] = useState<ITask>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await TasksService.view(taskId);
      setTask(response.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(() => {});
  }, []);

  const startHandler = async () => {
    try {
      await TasksService.start(taskId);
      fetchData().then(() => {})
    } catch (error) {
      console.error(error);
    }
  }

  const pauseHandler = async () => {
    try {
      await TasksService.pause(taskId);
      fetchData().then(() => {})
    } catch (error) {
      console.error(error);
    }
  }

  const completeHandler = async () => {
    try {
      await TasksService.complete(taskId);
      fetchData().then(() => {})
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={wrapperClassName}>
      <BackButton to={'/tasks'} />
      <div className={contentWrapperClassName}>
        {isLoading && <LoaderSpinner loading={isLoading} />}
        {(!isLoading && !task) && <TaskNotFound />}
        {(!isLoading && !!task) && <TaskView
            data={task}
            startHandler={startHandler}
            pauseHandler={pauseHandler}
            completeHandler={completeHandler}
        />}
      </div>
    </div>
  );
};

const TaskNotFound = () => {
  return (
    <h1 className={notFoundLabel}>Задача не найдена</h1>
  );
};

export default Task;
