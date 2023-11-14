import React from "react";
import Modal from "@ui/Modal";
import Input from "@ui/Input";

interface ModalData {
  date: Date;
}

interface CreateEventModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: ModalData;
  setData: (data: ModalData) => void;
}

const wrapperClassName = 'w-[400px] p-[10px] flex flex-col gap-[5px]';
const formWrapperClassName = 'flex flex-col gap-[5px]';
const inputBlockWrapperClassName = 'flex flex-col gap-[5px]';
const modalFooterClassName = 'flex items-center justify-end gap-[10px]'

const CreateEventModal = ({
  isOpen,
  setIsOpen,
  data,
  setData,
}: CreateEventModal) => {
  const onChangeData = (evt) => {
    setData({
      ...data,
      date: new Date(evt.target.value),
    })
  }

  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen.bind(null, false)}>
      <div className={wrapperClassName}>
        <h3>Добавление события</h3>
        <div className={formWrapperClassName}>
          <input
            type="date"
            value={data.date.toISOString().split('T')[0]}
            onChange={onChangeData}
          />
          <div className={inputBlockWrapperClassName}>
            <label>Название события</label>
            <Input type={'text'} />
          </div>
          <div className={inputBlockWrapperClassName}>
            <label>Описание события</label>
            <textarea></textarea>
          </div>
          <div className={inputBlockWrapperClassName}>
            <label>Цвет текста</label>
          </div>
          <div className={inputBlockWrapperClassName}>
            <label>Цвет фона</label>
          </div>
          <div className={modalFooterClassName}>
            <div>Добавть</div>
            <div>Отмена</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
