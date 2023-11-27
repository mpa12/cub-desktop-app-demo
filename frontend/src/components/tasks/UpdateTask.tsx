import React from "react";
import {useParams} from "react-router-dom";
import BackButton from "@ui/BackButton";

const UpdateTask = () => {
  const { id: taskId } = useParams();

  return (
    <div>
      <div className={'mb-[20px]'}>
        <BackButton to={`/tasks/${taskId}`}/>
      </div>
      Редактирование задачи {taskId}
    </div>
  );
};

export default UpdateTask;
