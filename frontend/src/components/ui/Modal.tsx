import React, {useEffect, useRef} from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children, closeModal }: ModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>();

  const handleClickOutside = (event) => {
    if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-brightness-50"
      onClick={handleClickOutside}
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div
          className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          ref={wrapperRef}
        >
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;
