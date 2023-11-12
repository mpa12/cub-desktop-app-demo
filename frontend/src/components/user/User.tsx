import React from "react";
import defaultProfile from '../../assets/default_profile.png';

interface UserProps {
  imageUrl?: string;
  username: string;
}

const wrapperClassName = 'flex gap-[10px] items-center justify-start';
const imgClassName = 'rounded-full w-[40px] h-[40px] object-cover object-center';
const usernameClassName = 'text-[14px]';

const User = ({
  imageUrl,
  username,
}: UserProps) => {
  return (
    <div className={wrapperClassName}>
      <div className={'w-[40px] h-[40px]'}>
        <img src={imageUrl || defaultProfile} alt={username} className={imgClassName} />
      </div>
      <span className={usernameClassName}>{username}</span>
    </div>
  );
};

export default User;
