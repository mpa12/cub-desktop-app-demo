import React from "react";
import profileImg from "@assets/default_profile.png";
import cn from "classnames";

const imageClassName = 'w-[50px] h-[50px] object-cover object-center rounded-full';
const profileWrapperClassName = 'relative';
const profileNameClassName = 'font-semibold';
const profileCardClassName = cn(
  'flex gap-[25px] items-center relative pl-4 p-2',
);
const positionClassName = 'text-gray';

/**
 * Профиль.
 *
 * @constructor
 */
const Profile = () => {
  return (
    <div className={profileWrapperClassName}>
      <div className={profileCardClassName}>
        <img className={imageClassName} src={profileImg} alt="profile_img"/>
        <div>
          <p className={profileNameClassName}>Иванов Иван Иванович</p>
          <p className={positionClassName}>Руководитель проектов</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
