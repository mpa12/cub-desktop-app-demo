import IComment from "@cub-types/task/IComment";

interface ITask {
  id: number;
  title: string;
  description: string;
  executor_info: {
    first_name: string;
    last_name: string;
    photo?: string;
  };
  project_manager_info: {
    id: number;
    first_name: string;
    last_name: string;
    photo?: string;
  };
  status: 'stopped' | 'paused' | 'new' | 'in_work';
  task_files: string[];
  due_date: null;
  project_info: {
    id: number;
    title: string;
    leader_info: {
      first_name: string;
      last_name: string;
      photo?: string;
    };
    customer_info: {
      photo?: string;
    };
    start_date: string;
    stop_date: string;
  };
  is_paused: boolean;
  is_stopped: boolean;
  time: string;
  comments: IComment[];
  start_timestamp?: string;
  start_time?: string;
}

export default ITask;
