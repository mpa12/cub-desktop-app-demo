import ITaskCreate from "@cub-types/task/ITaskCreate";

class TaskValidator {
  public static validate(data: ITaskCreate) {
    const errors = {
      title: [],
      description: [],
      executor_id: [],
      project_id: [],
      deadline: [],
    };

    if (!data.title) {
      errors.title.push('Обязательное поле');
    }

    if (!data.description) {
      errors.description.push('Обязательное поле');
    }

    if (!data.executor_id) {
      errors.executor_id.push('Обязательное поле');
    }

    if (!data.project_id) {
      errors.project_id.push('Обязательное поле');
    }

    return {
      errors,
      isValid: Object.values(errors).every(value => !value.length)
    };
  }
}

export default TaskValidator;
