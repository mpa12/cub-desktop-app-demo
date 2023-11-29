import React, {useState} from "react";
import Input from "@ui/Input";
import cn from "classnames";
import Modal from "@ui/Modal";
import ColorPicker from "@components/color-picker/ColorPicker";
import CalendarEvent from "@components/calendar/CalendarEvent";
import Button from "@ui/Button";
import LoaderSpinner from "@ui/LoaderSpinner";
import CalendarService from "@services/CalendarService";
import toast from "react-hot-toast";

interface ModalData {
  id: number;
  date: Date;
  title?: string;
  description?: string;
  bgColor: string;
  textColor: string;
}

interface UpdateEventModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: ModalData;
  setData: (data: ModalData) => void;
  updateEventList: () => Promise<void>;
}

const wrapperClassName = 'w-[400px] p-[10px] flex flex-col gap-[5px]';
const formWrapperClassName = 'flex flex-col gap-[5px]';
const inputBlockWrapperClassName = 'flex flex-col gap-[5px]';
const modalFooterClassName = 'flex items-center justify-end gap-[10px]';
const inputClassName = 'border-[1px] border-gray rounded-[4px] max-h-[150px] px-[4px] py-[2px]';
const colorPickerBlockClassName = 'w-[15px] h-[15px] rounded-[4px] cursor-pointer hover:brightness-[.9]';
const colorInputBlockWrapperClassName = '!flex-row items-center justify-start gap-[5px] mt-[5px]';

const UpdateEventModal = ({
  isOpen,
  setIsOpen,
  data,
  setData,
  updateEventList
}: UpdateEventModalProps) => {
  const [bgPickerOpen, setBgPickerOpen] = useState(false);
  const [textPickerOpen, setTextPickerOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeDate = (evt) => {
    setData({
      ...data,
      date: new Date(evt.target.value),
    });
  };

  const onChangeTitle = (evt) => {
    setData({
      ...data,
      title: evt.target.value,
    });
  };

  const onChangeDescription = (evt) => {
    setData({
      ...data,
      description: evt.target.value,
    });
  };

  const onChangeBgColor = (bgColor) => {
    setData({
      ...data,
      bgColor,
    });
  };

  const onChangeTextColor = (textColor) => {
    setData({
      ...data,
      textColor,
    });
  };

  const updateCallback = async () => {
    if (!data.title || !data.description) return;

    setIsLoading(true);

    await CalendarService.update(data.id, {
      title: data.title,
      description: data.description,
      start_datetime: data.date.toISOString(),
      bg_color: data.bgColor,
      text_color: data.textColor,
    });

    updateEventList().then();

    setIsOpen(false);
    setData({
      ...data,
      title: '',
      description: '',
    });

    setIsLoading(false);

    toast('Событие изменено', {
      position: 'bottom-right',
      duration: 2000,
      className: 'mr-[20px] !bg-green !text-white'
    });
  };

  return (
    <Modal isOpen={isOpen} closeModal={setIsOpen.bind(null, false)}>
      <div className={wrapperClassName}>
        <h3>Редактирование события</h3>
        <div className={formWrapperClassName}>
          <input
            type="date"
            value={data.date.toISOString().split('T')[0]}
            onChange={onChangeDate}
            className={inputClassName}
            onKeyDown={evt => evt.preventDefault()}
          />
          <div className={inputBlockWrapperClassName}>
            <label>Название события</label>
            <Input
              type={'text'}
              className={inputClassName}
              value={data.title}
              onChange={onChangeTitle}
              required={true}
            />
          </div>
          <div className={inputBlockWrapperClassName}>
            <label>Описание события</label>
            <textarea
              className={inputClassName}
              maxLength={255}
              value={data.description}
              onChange={onChangeDescription}
              required={true}
            ></textarea>
          </div>
          <div className={cn(inputBlockWrapperClassName, colorInputBlockWrapperClassName)}>
            <label>Цвет текста</label>
            <div
              style={{background: data.textColor}}
              className={colorPickerBlockClassName}
              onClick={setTextPickerOpen.bind(null, true)}
            ></div>
            <Modal
              isOpen={textPickerOpen}
              closeModal={setTextPickerOpen.bind(null, false)}
            >
              <ColorPicker onChange={(hex) => {
                onChangeTextColor(hex);
                setTextPickerOpen(false);
              }} />
            </Modal>
          </div>
          <div className={cn(inputBlockWrapperClassName, colorInputBlockWrapperClassName)}>
            <label>Цвет фона</label>
            <div
              style={{background: data.bgColor}}
              className={colorPickerBlockClassName}
              onClick={setBgPickerOpen.bind(null, true)}
            ></div>
            <Modal
              isOpen={bgPickerOpen}
              closeModal={setBgPickerOpen.bind(null, false)}
            >
              <ColorPicker onChange={(hex) => {
                onChangeBgColor(hex);
                setBgPickerOpen(false);
              }} />
            </Modal>
          </div>
          <div className={cn(inputBlockWrapperClassName, 'my-[10px]')}>
            <label>Предпросмотр</label>
            <CalendarEvent event={{
              title: data.title || 'Название события',
              description: data.description || 'Описание события',
              start_datetime: '',
              end_datetime: '',
              text_color: data.textColor,
              bg_color: data.bgColor,
            }} />
          </div>
          <div className={modalFooterClassName}>
            <Button title={'Редактировать'} colorType={'green'} onClick={updateCallback} />
            <Button title={'Отмена'} colorType={'light-gray'} onClick={setIsOpen.bind(null, false)} />
          </div>
        </div>
        {isLoading && (
          <div className={'w-full h-full absolute backdrop-brightness-[.75] top-0 left-0 flex items-center justify-center'}>
            <LoaderSpinner loading={isLoading}/>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UpdateEventModal;
