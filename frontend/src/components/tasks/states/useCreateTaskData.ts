import { useState } from "react";
import ITaskCreate from "@cub-types/task/ITaskCreate";

const useCreateTaskData = () => {
  const [taskData, setTaskData] = useState<ITaskCreate>({
    title: undefined,
    description: undefined,
    executor_id: undefined,
    project_id: undefined,
    deadline: undefined,
  });

  const setTaskTitle = (title) => {
    setTaskData({
      ...taskData,
      title
    });
  };

  const setTaskDescription = (description) => {
    setTaskData({
      ...taskData,
      description
    });
  };

  const setTaskDeadline = (deadline) => {
    setTaskData({
      ...taskData,
      deadline
    });
  };

  const setExecutorId = (executor_id) => {
    setTaskData({
      ...taskData,
      executor_id
    });
  };

  const setProjectId = (project_id) => {
    setTaskData({
      ...taskData,
      project_id
    });
  };

  return {
    taskData,
    setTaskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
    setExecutorId,
    setProjectId,
  };
};

export default useCreateTaskData;
