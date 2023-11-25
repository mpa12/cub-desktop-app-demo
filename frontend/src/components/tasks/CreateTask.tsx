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
import useAllUsers from "@stores/useAllUsers";
import ProfileModel from "@models/ProfileModel";
import Icon from "@ui/Icon";
import BackButton from "@ui/BackButton";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const inputTitleClassName = '!border-0 outline-0 w-full px-[20px] py-[10px] !rounded-[10px]';
const linkedFilesClassName = 'w-full gap-[5px] flex-wrap';
const fileInputClassName = cn(
  'hover:bg-light-gray-hover cursor-pointer w-[80px] h-[80px] border-[1px] border-gray',
  'rounded-[10px] border-dashed flex items-center justify-center'
);
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
  const {
    allUsersState
  } = useAllUsers();

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

  const projectsOptions: { label: string; value: string }[] = projectsState.data
    .map(project => ({
      value: project.id.toString(),
      label: project.title
    }));

  const allUsersOptions: { label: string; value: string }[] = allUsersState.data
    .map(user => {
      const userModel = new ProfileModel(user);

      return {
        value: user.id.toString(),
        label: userModel.getName(),
      };
    });

  const findSelectedOption = (selectedValue, option) => {
    return option.value === selectedValue;
  };

  const createHandler = () => {
    const validator = TaskValidator.validate(taskData);

    setFormErrors(validator.errors);

    if (!validator.isValid) return;

    // TODO: Отправка запроса на создание задачи
  };

  return (
    <div>
      <div className={'mb-[15px]'}>
        <BackButton to={'/'} />
      </div>
      <h3 className={titleClassName}>Новая задача</h3>
      <div>
        <Input
          placeholder={'Введите название задачи'}
          className={cn(inputTitleClassName, {
            ['border-red !border-[1px]']: formErrors.title.length
          })}
          value={taskData.title}
          onChange={evt => {
            setFormErrors({ ...formErrors, title: [] });
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
        <div className={!!formErrors.description.length && '[&>div>div]:border-red [&>div>div]:!border-[1px]'}>
          <TinyEditor
            value={taskData.description}
            setValue={(description) => {
              setFormErrors({ ...formErrors, description: [] });
              setTaskDescription(description);
            }}
            init={{
              placeholder: 'Описание задачи',
              images_upload_handler: handleImageUpload,
            }}
          />
        </div>
        <div className={'flex flex-col mb-[7px] mt-[4px]'}>
          {formErrors.description.map(errorTitle => {
            return <ErrorText
              title={errorTitle}
              key={`description-${errorTitle}`}
            />
          })}
        </div>
        <div className={linkedFilesClassName}>
          <div className={fileInputClassName}>
            <Icon iconName={'download'} className={'h-[20px] text-gray'} />
          </div>
        </div>
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Проект</label>
          <Select
            value={
              taskData.project_id
                ? projectsOptions.find(findSelectedOption.bind(null, taskData.project_id)) as { label: string; value: string }
                : null
            }
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: formErrors.project_id.length ? '#bb1a1a' : 'transparent',
              }),
            }}
            options={projectsOptions}
            placeholder={'Выберите проект'}
            onChange={(option) => {
              setFormErrors({ ...formErrors, project_id: [] });
              setProjectId(option.value);
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
                ? allUsersOptions.find(findSelectedOption.bind(null, taskData.executor_id)) as { label: string; value: string }
                : null
            }
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: formErrors.executor_id.length ? '#bb1a1a' : 'transparent',
              }),
            }}
            options={allUsersOptions}
            placeholder={'Выберите ответственного'}
            onChange={(option) => {
              setFormErrors({ ...formErrors, executor_id: [] });
              setExecutorId(option.value);
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
            className={cn(inputTitleClassName, '!w-fit', {
              ['border-red !border-[1px]']: formErrors.deadline.length
            })}
            value={taskData.deadline}
            onChange={evt => {
              setFormErrors({ ...formErrors, deadline: [] });
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
