import React, { useEffect, useState } from "react";
import Table from "@ui/Table";
import cn from "classnames";
import ActivityStore, {Activity} from "@stores/ActivityStore";
import Modal from "@ui/Modal";
import Button from "@ui/Button";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import ActivityKebabMenu from "@components/activity-list/ActivityKebabMenu";
import Input from "@ui/Input";
import Icon from "@ui/Icon";
import noIconIcon from "@assets/apps/no-icon.png";

const dataWrapperClassName = cn(
  'w-full min-h-[200px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);
const wrapperClassName = 'w-full h-full grow self-stretch';

interface Data extends Activity {
  isAddCommand: boolean;
}

const ActivityList = observer(() => {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [commentModalData, setCommentModalData] = useState<Activity>();

  const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
  const [timeModalData, setTimeModalData] = useState<Activity>();

  const [addServiceModalIsOpen, setAddServiceModalIsOpen] = useState(false);
  const defaultAddServiceModalData = {
    name: '',
    image: noIconIcon,
    isChecked: true,
    comment: '',
    time: '00:00:00',
    timeIsUpdatedManual: true,
  };
  const [addServiceModalData, setAddServiceModalData] = useState<Activity>(defaultAddServiceModalData);

  useEffect(() => {
    setTimeout(() => {
      setConfirmModalIsOpen(true);
    }, 30000);
  }, [confirmModalIsOpen]);

  const data: Data[] = [
    ...ActivityStore.list
      .filter(activity => activity.isChecked)
      .map(activity => ({ ...activity, isAddCommand: false })),
    {
      name: 'Добавить сервис',
      image: '',
      isChecked: true,
      comment: '',
      time: '',
      timeIsUpdatedManual: false,
      isAddCommand: true
    }
  ];
  const fields = [
    {
      label: 'Сервис',
      getValue: (activity: Data) => {
        const clickHandler = () => {
          if (!activity.isAddCommand) return;

          setAddServiceModalIsOpen(true);
        };

        return (
          <div className={'flex gap-[5px] items-center select-none w-[200px]'}>
            <div
              onClick={clickHandler}
              className={cn('p-[5px] bg-white rounded-[5px] h-[30px] w-[30px] flex items-center justify-center', {
                ['hover:brightness-75 cursor-pointer']: activity.isAddCommand
              })}
            >
              {activity.isAddCommand && (
                <span className={'text-[25px]'}>+</span>
              )}
              {!activity.isAddCommand && <img
                className={'h-[20px] w-[20px]'}
                alt={activity.name}
                src={activity.image}
              />}
            </div>
            <span>{activity.name}</span>
          </div>
        );
      }
    },
    {
      label: 'Время',
      getValue: (activity: Data) => {
        return (
          <div className={'flex gap-[5px] items-center justify-start'}>
            <span>{activity.time}</span>
            {activity.timeIsUpdatedManual && <Icon iconName={'exclamationCircle'}/>}
          </div>
        );
      }
    },
    {
      label: 'Описание',
      getValue: (activity) => {
        return activity.comment;
      }
    },
    {
      label: '',
      getValue: (activity: Data) => {
        if (activity.isAddCommand) return null;

        return <ActivityKebabMenu
          data={activity}
          updateComment={() => {
            setCommentModalData(activity);
            setCommentModalIsOpen(true);
          }}
          updateTime={() => {
            setTimeModalData(activity);
            setTimeModalIsOpen(true);
          }}
        />;
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

    setConfirmModalIsOpen(false);
  };

  const updateComment = () => {
    ActivityStore.setComment(commentModalData?.name, commentModalData?.comment);
    setCommentModalData(null);
    setCommentModalIsOpen(false);
  };

  const updateTime = () => {
    console.log(timeModalData);
    ActivityStore.setTime(timeModalData?.name, timeModalData?.time);
    ActivityStore.setTimeIsUpdatedManual(timeModalData?.name);
    setTimeModalData(null);
    setTimeModalIsOpen(false);
  };

  return (
    <>
      <h1 className={'text-[25px] font-bold mb-[15px]'}>Активность за день</h1>

      <Modal
        isOpen={confirmModalIsOpen}
        closeModal={setConfirmModalIsOpen.bind(null, false)}
      >
        <div className={'max-w-[700px] lg:w-[100vw] w-[90vw] p-[20px] bg-white rounded-[20px]'}>
          <h4 className={'font-semibold text-[16px]'}>Подтвердите отправку активности</h4>
          <div className={'w-full mt-[20px]'}>
            <div className={cn(wrapperClassName, 'overflow-x-auto')}>
              <Table data={data} fields={fields} />
            </div>
          </div>
          <div className={'w-full flex gap-[5px] justify-end items-end mt-[30px]'}>
            <Button
              onClick={setConfirmModalIsOpen.bind(null, false)}
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

      <Modal isOpen={commentModalIsOpen} closeModal={setCommentModalIsOpen.bind(null, false)}>
        <div className={'max-w-[600px] lg:w-[100vw] w-[80vw] p-[20px] bg-white rounded-[20px]'}>
          <h4 className={'font-semibold text-[16px]'}>Редактирвоание комментария</h4>
          <div className={'w-full mt-[20px]'}>
            <Input
              value={commentModalData?.comment}
              onChange={evt => {
                setCommentModalData({
                  ...commentModalData,
                  comment: evt.target.value,
                });
              }}
              className={'w-full px-[15px] py-[7px] focus:border-gray focus:border-[1px]'}
            />
          </div>
          <div className={'w-full flex gap-[5px] justify-end items-end mt-[30px]'}>
            <Button
              onClick={() => {
                setCommentModalIsOpen(false);
                setCommentModalData(null);
              }}
              title={'Отмена'}
              colorType={'light-gray'}
            />
            <Button
              onClick={updateComment}
              title={'Подтвердить'}
              colorType={'green'}
            />
          </div>
        </div>
      </Modal>

      <Modal isOpen={timeModalIsOpen} closeModal={setTimeModalIsOpen.bind(null, false)}>
        <div className={'max-w-[600px] lg:w-[100vw] w-[80vw] p-[20px] bg-white rounded-[20px]'}>
          <h4 className={'font-semibold text-[16px]'}>Редактирвоание времени</h4>
          <div className={'w-full mt-[20px]'}>
            <Input
              value={timeModalData?.time}
              type={'time'}
              onChange={evt => {
                setTimeModalData({
                  ...timeModalData,
                  time: evt.target.value,
                });
              }}
              className={'w-full px-[15px] py-[7px] focus:border-gray focus:border-[1px]'}
            />
          </div>
          <div className={'w-full flex gap-[5px] justify-end items-end mt-[30px]'}>
            <Button
              onClick={() => {
                setTimeModalIsOpen(false);
                setTimeModalData(null);
              }}
              title={'Отмена'}
              colorType={'light-gray'}
            />
            <Button
              onClick={updateTime}
              title={'Подтвердить'}
              colorType={'green'}
            />
          </div>
        </div>
      </Modal>

      <Modal isOpen={addServiceModalIsOpen} closeModal={setAddServiceModalIsOpen.bind(null, false)}>
        <div className={'max-w-[600px] lg:w-[100vw] w-[80vw] p-[20px] bg-white rounded-[20px]'}>
          <h4 className={'font-semibold text-[16px]'}>Добавление сервиса</h4>
          <div className={'w-full mt-[20px]'}>
            <div>
              <label>Название сервиса</label>
              <Input
                value={addServiceModalData?.name}
                onChange={evt => {
                  setAddServiceModalData({
                    ...addServiceModalData,
                    name: evt.target.value,
                  });
                }}
                className={'w-full px-[15px] py-[7px] focus:!border-gray focus:!border-[1px]'}
              />
            </div>
            <div className={'mt-[10px]'}>
              <label>Время</label>
              <Input
                value={addServiceModalData?.time}
                type={'time'}
                onChange={evt => {
                  setAddServiceModalData({
                    ...addServiceModalData,
                    time: evt.target.value,
                  });
                }}
                className={'w-full px-[15px] py-[7px] focus:!border-gray focus:!border-[1px]'}
              />
            </div>
            <div className={'mt-[10px]'}>
              <label>Описание</label>
              <Input
                value={addServiceModalData?.comment}
                onChange={evt => {
                  setAddServiceModalData({
                    ...addServiceModalData,
                    comment: evt.target.value,
                  });
                }}
                className={'w-full px-[15px] py-[7px] focus:!border-gray focus:!border-[1px]'}
              />
            </div>
          </div>
          <div className={'w-full flex gap-[5px] justify-end items-end mt-[30px]'}>
            <Button
              onClick={() => {
                setAddServiceModalData(defaultAddServiceModalData);
                setAddServiceModalIsOpen(false);
              }}
              title={'Отмена'}
              colorType={'light-gray'}
            />
            <Button
              onClick={() => {
                ActivityStore.addActivity(addServiceModalData);
                setAddServiceModalIsOpen(false);
              }}
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
});

export default ActivityList;
