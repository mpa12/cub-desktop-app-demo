import React, {useState, useRef, useEffect, MouseEvent} from "react";
import profileImg from '../../assets/default_profile.png';
import cn from "classnames";
import Icon from "../../components/ui/Icon";
import IProfileData from "../../types/IProfileData";

const imageClassName = cn("w-[50px] rounded-full");
const profileWrapperClassName = cn("relative select-none");
const profileNameClassName = cn("font-semibold");
const profileCardClassName = cn("flex gap-[25px] items-center relative pl-4 p-2",
  "rounded-lg transition duration-100 ease-linear hover:bg-light-gray cursor-pointer");
const positionClassName = cn("text-gray");
const dropdownArrowClassName = cn("w-[25px] h-auto ml-3");
const modalWrapper = cn(
  "absolute shadow rounded-lg bottom-[-175px] left-[-55px] bg-white",
  "w-[300px] p-[20px] gap-[30px] flex flex-col"
);
const modalUserData = cn("gap-[10px] flex flex-col");
const logoutButton = cn(" flex justify-end hover:shadow rounded py-1 px-2");
const logoutForm = cn("flex w-full justify-end");
const logoutWrapper = cn("");

const Profile = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleClickOutside = (event: MouseEvent | Event) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

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

  const profileData: IProfileData = {
    username: 'username',
    midl_name: 'midl_name',
    passport_data: {},
    gender: 'gender',
    birth_date: 'birth_date',
    photo: 'photo',
    role: 'role',
  };

  const onDropdownClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={profileWrapperClassName}>
      <div className={profileCardClassName} onClick={onDropdownClick}>
        <img className={imageClassName} src={profileImg} alt="profile_img"/>
        <div>
          <p className={profileNameClassName}>{profileData.username}</p>
          <p className={positionClassName}>{profileData.role}</p>
        </div>
        <Icon iconName={'dropdownArrow'} className={dropdownArrowClassName}/>
      </div>
      {isOpened && (
        <div ref={modalRef} className={modalWrapper}>
          <div className={modalUserData}>
            <p>Пол: {profileData.gender}</p>
            <p>Дата рождения: {profileData.birth_date}</p>
          </div>
          <div className={logoutWrapper}>
            <form action="/logout" method="post" className={logoutForm}>
              <button type={"submit"} className={logoutButton}>
                Выйти
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
