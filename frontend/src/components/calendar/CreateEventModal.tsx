import React from "react";
import Modal from "@ui/Modal";

interface CreateEventModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const wrapperClassName = 'p-[10px]';

const CreateEventModal = ({ isOpen, setIsOpen }: CreateEventModal) => {
  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen.bind(null, false)}>
      <div className={wrapperClassName}>
        <h3>Добавление события</h3>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
