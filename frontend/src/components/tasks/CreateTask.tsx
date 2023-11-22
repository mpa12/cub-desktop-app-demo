import React, {useState} from "react";
import Input from "@ui/Input";
import FileService from "@services/FileService";
import UploadHandler from "@cub-types/tinymce/UploadHandler";
import Button from "@ui/Button";
import { Link } from "react-router-dom";
import TinyEditor from "@ui/TinyEditor";
import useCreateTaskData from "@components/tasks/states/useCreateTaskData";
import cn from "classnames";
import useProjects from "@stores/useProjects";
import Select from 'react-select'
import TaskValidator from "../../validators/TaskValidator";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const inputTitleClassName = '!border-0 outline-0 w-full px-[20px] py-[10px] !rounded-[10px]';
const linkedFilesClassName = 'w-full gap-[5px] flex-wrap';
const buttonsWrapperClassName = ' w-full mt-[7px] flex gap-[5px]';
const inputBlockClassName = 'flex gap-[5px] items-center mt-[7px]';
const inputBlockLabelClassName = 'w-[250px]';

const CreateTask = () => {
  const {
    taskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
    setExecutorId,
    setProjectId,
  } = useCreateTaskData();

  const [formErrors, setFormErrors] = useState({
    title: [],
    description: [],
    executor_id: [],
    project_id: [],
    deadline: [],
  });

  const {
    projectsState
  } = useProjects();

  // TODO: Сделать получение сотрудников с пипихи

  const handleImageUpload: UploadHandler = async (blobInfo, progress) => {
    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());

    try {
      const response = await FileService.uploadImage(
        formData,
        (event) => {
          const percentage = Math.round((event.loaded * 100) / event.total);
          progress(percentage); // Оповещаем о ходе загрузки
        }
      );

      return response.data.location;
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      throw new Error('Ошибка при загрузке изображения');
    }
  };

  const options: { label: string; value: string }[] = [
    { value: '1', label: 'Максим Пиголицын' },
    { value: '2', label: 'Михаил Карпухин' },
    { value: '3', label: 'Музыко Никита' }
  ];

  const projectsOptions: { label: string; value: string }[] = projectsState.data
    .map(project => ({
      value: project.id.toString(),
      label: project.title
    }));

  const findSelectedOption = (selectedValue, option) => {
    return option.value === selectedValue;
  };

  const createHandler = () => {
    const validator = TaskValidator.validate(taskData);

    setFormErrors(validator.errors);

    if (!validator.isValid) return;
  };

  return (
    <div>
      <h3 className={titleClassName}>Новая задача</h3>
      <div>
        <Input
          placeholder={'Введите название задачи'}
          className={cn(inputTitleClassName, {
            ['border-red !border-[1px]']: formErrors.title.length
          })}
          value={taskData.title}
          onChange={evt => {
            setTaskTitle(evt.target.value);
          }}
        />
        <div className={'flex flex-col mb-[7px]'}>
          {formErrors.title.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`title-${errorTitle}`}
            />
          })}
        </div>
        <TinyEditor
          value={taskData.description}
          setValue={setTaskDescription}
          init={{
            placeholder: 'Описание задачи',
            images_upload_handler: handleImageUpload,
          }}
        />
        <div className={'flex flex-col mb-[7px]'}>
          {formErrors.description.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`description-${errorTitle}`}
            />
          })}
        </div>
        <div className={linkedFilesClassName}>
          
        </div>
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Проект</label>
          <Select
            value={
              taskData.project_id
                ? projectsOptions.find(findSelectedOption.bind(null, taskData.project_id)) as { label: string; value: string }
                : null
            }
            className={'w-[300px]'}
            options={projectsOptions}
            placeholder={'Выберите проект'}
            onChange={(option) => {
              setProjectId(option.value)
            }}
          />
        </div>
        <div className={'flex flex-col mb-[7px]'}>
          {formErrors.project_id.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`project_id-${errorTitle}`}
            />
          })}
        </div>
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Ответственный</label>
          <Select
            value={
              taskData.executor_id
                ? options.find(findSelectedOption.bind(null, taskData.executor_id)) as { label: string; value: string }
                : null
            }
            className={'w-[300px]'}
            options={options}
            placeholder={'Выберите ответственного'}
            onChange={(option) => {
              setExecutorId(option.value)
            }}
          />
        </div>
        <div className={'flex flex-col mb-[7px]'}>
          {formErrors.executor_id.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`executor_id-${errorTitle}`}
            />
          })}
        </div>
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Крайний срок</label>
          <Input
            type={'date'}
            className={cn(inputTitleClassName, '!w-fit')}
            value={taskData.deadline}
            onChange={evt => {
              setTaskDeadline(evt.target.value)
            }}
          />
        </div>
        <div className={'flex flex-col mb-[7px]'}>
          {formErrors.deadline.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`deadline-${errorTitle}`}
            />
          })}
        </div>
        <div className={buttonsWrapperClassName}>
          <Button onClick={createHandler} title={'Создать задачу'} type={'green'} />
          <Link to={'/tasks'}>
            <Button onClick={() => {}} title={'Отмена'} type={'light-gray'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ErrorText = ({ title }: { title: string }) => {
  return (
    <span className={'text-red text-[12px]'}>{title}</span>
  );
};

export default CreateTask;
