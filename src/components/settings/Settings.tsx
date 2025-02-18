import React, {useState} from "react";
import Button from "@ui/Button";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {observer} from "mobx-react-lite";
import ActivityAppsStorage, {ActivityApp} from "@stores/ActivityAppsStorage";

const titleClassName = 'text-[25px] font-bold mb-[15px]';

const Settings = observer(() => {
  const navigate = useNavigate();
  const [apps, setApps] = useState<ActivityApp[]>(ActivityAppsStorage.apps);

  const setIsChecked = (name, isChecked = true) => {
    const updatedApps = apps.map(activity => {
      if (activity.name !== name) return activity;

      return {
        ...activity,
        isChecked,
      };
    });

    setApps(updatedApps);
  };

  const save = () => {
    ActivityAppsStorage.setApps(apps);

    toast(
      'Настройки изменены',
      {
        position: 'bottom-right',
        duration: 2000,
        className: 'mr-[20px] !bg-green !text-white'
      }
    );

    navigate('/cub-desktop-app-demo');
  };

  return (
    <>
      <h1 className={titleClassName}>Настройки</h1>

      <div className={'my-5 p-[20px] bg-white rounded-[10px]'}>
        <h3 className={'text-[14px]'}>Выберите сервисы, логирование времени по которым необходимо производить</h3>
      </div>

      <div>
        <h3 className={'font-bold text-[16px]'}>Зарегистрированные сервисы</h3>

        {apps.map(activity => {
          return (
            <div className={'flex gap-[10px] items-center border-b border-b-gray-100 py-[20px]'} key={activity.name}>
              <input
                type={'checkbox'}
                id={activity.name}
                checked={activity.isChecked}
                onChange={evt => {
                  setIsChecked(activity.name, evt.target.checked);
                }}
              />
              <label
                className={'flex gap-[5px] items-center cursor-pointer select-none'}
                htmlFor={'google'}
              >
                <div className={'p-[5px] bg-white rounded-[5px] h-[30px] w-[30px]'}>
                  <img
                    className={'h-[20px] w-[20px]'}
                    alt={activity.name}
                    src={activity.image}
                  />
                </div>
                <span>{activity.name}</span>
              </label>
            </div>
          )
        })}

        <Button
          onClick={save}
          title={'Сохранить'}
          colorType={'green'}
          className={'mt-6'}
        />
      </div>
    </>
  );
});

export default Settings;
