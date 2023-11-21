interface ITaskCreate {
  title?: string;
  description?: string;
  executor_id?: number;
  project_id?: number;
  deadline?: string;
}

export default ITaskCreate;
