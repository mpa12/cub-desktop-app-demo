import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import BackButton from "@ui/BackButton";
import useUpdateTaskData from "@components/tasks/states/useUpdateTaskData";
import useProjects from "@stores/useProjects";
import useAllUsers from "@stores/useAllUsers";
import ProfileModel from "@models/ProfileModel";
import Input from "@ui/Input";
import cn from "classnames";
import TinyEditor from "@ui/TinyEditor";
import Icon from "@ui/Icon";
import Select from "react-select";
import Button from "@ui/Button";
import TaskValidator from "../../validators/TaskValidator";
import AuthService from "@services/AuthService";
import TaskService from "@services/TaskService";
import toast from "react-hot-toast";

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

// TODO: Сделать рефакторинг, т.к. почти полностью скопированно с компонента для создания задачи
const UpdateTask = () => {
  const { id: taskId } = useParams();

  const {
    taskData,
    setTaskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
    setExecutorId,
    setProjectId,
    taskDataIsFetching
  } = useUpdateTaskData(taskId);

  const [isSending, setIsSending] = useState(false);

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

  const projectsOptions: { label: string; value: string }[] = projectsState.data
    .map(project => ({
      value: project.id.toString(),
      label: project.title
    }))

  const allUsersOptions: { label: string; value: string }[] = allUsersState.data
    .filter(user => {
      const userModel = new ProfileModel(user);

      return userModel.isProgrammer() || userModel.isManager();
    })
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
  const updateHandler = async () => {
    const validator = TaskValidator.validate(taskData);

    setFormErrors(validator.errors);

    if (!validator.isValid) return;

    setIsSending(true);

    const profileData = await AuthService.profileData();
    const project_manager = profileData.data.id;

    const updateTaskData: {
      title: string;
      description: string;
      executor: number;
      project: number;
      project_manager: number;
      due_date?: string;
    } = {
      title: taskData.title,
      description: taskData.description,
      executor: parseInt(taskData.executor_id),
      project: parseInt(taskData.project_id),
      project_manager,
      due_date: taskData.deadline,
    };

    TaskService.update(parseInt(taskId), updateTaskData).then();

    setIsSending(false);

    toast('Задача изменена', {
      position: 'bottom-right',
      duration: 2000,
      className: 'mr-[20px] !bg-green !text-white'
    });
  };

  return (
    <div>
      <div className={'mb-[20px]'}>
        <BackButton to={`/tasks/${taskId}`}/>
      </div>
      <h3 className={titleClassName}>Редактирование задачи № {taskId}</h3>
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
              // images_upload_handler: handleImageUpload,
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
            value={(() => {
              if (!taskData.deadline) return;

              return new Date(taskData.deadline).toISOString().substring(0, 10)
            })()}
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
          <Button
            onClick={updateHandler}
            title={isSending ? 'Загрузка...' : 'Сохранить изменения'}
            colorType={'green'}
            disabled={isSending}
          />
          <Link to={`/tasks/${taskId}`}>
            <Button onClick={() => {}} title={'Отмена'} colorType={'light-gray'} />
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

export default UpdateTask;
