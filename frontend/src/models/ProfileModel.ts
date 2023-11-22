import IProfileData from "@cub-types/IProfileData";

class ProfileModel {
  SUPERUSER = '';
  ADMIN = 'admin';
  PROGRAMMER = 'programmer';
  MANAGER = 'manager';

  constructor(public data: IProfileData) {
  }

  getRoleName() {
    return {
      [this.MANAGER]: 'Руководитель проекта',
      [this.PROGRAMMER]: 'Программист',
      [this.ADMIN]: 'Администратор',
    }[this.data?.role];
  }

  isAdmin() {
    return [this.ADMIN, this.SUPERUSER].includes(this.data?.role);
  }
}

export default ProfileModel;
