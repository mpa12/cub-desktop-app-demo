import React from "react";
import Input from "@ui/Input";
import FileService from "@services/FileService";
import UploadHandler from "@cub-types/tinymce/UploadHandler";
import Button from "@ui/Button";
import { Link } from "react-router-dom";
import TinyEditor from "@ui/TinyEditor";
import useCreateTaskData from "@components/tasks/states/useCreateTaskData";
import cn from "classnames";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const inputTitleClassName = '!border-0 outline-0 w-full px-[20px] py-[10px] !rounded-[10px] !mb-[7px]';
const buttonsWrapperClassName = ' w-full mt-[7px] flex gap-[5px]';
const inputBlockClassName = 'flex gap-[5px] items-center mt-[7px]';
const inputBlockLabelClassName = 'w-[250px]';

const CreateTask = () => {
  const {
    taskData,
    setTaskTitle,
    setTaskDescription,
    setTaskDeadline,
  } = useCreateTaskData();

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

  return (
    <div>
      <h3 className={titleClassName}>Новая задача</h3>
      <div>
        <Input
          placeholder={'Введите название задачи'}
          className={inputTitleClassName}
          value={taskData.title}
          onChange={evt => {
            setTaskTitle(evt.target.value);
          }}
        />
        <TinyEditor
          value={taskData.description}
          setValue={setTaskDescription}
          init={{
            placeholder: 'Описание задачи',
            images_upload_handler: handleImageUpload,
          }}
        />
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Проет</label>
          <select className={cn(inputTitleClassName, '!w-fit')} value={taskData.project_id}>
            <option></option>
            <option>Интерсвязь</option>
            <option>Дед Мороз</option>
            <option>РАО</option>
            <option>Dicom Viewer</option>
            <option>Lactalis</option>
          </select>
        </div>
        <div className={inputBlockClassName}>
          <label className={inputBlockLabelClassName}>Ответственный</label>
          <select className={cn(inputTitleClassName, '!w-fit')} value={taskData.executor_id}>
            <option></option>
            <option>Максим Пиголицын</option>
            <option>Михаил Карпухин</option>
            <option>Музыко Никита</option>
          </select>
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
        <div className={buttonsWrapperClassName}>
          <Button onClick={console.log} title={'Создать задачу'} type={'green'} />
          <Link to={'/tasks'}>
            <Button onClick={() => {}} title={'Отмена'} type={'light-gray'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
