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
import ActivityAppsStorage from "@stores/ActivityAppsStorage";
import {toJS} from "mobx";

const dataWrapperClassName = cn(
  'w-full min-h-[200px] rounded-[10px] bg-light flex items-center justify-center overflow-x-auto'
);
const wrapperClassName = 'w-full h-full grow self-stretch';

const ActivityList = observer(() => {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [commentModalData, setCommentModalData] = useState<Activity>();

  const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
  const [timeModalData, setTimeModalData] = useState<Activity>();

  useEffect(() => {
    setTimeout(() => {
      setConfirmModalIsOpen(true);
    }, 30000);
  }, [confirmModalIsOpen]);

  const settings = toJS(ActivityAppsStorage.apps);

  const data: Activity[] = ActivityStore.list.filter(activity => {
    return settings.find(app => app.name === activity.serviceName)?.isChecked;
  });

  const fields = [
    {
      label: 'Сервис',
      getValue: (activity: Activity) => {

        return (
          <div className={'flex gap-[5px] items-center select-none w-[200px]'}>
            <div
              className={'p-[5px] bg-white rounded-[5px] h-[30px] w-[30px] flex items-center justify-center'}
            >
              <img
                className={'h-[20px] w-[20px]'}
                alt={settings.find(app => app.name === activity.serviceName).name}
                src={settings.find(app => app.name === activity.serviceName).image}
              />
            </div>
            <span>{settings.find(app => app.name === activity.serviceName).name}</span>
          </div>
        );
      }
    },
    {
      label: 'Время',
      getValue: (activity: Activity) => {
        return (
          <div className={'flex gap-[5px] items-center justify-start'}>
            <span>{activity.time}</span>
            {activity.timeIsUpdatedManual && <Icon iconName={'exclamationCircle'}/>}
          </div>
        );
      }
    },
    {
      label: 'Проект',
      getValue: (activity: Activity) => {
        return activity.projectName;
      }
    },
    {
      label: 'Описание',
      getValue: (activity) => {
        return <div className={'max-w-[300px]'}>{activity.comment}</div>;
      }
    },
    {
      label: '',
      getValue: (activity: Activity) => {
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
    ActivityStore.setComment(commentModalData?.id, commentModalData?.comment);
    setCommentModalData(null);
    setCommentModalIsOpen(false);
  };

  const updateTime = () => {
    console.log(timeModalData);
    ActivityStore.setTime(timeModalData?.id, timeModalData?.time);
    ActivityStore.setTimeIsUpdatedManual(timeModalData?.id);
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
            <div className={cn(wrapperClassName, 'overflow-x-auto max-h-[400px] lg:max-h-none')}>
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
          <h4 className={'font-semibold text-[16px]'}>Редактирование комментария</h4>
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
          <h4 className={'font-semibold text-[16px]'}>Редактирование времени</h4>
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

      <div className={dataWrapperClassName}>
        <div className={wrapperClassName}>
          <Table data={data} fields={fields} />
        </div>
      </div>
    </>
  );
});

export default ActivityList;
