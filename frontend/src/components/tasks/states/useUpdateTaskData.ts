import useCreateTaskData from "@components/tasks/states/useCreateTaskData";
import {useEffect, useState} from "react";
import TasksService from "@services/TaskService";
import useProjects from "@stores/useProjects";
import useAllUsers from "@stores/useAllUsers";

const useUpdateTaskData = (taskId: string) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    taskData,
    setTaskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
    setExecutorId,
    setProjectId,
  } = useCreateTaskData();

  const fetchData = async () => {
    try {
      const response = await TasksService.view(taskId);
      setTaskData({
        title: response.data.title,
        description: response.data.description,
        executor_id: response.data.executor_info.id.toString(),
        project_id: response.data.project_info.id.toString(),
        deadline: response.data.due_date,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(() => {});
  }, []);

  return {
    taskData,
    setTaskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
    setExecutorId,
    setProjectId,
    taskDataIsFetching: isLoading
  }
};

export default useUpdateTaskData;
