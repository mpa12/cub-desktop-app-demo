import React from "react";

interface ProfilePageFieldProps {
  fieldKey: string;
  value: string;
  label: string;
}

const ProfilePageField = ({
  fieldKey,
  value,
  label,
}: ProfilePageFieldProps) => {
  if (!value) return;

  return (
    <div className={'flex flex-col mb-3'} key={fieldKey}>
      <span className={'text-[12px] text-gray'}>{label}</span>
      <span className={'text-[15px]'}>{value}</span>
    </div>
  );
};

export default ProfilePageField;
