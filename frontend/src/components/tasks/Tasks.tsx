import React, {useState} from "react";
import TasksService from "../../services/TaskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  TasksService.index().then(console.log).catch(console.error)

  return (
    <h1>Список задач</h1>
  );
};

export default Tasks;
