import React, {useState, useRef, useEffect, MouseEvent} from "react";
import profileImg from "@assets/default_profile.png";
import IProfileData from "@cub-types/IProfileData";
import cn from "classnames";
import Icon from "@ui/Icon";
import AuthService from "@services/AuthService";
import AuthStore from "@stores/AuthStore";

const imageClassName = 'w-[50px] rounded-full';
const profileWrapperClassName = 'relative select-none';
const profileNameClassName = 'font-semibold';
const profileCardClassName = cn(
  'flex gap-[25px] items-center relative pl-4 p-2',
  'rounded-lg transition duration-100 ease-linear hover:bg-light-gray cursor-pointer'
);
const positionClassName = 'text-gray';
const dropdownArrowClassName = 'w-[25px] h-auto ml-3';
const modalWrapper = cn(
  'absolute shadow rounded-lg bottom-[-210px] left-[30px] bg-white',
  'w-[300px] p-[20px] gap-[30px] flex flex-col'
);
const modalUserData = 'gap-[10px] flex flex-col';
const logoutButton = 'flex justify-end hover:bg-light-gray rounded py-1 px-2';
const logoutForm = 'flex w-full justify-end';
const logoutWrapper = 'border-t-[1px] border-t-light-gray pt-[10px]';

const messageError = 'Произошла ошибка';

/**
 * Профиль.
 *
 * @constructor
 */
const Profile = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [profileData, setProfileData] = useState<IProfileData>();

  const handleClickOutside = (event: MouseEvent | Event) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.profileData();
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(() => {
    });
  }, []);

  useEffect(() => {
    const handleClickOutsideEventListener = (event: MouseEvent | Event) => handleClickOutside(event);

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutsideEventListener);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideEventListener);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEventListener);
    };
  }, [isOpened]);

  const onDropdownClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={profileWrapperClassName}>
      <div className={profileCardClassName} onClick={onDropdownClick}>
        <img className={imageClassName} src={profileImg} alt="profile_img"/>
        <div>
          <p className={profileNameClassName}>{profileData?.username || messageError}</p>
          <p className={positionClassName}>{profileData?.role || messageError}</p>
        </div>
        <Icon iconName={'dropdownArrow'} className={dropdownArrowClassName}/>
      </div>
      {isOpened && (
        <div ref={modalRef} className={modalWrapper}>
          <div className={modalUserData}>
            <p>Пол: {profileData?.gender || messageError}</p>
            <p>Дата рождения: {profileData?.birth_date || messageError}</p>
          </div>
          <div className={logoutWrapper}>
            <div className={logoutForm}>
              <button className={logoutButton} onClick={AuthStore.logout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
