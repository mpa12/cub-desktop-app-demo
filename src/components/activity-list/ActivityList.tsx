import React, {useEffect, useState} from "react";
import Table from "@ui/Table";
import cn from "classnames";
import ActivityStore from "@stores/ActivityStore";
import Modal from "@ui/Modal";
import Button from "@ui/Button";
import toast from "react-hot-toast";

const dataWrapperClassName = cn(
  'w-full min-h-[200px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);
const wrapperClassName = 'w-full h-full grow self-stretch';

const ActivityList = () => {
  const [confirmModalOsOpen, setConfirmModalOsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setConfirmModalOsOpen(true);
    }, 30000);
  }, [confirmModalOsOpen]);

  const data = ActivityStore.defaultValue.filter(activity => activity.isChecked);
  const fields = [
    {
      label: 'Сервис',
      getValue: (activity) => {
        return (
          <div className={'flex gap-[5px] items-center cursor-pointer select-none'}>
            <div className={'p-[5px] bg-white rounded-[5px] w-fit h-[30px] w-[30px]'}>
              <img
                className={'h-[20px] w-[20px]'}
                alt={activity.name}
                src={activity.image}
              />
            </div>
            <span>{activity.name}</span>
          </div>
        );
      }
    },
    {
      label: 'Время',
      getValue: (activity) => {
        return activity.time;
      }
    },
    {
      label: 'Комментарий',
      getValue: (activity) => {
        return activity.comment;
      }
    },
  ];

  const confirm = () => {
    toast(
      'Данные отправлены',
      {
        position: 'bottom-right',
        duration: 2000,
        className: 'mr-[20px] !bg-green !text-white'
      }
    );

    setConfirmModalOsOpen(false);
  }

  return (
    <>
      <h1 className={'text-[25px] font-bold mb-[15px]'}>Активность за день</h1>

      <Modal
        isOpen={confirmModalOsOpen}
        closeModal={setConfirmModalOsOpen.bind(null, false)}
      >
        <div className={'max-w-[400px] lg:w-[100vw] w-[90vw] p-[20px] bg-white rounded-[20px]'}>
          <h4 className={'font-semibold text-[16px]'}>Подтвердите отправку активности</h4>
          <div className={'w-full flex gap-[5px] justify-end items-end mt-[30px]'}>
            <Button
              onClick={setConfirmModalOsOpen.bind(null, false)}
              title={'Отмена'}
              colorType={'light-gray'}
            />
            <Button
              onClick={confirm}
              title={'Подтвердить'}
              colorType={'green'}
            />
          </div>
        </div>
      </Modal>

      <div className={dataWrapperClassName}>
        <div className={wrapperClassName}>
          <Table data={data} fields={fields} />
        </div>
      </div>
    </>
  );
};

export default ActivityList;
