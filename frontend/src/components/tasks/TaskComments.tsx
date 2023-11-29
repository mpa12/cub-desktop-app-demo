import React, {useState} from "react";
import convertTimeFormat from "@utils/convertTimeFormat";
import TaskModel from "@models/TaskModel";
import cn from "classnames";
import Button from "@ui/Button";
import TaskService from "@services/TaskService";
import toast from "react-hot-toast";

interface TaskCommentsProps {
  taskModel: TaskModel;
  getTaskData: () => Promise<void>;
}

const textareaClassName = cn(
  'bg-light-gray border-gray-hover focus:border-gray focus:outline-none p-[10px] rounded-[10px] border-[1px] w-full'
);

const TaskComments = ({
  taskModel,
  getTaskData,
}: TaskCommentsProps) => {
  const [formData, setFormData] = useState({
    content: '',
  });

  const createTask = async () => {
    if (!formData.content) return;

    await TaskService.createComment({
      taskId: taskModel.data.id,
      comment: formData.content,
    });

    await getTaskData().then();

    setFormData({
      ...formData,
      content: '',
    });

    toast('Комментарий добавлен', {
      position: 'bottom-right',
      duration: 2000,
      className: 'mr-[20px] !bg-green !text-white'
    });
  }

  return (
    <div className={'flex flex-col'}>
      <div>
        <div className={'text-[14px] bg-light rounded-t-[10px] py-[12px] px-[8px] w-fit'}>Комментарии</div>
      </div>
      <div className={'bg-light rounded-b-[10px] py-[20px] px-[10px] flex flex-col gap-[10px]'}>
        <div>
          <textarea
            value={formData.content}
            onChange={evt => {
              setFormData({
                ...formData,
                content: evt.target.value,
              });
            }}
            className={textareaClassName}
          ></textarea>
          <Button onClick={createTask} title={'Отправить'} />
        </div>
        {taskModel.data.comments.map(comment => {
          return (
            <div key={`comment-${comment.date}`} className={'bg-light-gray p-[10px] rounded-[10px] border-[1px] border-gray-hover'}>
              <time className={'text-[11px]'}>{convertTimeFormat(comment.date)}</time>
              <p className={'text-[14px] mt-[5px]'}>{comment.comment}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default TaskComments;
