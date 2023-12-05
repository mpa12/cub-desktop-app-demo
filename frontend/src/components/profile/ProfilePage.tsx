import React, {useEffect, useState} from "react";
import IProfileData from "@cub-types/IProfileData";
import AuthService from "@services/AuthService";
import ProfileModel from "@models/ProfileModel";
import profileImg from "@assets/default_profile.png";
import ProfilePageField from "@components/profile/ProfilePageField";
import BackButton from "@ui/BackButton";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<IProfileData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.profileData();
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then();
  }, []);

  const profileModel = new ProfileModel(profileData);

  const fields = profileModel.getFields();

  return (
    <div className={'flex flex-col gap-[13px]'}>
      <BackButton to={'/services'} />
      <div className={'flex gap-[13px] lg:flex-row flex-col'}>
        <div className={'lg:w-[360px] w-full'}>
          <div className={'w-full h-[300px] rounded-[10px] bg-white flex items-center justify-center'}>
            <img
              className={'w-[200px] h-[200px] rounded-full object-cover object-center'}
              src={profileModel.getPhotoSrc() || profileImg}
              alt='profile_img'
            />
          </div>
        </div>
        <div className={'flex-grow'}>
          <div className={'w-full p-[20px] bg-white rounded-[10px]'}>
            <div className={'w-full border-b-[1px] border-b-gray-hover pb-[20px]'}>
              <h3 className={'text-[18px]'}>Контактная информация</h3>
            </div>
            <div className={'pt-[20px]'}>
              {fields.map(field => {
                return <ProfilePageField
                  key={field.key}
                  fieldKey={field.key}
                  value={field.value}
                  label={field.label}
                />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
